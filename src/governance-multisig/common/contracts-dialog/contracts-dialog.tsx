import { ButtonBase } from '~/common/button-base'
import { Dialog } from '~/common/dialog'
import * as styles from './contracts-dialog.css'

export type ContractsDialogProps = {
  contracts: string[]
  onConfirm: (contract: string) => void
}

export const ContractsDialog: React.VFC<ContractsDialogProps> = (props) => {
  const handleConfirm = (contract: string) => () => {
    props.onConfirm(contract)
  }

  return (
    <Dialog className={styles.root}>
      {props.contracts.map((contract) => (
        <ButtonBase
          key={contract}
          className={styles.option}
          onClick={handleConfirm(contract)}
        >
          {contract}
        </ButtonBase>
      ))}
    </Dialog>
  )
}
