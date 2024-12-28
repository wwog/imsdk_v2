import { type ConnectDBOptions, connectDB } from './connect.js'

export interface ExecOptions {
  rowMode?: 'array' | 'object'
  callback?: (...args: any[]) => void
}

export class Database {
  dbId: string
  promiser: PromiserFunc

  static async connect(options?: ConnectDBOptions) {
    const { dbId, promiser } = await connectDB(options)
    return new Database(dbId, promiser)
  }

  constructor(dbId: string, promiser: PromiserFunc) {
    this.dbId = dbId
    this.promiser = promiser
  }

  async exec(sql: string, extra?: ExecOptions) {
    const { result } = await this.promiser('exec', {
      dbId: this.dbId,
      sql,
      ...extra,
    })
    return result
  }

  async query<T>(sql: string) {
    const { result } = await this.promiser('exec', {
      dbId: this.dbId,
      sql,
      rowMode: 'object',
    })
    return result.resultRows as Array<T>
  }

  async close() {
    const result = await this.promiser('close', {
      dbId: this.dbId,
    })
    return result
  }
}
