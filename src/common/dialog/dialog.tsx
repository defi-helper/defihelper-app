/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react'

import { useBodyScrollLock } from '../hooks'
import * as styles from './dialog.css'
import { useDialogContext } from './dialog.context'

export type DialogProps = {
  className?: string
}

export const Dialog: React.FC<DialogProps> = (props) => {
  const { onClose } = useDialogContext()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOnClickContent = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => event.stopPropagation()

  const [contentElement, setContentElement] = useState<HTMLDivElement | null>(
    null
  )

  useBodyScrollLock(contentElement)

  return (
    <div onClick={onClose} className={styles.root}>
      <div
        onClick={handleOnClickContent}
        className={styles.content}
        ref={setContentElement}
      >
        {props.children}
      </div>
    </div>
  )
}
