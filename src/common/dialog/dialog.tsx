/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx'
import { useState } from 'react'

import { useBodyScrollLock } from '~/common/hooks'
import { Paper } from '~/common/paper'
import * as styles from './dialog.css'

export type DialogProps = {
  className?: string
}

export const Dialog: React.FC<DialogProps> = (props) => {
  const handleOnClickContent = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => event.stopPropagation()

  const [contentElement, setContentElement] = useState<HTMLDivElement | null>(
    null
  )
  useBodyScrollLock(contentElement)

  const handleSetContent = (instance: HTMLDivElement | null) => {
    setContentElement(instance)
  }

  return (
    <Paper
      onClick={handleOnClickContent}
      className={clsx(styles.content, props.className)}
      radius={8}
      ref={handleSetContent}
    >
      {props.children}
    </Paper>
  )
}
