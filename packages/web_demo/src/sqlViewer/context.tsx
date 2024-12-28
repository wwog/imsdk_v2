import { createContext, useContext, useState } from 'react'
import type { GetAllTablesResult } from './helper'

export interface SQLQueryMethods {
  exec: (sql: string) => Promise<void>
  query: (sql: string) => Promise<any[]>
}

const SQLHelperContext = createContext<SQLQueryMethods>({} as SQLQueryMethods)

export const SQLHelperProvider = (
  props: SQLQueryMethods & {
    children: React.ReactNode
  },
) => {
  const { exec, query, children } = props
  return (
    <SQLHelperContext.Provider value={{ exec, query }}>
      {children}
    </SQLHelperContext.Provider>
  )
}

export const useHelper = () => {
  return useContext(SQLHelperContext)
}

interface ViewStateContextType {
  selectedTable?: GetAllTablesResult
  setSelectedTable: (table: GetAllTablesResult | undefined) => void
}

const ViewStateContext = createContext<ViewStateContextType>({
  selectedTable: undefined,
  setSelectedTable: () => {},
})

export const ViewStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedTable, setSelectedTable] = useState<GetAllTablesResult>()
  return (
    <ViewStateContext.Provider value={{ selectedTable, setSelectedTable }}>
      {children}
    </ViewStateContext.Provider>
  )
}

export const useViewState = () => {
  return useContext(ViewStateContext)
}
