import { sqlite3Worker1Promiser } from '@sqlite.org/sqlite-wasm'

export interface ConnectDBOptions {
  filename?: string
}

function formatFileName(filename: string) {
  //判断前面是否有file:，如果没有则加上
  //判断后面是否有?vfs=xxx,如果没有，则默认vfs=opfs
  let result = ''
  if (filename.startsWith('file:')) {
    result = filename
  } else {
    result = 'file:' + filename
  }
  if (filename.indexOf('?') > 0) {
    const arr = filename.split('?')
    const params = arr[1].split('&')
    const map = new Map()
    params.forEach((item) => {
      const [key, value] = item.split('=')
      map.set(key, value)
    })
    if (map.has('vfs') === false) {
      map.set('vfs', 'opfs')
    }
    const newParams: string[] = []
    map.forEach((value, key) => {
      newParams.push(key + '=' + value)
    })
    result = arr[0] + '?' + newParams.join('&')
  } else {
    result = result + '?vfs=opfs'
  }

  return result
}

export async function connectDB(options?: ConnectDBOptions) {
  const { filename: oriFilename } = options ?? {}
  const filename = oriFilename ? formatFileName(oriFilename) : undefined
  if (filename) {
    console.log('Connecting to database at: ', filename)
  } else {
    console.log('Connecting to in-memory database')
  }
  const promiser = await new Promise<PromiserFunc>((resolve) => {
    const _promiser = sqlite3Worker1Promiser({
      onready: () => {
        resolve(_promiser)
      },
    })
  })
  const config = await promiser('config-get', {})
  console.log('Sqlite Version: ', config.result.version.libVersion)
  console.log('Big int enabled: ', config.result.bigIntEnabled)
  try {
    if (filename) {
      const openResult = await promiser('open', {
        filename,
      })
      console.log('Database opened successfully', openResult)
      return {
        dbId: openResult.result.dbId!,
        promiser,
        filename,
      }
    } else {
      const openResult = await promiser('open', {
        filename: ':memory:',
      })
      console.log('Database opened successfully', openResult)
      return {
        dbId: openResult.result.dbId!,
        promiser,
        filename,
      }
    }
  } catch (error) {
    console.log(error)
    if (
      (error as any)?.result?.message?.indexOf(
        'SQLITE_ERROR: sqlite3 result code 1: no such vfs: opfs',
      ) !== -1
    ) {
      console.error(
        `打开数据库失败，opfs无法启用，请配置服务响应头   
  (必须包含){
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Embedder-Policy": "require-corp"
  }或者尝试高版本浏览器`,
      )
    }
    throw new Error('Failed to open database')
  }
}
