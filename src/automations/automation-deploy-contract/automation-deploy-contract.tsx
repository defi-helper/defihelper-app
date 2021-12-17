import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { useEffect, useState } from 'react'

import { AutomationContractFragmentFragment } from '~/graphql/_generated-types'
import { WalletListPayload } from '~/wallets/wallet-list'
import { AutomationDialog } from '../common/automation-dialog'
import { AutomationChooseButton } from '../common/automation-choose-button'
import { Icon } from '~/common/icon'
import { useDialog } from '~/common/dialog'
import { AutomationNetworksDialog } from '../common/automation-networks-dialog'
import { Automates, Contract, Protocol } from '../common/automation.types'
import { AutomationDeployContractDialog } from '../common/automation-deploy-contract-dialog'
import { Typography } from '~/common/typography'
import { networksConfig } from '~/networks-config'
import { AutomationContractDialog } from '../common/automation-contract-dialog'
import { AutomationProtocolDialog } from '../common/automation-protocol-dialog'
import { AutomationDeployStepsDialog } from '../common/automation-deploy-steps-dialog'
import * as model from './automation-deploy-contract.model'
import * as styles from './automation-deploy-contract.css'

export type AutomationDeployContractProps = {
  onConfirm: (contract: AutomationContractFragmentFragment) => void
  onCancel: (error?: unknown) => void
  protocols: Protocol[]
  wallet: WalletListPayload
}

export const AutomationDeployContract: React.VFC<AutomationDeployContractProps> =
  (props) => {
    const [currentNetwork, setNetwork] = useState('')
    const [currentAdapter, setAdapter] = useState<Automates | null>(null)
    const [currentContract, setContract] = useState<Contract | null>(null)
    const [currentProtocol, setProtocol] = useState<Protocol | null>(null)

    const adapters = useStore(model.$automateContracts)
    const deployAdapter = useStore(model.$deployAdapter)

    const [openNetworksDialog] = useDialog(AutomationNetworksDialog)
    const [openAdapterDialog] = useDialog(AutomationDeployContractDialog)
    const [openContractDialog] = useDialog(AutomationContractDialog)
    const [openProtocolDialog] = useDialog(AutomationProtocolDialog)
    const [openDeployStepsDialog] = useDialog(AutomationDeployStepsDialog)

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
    const handleChooseAdapter = async () => {
      try {
        const result = await openAdapterDialog({
          contracts: adapters,
          title: 'Choose adapter',
        })

        setAdapter(result)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

    const handleChooseContract = async () => {
      if (!currentProtocol?.contracts.list) return

      try {
        const result = await openContractDialog({
          contracts: currentProtocol.contracts.list,
        })

        setContract(result)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

    const handleChooseProtocol = async () => {
      try {
        const result = await openProtocolDialog({
          protocols: props.protocols,
        })

        setProtocol(result)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

    useGate(model.AutomationDeployContractGate, currentNetwork)

    useEffect(() => {
      if (!currentAdapter || !currentAdapter.address || !props.wallet.account)
        return

      model.fetchDeployAdapterFx({
        address: currentAdapter.address,
        protocol: currentAdapter.protocol,
        contract: currentAdapter.contract,
        chainId: String(props.wallet.chainId),
        provider: props.wallet.provider,
      })
    }, [currentAdapter, props.wallet])

    useEffect(() => {
      if (!deployAdapter) return

      const handler = async () => {
        try {
          const result = await openDeployStepsDialog({
            steps: deployAdapter.deploy,
          })

          if (
            !props.wallet.account ||
            !currentProtocol ||
            !currentAdapter ||
            !currentContract
          )
            return

          const contract = await model.deployFx({
            proxyAddress: result.address,
            inputs: result.inputs,
            protocol: currentProtocol.id,
            adapter: currentAdapter.contract,
            contract: currentContract.id,
            account: props.wallet.account,
            chainId: String(props.wallet.chainId),
            provider: props.wallet.provider,
          })

          props.onConfirm(contract)
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message)
          }
        }
      }

      handler()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deployAdapter])

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
          label="protocol"
          onClick={handleChooseProtocol}
          className={clsx(styles.input, styles.contractButton)}
        >
          {(currentProtocol && (
            <>
              {currentProtocol.icon && (
                <img src={currentProtocol.icon} width="28" height="28" alt="" />
              )}
              {currentProtocol.name}
            </>
          )) ||
            'Choose protocol'}
        </AutomationChooseButton>
        <AutomationChooseButton
          label="contract"
          onClick={handleChooseContract}
          className={clsx(styles.input, styles.contractButton)}
        >
          {(currentContract && (
            <>
              <Typography variant="body2" as="div">
                {currentContract.name}
              </Typography>
              <Typography variant="body3" as="div" className={styles.protocol}>
                {networksConfig[currentContract.network]?.title}
              </Typography>
            </>
          )) ||
            'Choose contract'}
        </AutomationChooseButton>
        <AutomationChooseButton
          label="adapter"
          onClick={handleChooseAdapter}
          className={clsx(styles.input, styles.contractButton)}
        >
          {(currentAdapter && (
            <>
              <Typography variant="body2" as="div">
                {currentAdapter.contract}
              </Typography>
              <Typography variant="body3" as="div" className={styles.protocol}>
                {currentAdapter.protocol}
              </Typography>
            </>
          )) ||
            'Choose adapter'}
        </AutomationChooseButton>
      </AutomationDialog>
    )
  }
