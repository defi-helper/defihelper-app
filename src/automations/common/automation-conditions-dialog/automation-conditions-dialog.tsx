import { useState } from 'react'

import { Typography } from '~/common/typography'
import {
  AutomateConditionTypeEnum,
  AutomationContractFragmentFragment,
} from '~/graphql/_generated-types'
import { AutomationConditionEthereumBalance } from '../automation-condition-ethereum-balance'
import { AutomationConditionEthereumGasPrice } from '../automation-condition-ethereum-gas-price'
import { AutomationConditionEthereumOptimal } from '../automation-condition-ethereum-optimal'
import { AutomationConditionSchedule } from '../automation-condition-schedule'
import { AutomationDialog } from '../automation-dialog'
import {
  AutomationSelectList,
  AutomationSelectListItem,
} from '../automation-select-list'
import { FormItem, Wallet } from '../automation.types'
import * as styles from './automation-conditions-dialog.css'

export type AutomationConditionsDialogProps = {
  onCancel: () => void
  type?: string | null
  contracts: AutomationContractFragmentFragment[]
  wallets: Wallet[]
}

export const AutomationConditionsDialog: React.VFC<AutomationConditionsDialogProps> =
  (props) => {
    const [currentForm, setCurrentForm] = useState<string | null>(
      props.type ?? null
    )

    const handleSetForm = (formType: string | null) => () => {
      setCurrentForm(formType)
    }

    const handleSubmit = (formValues: unknown) => {
      console.log(formValues)
    }

    const Forms: Record<string, FormItem> = {
      [AutomateConditionTypeEnum.EthereumBalance]: {
        title: 'Ethereum balance',
        description: 'some description',
        component: (
          <AutomationConditionEthereumBalance
            wallets={props.wallets}
            onSubmit={handleSubmit}
          />
        ),
      },
      [AutomateConditionTypeEnum.EthereumOptimalAutomateRun]: {
        title: 'Ethereum optimal automate Run',
        description: 'some description',
        component: (
          <AutomationConditionEthereumOptimal
            onSubmit={handleSubmit}
            contracts={props.contracts}
          />
        ),
      },
      [AutomateConditionTypeEnum.EthereumAvgGasPrice]: {
        title: 'Ethereum avg gas price',
        description: 'some description',
        component: (
          <AutomationConditionEthereumGasPrice onSubmit={handleSubmit} />
        ),
      },
      [AutomateConditionTypeEnum.Schedule]: {
        title: 'Schedule',
        description: 'some description',
        component: <AutomationConditionSchedule onSubmit={handleSubmit} />,
      },
    }

    const currentFormObj = currentForm ? Forms[currentForm] : undefined

    return (
      <AutomationDialog
        title={currentFormObj ? currentFormObj.title : 'Choose condition'}
        onBack={currentFormObj ? handleSetForm(null) : props.onCancel}
      >
        {currentFormObj ? (
          currentFormObj.component
        ) : (
          <AutomationSelectList>
            {Object.entries(Forms).map(([type, condition]) => (
              <AutomationSelectListItem
                key={type}
                className={styles.button}
                onClick={handleSetForm(type)}
              >
                <Typography>{condition.title}</Typography>
                <Typography variant="body3" className={styles.description}>
                  {condition.description}
                </Typography>
              </AutomationSelectListItem>
            ))}
          </AutomationSelectList>
        )}
      </AutomationDialog>
    )
  }
