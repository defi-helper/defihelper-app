import { Typography } from '~/common/typography'
import { AutomationDialog } from '../automation-dialog'
import {
  AutomationSelectList,
  AutomationSelectListItem,
} from '../automation-select-list'
import { Automates } from '../automation.types'
import * as styles from './automation-deploy-contract-dialog.css'

export type AutomationDeployContractDialogProps = {
  onConfirm: (contract: Automates) => void
  onCancel: () => void
  contracts: Automates[]
  title?: string
}

export const AutomationDeployContractDialog: React.VFC<AutomationDeployContractDialogProps> =
  (props) => {
    const handleOnChange = (contract: Automates) => () => {
      props.onConfirm(contract)
    }

    return (
      <AutomationDialog
        title={props.title || 'Choose contract'}
        onBack={props.onCancel}
      >
        <AutomationSelectList>
          {props.contracts.map((contract) => (
            <AutomationSelectListItem
              key={contract.contract}
              onClick={handleOnChange(contract)}
            >
              <Typography variant="body2" as="div">
                {contract.contract}
              </Typography>
              <Typography variant="body3" as="div" className={styles.protocol}>
                {contract.protocol}
              </Typography>
            </AutomationSelectListItem>
          ))}
        </AutomationSelectList>
      </AutomationDialog>
    )
  }
