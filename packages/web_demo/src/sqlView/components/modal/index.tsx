import { FC } from 'react'
import styles from './index.module.css'
import { clsx } from '../../helper'
import { CloseSvg } from '../svg'
import { IconButton } from '../button/iconButton'

//#region component Types
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}
//#endregion component Types

//#region component
export const Modal: FC<ModalProps> = (props) => {
  const { children, className, style, isOpen, onClose } = props
  return (
    <dialog
      className={clsx(className, styles.modal)}
      style={style}
      open={isOpen}
    >
      <div className={styles.modalClose} onClick={onClose}>
        <CloseSvg size={20} />
      </div>

      <div className={clsx(styles.modalContent)}>{children}</div>
    </dialog>
  )
}
//#endregion component
