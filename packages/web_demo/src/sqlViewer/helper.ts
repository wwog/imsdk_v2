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
  const totalResult = await query(`SELECT COUNT(*) as count FROM ${tableName};`)
  const total = totalResult[0].count

  const isLastPage = page * pageSize >= total

  return {
    data,
    total,
    currentPage: page,
    pageSize,
    isLastPage,
  }
}

export const editTableData = async (
  query: (sql: string) => Promise<any>,
  tableName: string,
  row: any,
  field: string,
  value: any,
) => {
  const formattedValue = typeof value === 'string' ? `'${value}'` : value
  if (row.id) {
    return await query(
      `UPDATE ${tableName} SET ${field} = ${formattedValue} WHERE id = ${row.id};`,
    )
  } else {
    return await query(
      `UPDATE ${tableName} SET ${field} = ${formattedValue} WHERE ${Object.keys(
        row,
      )
        .map((key) => `${key} = ${row[key]}`)
        .join(' AND ')}}`,
    )
  }
}
