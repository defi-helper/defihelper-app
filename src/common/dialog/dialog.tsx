/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import DialogWrapper from '@material-ui/core/Dialog'

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

  return (
    <DialogWrapper onClose={onClose} open>
      {props.children}
    </DialogWrapper>
  )
}
