import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { useState } from 'react'

import { AutomationContractFragmentFragment } from '~/graphql/_generated-types'
import {
  AutomationContractForm,
  FormValues,
} from '../common/automation-contract-form'
import { useWalletList } from '~/wallets/wallet-list'
import { AutomationDialog } from '../common/automation-dialog'
import { AutomationChooseButton } from '../common/automation-choose-button'
import { Icon } from '~/common/icon'
import { useDialog } from '~/common/dialog'
import { AutomationNetworksDialog } from '../common/automation-networks-dialog'
import { Automates } from '../common/automation.types'
import { AutomationDeployContractDialog } from '../common/automation-deploy-contract-dialog'
import { Typography } from '~/common/typography'
import { networksConfig } from '~/networks-config'
import * as model from './automation-deploy-contract.model'
import * as styles from './automation-deploy-contract.css'

export type AutomationDeployContractProps = {
  onConfirm: (contract: AutomationContractFragmentFragment) => void
  onCancel: (error?: unknown) => void
}

export const AutomationDeployContract: React.VFC<AutomationDeployContractProps> =
  (props) => {
    const [currentNetwork, setNetwork] = useState('')
    const [currentAutomationContract, setAutomationContract] =
      useState<Automates | null>(null)

    const automationContracts = useStore(model.$automateContracts)
    const loading = useStore(model.deployFx.pending)

    const [openWalletList] = useWalletList()
    const [openNetworksDialog] = useDialog(AutomationNetworksDialog)
    const [openContractDialog] = useDialog(AutomationDeployContractDialog)

    const handleChooseNetwork = async () => {
      try {
        const result = await openNetworksDialog()

        setNetwork(result)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }
    const handleChooseContract = async () => {
      try {
        const result = await openContractDialog({
          contracts: automationContracts,
        })

        setAutomationContract(result)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

    const handleSubmit = async (formValues: FormValues) => {
      if (!currentAutomationContract || !currentAutomationContract.address)
        return

      try {
        const wallet = await openWalletList()

        if (!wallet.account) return

        await model.deployFx({
          address: currentAutomationContract.address,
          inputs: formValues.inputs,
          automate: currentAutomationContract,
          account: wallet.account,
          chainId: String(wallet.chainId),
          provider: wallet.provider,
        })
      } catch (error) {
        props.onCancel(error)
      }
    }

    useGate(model.AutomationDeployContractGate, currentNetwork)

    return (
      <AutomationDialog title="Deploy contract" onBack={props.onCancel}>
        <AutomationChooseButton
          label="network"
          onClick={handleChooseNetwork}
          className={styles.input}
        >
          {(networksConfig[currentNetwork] && (
            <>
              <Icon
                icon={networksConfig[currentNetwork].icon}
                width="28"
                height="28"
              />{' '}
              {networksConfig[currentNetwork].title}
            </>
          )) ||
            'Choose network'}
        </AutomationChooseButton>
        <AutomationChooseButton
          label="contract"
          onClick={handleChooseContract}
          className={clsx(styles.input, styles.contractButton)}
        >
          {(currentAutomationContract && (
            <>
              <Typography variant="body2" as="div">
                {currentAutomationContract.contract}
              </Typography>
              <Typography variant="body3" as="div" className={styles.protocol}>
                {currentAutomationContract.protocol}
              </Typography>
            </>
          )) ||
            'Choose contract'}
        </AutomationChooseButton>
        {currentAutomationContract && (
          <AutomationContractForm
            loading={loading}
            contract={currentAutomationContract}
            onSubmit={handleSubmit}
          />
        )}
      </AutomationDialog>
    )
  }
