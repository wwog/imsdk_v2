export const clsx = (...args: any[]) => {
  return args.filter(Boolean).join(' ')
}

export interface Column {
  cid: number
  name: string
  type: string
  notnull: number
  dflt_value: null
  pk: number
}

export interface GetAllTablesResult {
  name: string
  columns: Column[]
}

export interface Pagination {
  page: number
  pageSize: number
}

export const getAllTables = async (query: (sql: string) => Promise<any[]>) => {
  const tables = await query(
    `SELECT name FROM sqlite_master WHERE type='table';`,
  )
  //查询表的字段

  await Promise.all(
    tables.map(async (table) => {
      table.columns = await query(`PRAGMA table_info(${table.name})`)
    }),
  )

  return tables as GetAllTablesResult[]
}

export const getTableData = async (
  query: (sql: string) => Promise<any[]>,
  tableName: string,
  pagination: Pagination,
) => {
  const { page, pageSize } = pagination

  const data = await query(
    `SELECT * FROM ${tableName} LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize};`,
  )

  return data
}
