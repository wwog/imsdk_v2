import { FC, useEffect, useRef, useState } from 'react'
import { clsx, editTableData, getTableData } from '../../helper'
import styles from './index.module.css'
import { useHelper, useViewState } from '../../context'
import { RefreshSvg, TableSvg } from '../svg'
import { Button } from '../button'
import { IconButton } from '../button/iconButton'
import { ContextMenu } from '../contextMenu'

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

  const page = useRef(1)
  const [data, setData] = useState<any[]>([])
  const [isEnd, setIsEnd] = useState(false)
  const [total, setTotal] = useState(0)
  const totalPageSize = Math.ceil(total / PAGESIZE)

  const queryTableData = async () => {
    if (!selectedTable) return
    const res = await getTableData(query, selectedTable.name, {
      page: page.current,
      pageSize: PAGESIZE,
    })
    const { data, isLastPage, total } = res
    setData(data)
    setIsEnd(isLastPage)
    setTotal(total)
    console.log(res)
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

  if (!columns) return null

  return (
    <div className={clsx(className, styles.root)} style={style}>
      <div className={clsx(className, styles.tools)}>
        <div className={clsx(className, styles.left)}>
          <TableSvg />
          {selectedTable.name}
        </div>
        <div className={clsx(className, styles.right)}>
          <IconButton onClick={() => queryTableData()}>
            <RefreshSvg size={20} />
          </IconButton>
        </div>
      </div>
      <div className={styles.tableWrapper}>
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
              const jsonStr = JSON.stringify(row)
              const isSelected = selectedRow === jsonStr
              return (
                <ContextMenu
                  key={rowIndex + page.current}
                  items={[
                    {
                      label: '复制',
                      onClick: () => {
                        navigator.clipboard.writeText(jsonStr)
                      },
                    },
                    {
                      label: '删除',
                      onClick: async () => {
                        if (!selectedTable) return
                        /*  await exec(
                          `DELETE FROM ${selectedTable.name} WHERE ${selectedTable.columns[0].name} = ${row[selectedTable.columns[0].name]}`,
                        )
                        queryTableData() */
                      },
                    },
                  ]}
                >
                  <tr
                    key={rowIndex}
                    tabIndex={1}
                    onClick={() => {
                      setSelectedRow(jsonStr)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setSelectedRow(jsonStr)
                      }
                    }}
                    onContextMenu={() => {
                      setSelectedRow(jsonStr)
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
                </ContextMenu>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <Button
          disabled={page.current === 1}
          onClick={() => {
            page.current--
            queryTableData()
          }}
        >
          上一页
        </Button>

        <div className={styles.pageList}>
          {totalPageSize > 1 && [
            <Button
              key="start"
              onClick={() => {
                page.current = 1
                queryTableData()
              }}
              disabled={page.current === 1}
            >
              首页
            </Button>,
            ...Array.from({ length: totalPageSize }).map((_, index) => (
              <Button
                size="lg"
                key={index}
                onClick={() => {
                  page.current = index + 1
                  queryTableData()
                }}
                disabled={page.current === index + 1}
              >
                {index + 1}
              </Button>
            )),
            <Button
              key="end"
              onClick={() => {
                page.current = totalPageSize
                queryTableData()
              }}
              disabled={page.current === totalPageSize}
            >
              尾页
            </Button>,
          ]}
        </div>

        <Button
          onClick={() => {
            page.current++
            queryTableData()
          }}
          disabled={isEnd}
        >
          下一页
        </Button>
        <span>
          {page.current} / {totalPageSize}
        </span>
      </div>
    </div>
  )
}
//#endregion component
