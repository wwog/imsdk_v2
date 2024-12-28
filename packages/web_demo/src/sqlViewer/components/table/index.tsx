import { FC, useEffect, useState } from 'react'
import { clsx, editTableData, getTableData } from '../../helper'
import styles from './index.module.css'
import { useHelper, useViewState } from '../../context'

//#region component Types
export interface TableProps {
  className?: string
  style?: React.CSSProperties
}
//#endregion component Types

const PAGESIZE = 50
//#region component
export const Table: FC<TableProps> = (props) => {
  const { className, style } = props
  const { query, exec } = useHelper()
  const { selectedTable, setSelectedRow, selectedRow } = useViewState()
  const columns = selectedTable?.columns

  const [page] = useState(1)
  const [data, setData] = useState<any[]>([])
  const queryTableData = async () => {
    if (!selectedTable) return
    const res = await getTableData(query, selectedTable.name, {
      page,
      pageSize: PAGESIZE,
    })
    setData(res)
    return res
  }

  useEffect(() => {
    queryTableData()
  }, [selectedTable])

  const onColumnDoubleClick = async (row: any, column: any) => {
    console.log('row[column.name]', row, column)
    const value = prompt('请输入新的值', row[column.name])
    if (value === null) return
    if (!selectedTable) return
    await editTableData(exec, selectedTable.name, row, column.name, value)
    queryTableData()
  }
  console.log('selectedRow', selectedRow)
  if (!columns) return null

  return (
    <div className={clsx(className, styles.root)} style={style}>
      <table
        className={styles.table}
        border={0}
        cellPadding={0}
        cellSpacing={0}
      >
        <thead>
          <tr>
            <th className={styles.placeholder}></th>
            {columns.map((column) => (
              <th key={column.name}>{column.name}</th>
            ))}
            <th className={styles.placeholder}></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const isSelected = selectedRow === JSON.stringify(row)
            return (
              <tr
                key={rowIndex}
                onClick={() => {
                  setSelectedRow(JSON.stringify(row))
                }}
                className={clsx(styles.row, isSelected && styles.selected)}
              >
                <td className={styles.placeholder}></td>

                {columns.map((column) => (
                  <td
                    key={column.name}
                    onDoubleClick={() => {
                      onColumnDoubleClick(row, column)
                    }}
                  >
                    {row[column.name]}
                  </td>
                ))}
                <td className={styles.placeholder}></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
//#endregion component
