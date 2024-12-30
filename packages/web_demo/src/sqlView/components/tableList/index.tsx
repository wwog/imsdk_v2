import { type FC, useState, useEffect } from 'react'
import { useHelper, useViewState } from '../../context'
import { clsx, getAllTables, type GetAllTablesResult } from '../../helper'
import styles from './index.module.css'
import { SQLiteSvg, TableSvg } from '../svg'
import { IconButton } from '../button/iconButton'
import { Modal } from '../modal'

export const TableList: FC = () => {
  const helper = useHelper()
  const [tables, setTables] = useState<GetAllTablesResult[]>([])
  const { selectedTable, setSelectedTable } = useViewState()
  const [showModal, setShowModal] = useState(false)

  const queryTables = async () => {
    const tables = await getAllTables(helper.query)
    setTables(tables)
  }

  useEffect(() => {
    queryTables()
  }, [])

  return (
    <div className={styles.tableListWrapper}>
      <div className={styles.top}>
        <div className={styles.tag}>ALLTables</div>
        <div className={styles.tableList}>
          {tables.map((table) => {
            const isSelected = selectedTable?.name === table.name
            return (
              <div
                key={table.name}
                onClick={() => setSelectedTable(table)}
                className={clsx(isSelected && styles.selected, styles.item)}
              >
                <div className={styles.tableName}>
                  <TableSvg />
                  {table.name}
                </div>

                <div
                  className={styles.columns}
                  style={{
                    height: isSelected ? 'unset' : 0,
                    transform: `scale(${isSelected ? 1 : 0})`,
                  }}
                >
                  {table.columns.map((column) => (
                    <div key={column.name} className={styles.column}>
                      <div>({column.type})</div>
                      <div>{column.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.bot}>
        <IconButton
          onClick={() => setShowModal((o) => !o)}
          style={{
            padding: '10px',
          }}
        >
          <SQLiteSvg />
        </IconButton>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div>123</div>
        </Modal>
      </div>
    </div>
  )
}
