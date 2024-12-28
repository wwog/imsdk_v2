import { FC } from 'react'
import { clsx } from '../../helper'
import styles from './index.module.css'
//#region component Types
export interface ButtonProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}
//#endregion component Types

//#region component
export const Button: FC<ButtonProps> = (props) => {
  const { className, style, children } = props
  return (
    <button className={clsx(className, styles.root)} style={style}>
      {children}
    </button>
  )
}
//#endregion component
