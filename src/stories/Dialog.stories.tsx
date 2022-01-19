// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react'
import { useCallback } from 'react'

import { Dialog, useDialog } from '~/common/dialog'
import { Button } from '~/common/button'

export default {
  title: 'components/Dialog',
  component: Dialog,
} as ComponentMeta<typeof Dialog>

export const Example = () => {
  const SomeDialog = useCallback(
    (props: { onConfirm: (value: string) => void; onCancel: () => void }) => (
      <Dialog>
        <Button onClick={props.onCancel}>Cencel</Button>
        <Button onClick={() => props.onConfirm('confirmed')}>Confirm</Button>
      </Dialog>
    ),
    []
  )

  const [openSomeDialog] = useDialog(SomeDialog)

  const handleOpenComponent = async () => {
    try {
      await openSomeDialog()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <div>
      <Button onClick={handleOpenComponent}>Open</Button>
    </div>
  )
}
