/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { makeStyles } from '@material-ui/core'
import { useState } from 'react'
import { useBodyScrollLock } from '../hooks'

import { useDialogContext } from './dialog.context'

export type DialogProps = {
  className?: string
}

const useStyle = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    minHeight: '100%',
    width: '100%',
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },

  content: {
    background: '#fff',
    maxHeight: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
})

export const Dialog: React.FC<DialogProps> = (props) => {
  const { onClose } = useDialogContext()

  const classes = useStyle()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOnClickContent = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => event.stopPropagation()

  const [contentElement, setContentElement] = useState<HTMLDivElement | null>(
    null
  )

  useBodyScrollLock(contentElement)

  return (
    <div onClick={onClose} className={classes.root}>
      <div
        onClick={handleOnClickContent}
        className={classes.content}
        ref={setContentElement}
      >
        {props.children}
      </div>
    </div>
  )
}
