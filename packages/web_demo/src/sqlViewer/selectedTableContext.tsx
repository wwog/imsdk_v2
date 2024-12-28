import { createContext, useContext, useState } from 'react'

interface SelectedTableContextType {
  selectedTable: string | null
  setSelectedTable: (table: string | null) => void
}

const SelectedTableContext = createContext<SelectedTableContextType>({
  selectedTable: null,
  setSelectedTable: () => {},
})

export const SelectedTableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  return (
    <SelectedTableContext.Provider value={{ selectedTable, setSelectedTable }}>
      {children}
    </SelectedTableContext.Provider>
  )
}

export const useSelectedTable = () => {
  return useContext(SelectedTableContext)
}
