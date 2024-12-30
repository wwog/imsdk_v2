import React from 'react'
import ReactDOM from 'react-dom/client'
import { Database } from '@repo/im-core/src/db/database'
// import baseSql from '@repo/im-core/src/db/base.sql'
import { SQLView } from './sqlViewer'
import './index.css'

const db = await Database.connect({
  filename: 'test.sqlite3',
})
declare global {
  interface Window {
    db: Database
  }
}
window.db = db

// await db.exec(baseSql)

const rootEl = document.getElementById('root')
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl)
  root.render(
    <React.StrictMode>
      <div
        style={{
          height: '100vh',
        }}
      >
        <SQLView
          exec={(sql: string) => {
            return db.exec(sql)
          }}
          query={(sql: string) => {
            return db.query(sql)
          }}
        />
      </div>
    </React.StrictMode>,
  )
}
