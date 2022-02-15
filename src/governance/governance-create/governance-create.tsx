import { lazy, Suspense, useEffect, useState } from 'react'
import isEmpty from 'lodash.isempty'
import { useForm } from 'react-hook-form'
import { useStore } from 'effector-react'
import clsx from 'clsx'
import { ethers } from 'ethers'
import networks from '@defihelper/networks/contracts.json'

import { AppLayout } from '~/layouts'
import { ButtonBase } from '~/common/button-base'
import { Button } from '~/common/button'
import { Input } from '~/common/input'
import { useDialog } from '~/common/dialog'
import { GovernanceActionsDialog } from '~/governance/common'
import { Typography } from '~/common/typography'
import {
  GovernanceAction,
  GovernanceActionArguments,
} from '../common/governance.types'
import { cutAccount } from '~/common/cut-account'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { Paper } from '~/common/paper'
import { Head } from '~/common/head'
import { switchNetwork } from '~/wallets/common'
import { config } from '~/config'
import * as styles from './governance-create.css'
import * as model from './governance-create.model'

const MarkdownEditor = lazy(() =>
  import('~/common/markdown-editor').then((c) => ({
    default: c.MarkdownEditor,
  }))
)

export type GovernanceCreateProps = unknown

const joinArguments = (args: GovernanceActionArguments) => {
  return Object.entries(args)
    .map(([param, paramValue]) => {
      const value =
        paramValue.type === 'address'
          ? cutAccount(paramValue.value)
          : paramValue.value

      return [param, value].join(': ')
    })
    .join(', ')
}

type FormValues = {
  name: string
  description: string
}

const contracts = networks[config.DEFAULT_CHAIN_ID] as unknown as Record<
  string,
  {
    address: string
    deployBlockNumber: number
  }
>

export const GovernanceCreate: React.VFC<GovernanceCreateProps> = () => {
  const [openGovernanceActionsDialog] = useDialog(GovernanceActionsDialog)

  const loading = useStore(model.proposeFx.pending)

  const { register, handleSubmit, formState, setValue } = useForm<FormValues>()

  const [actions, setActions] = useState<GovernanceAction[]>([])

  const wallet = walletNetworkModel.useWalletNetwork()
  useEffect(() => {
    setActions([])
  }, [wallet?.chainId])

  const handleAddAction = async () => {
    try {
      const result = await openGovernanceActionsDialog()

      setActions((previousActions) => [...previousActions, ...result])
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleDeleteAction = (index: number) => () => {
    setActions((previousActions) => [
      ...previousActions.slice(0, index),
      ...previousActions.slice(index + 1),
    ])
  }

  const handleEditAction =
    (action: GovernanceAction, actionIndex: number) => async () => {
      try {
        const result = await openGovernanceActionsDialog({
          initialAction: action,
        })

        setActions((previousActions) =>
          previousActions.flatMap((previousAction, index) =>
            index === actionIndex ? result : [previousAction]
          )
        )
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

  const handleCreateProposal = async (formValues: FormValues) => {
    const description = `#${formValues.name.trim()}\n${formValues.description.trim()}`

    const callDatas = actions.flatMap((action) => {
      const [types, paramValues] = Object.values(action.arguments)
        .filter(({ type }) => type !== 'ether')
        .reduce<[string[], string[]]>(
          ([params, values], { type, value }) => [
            [...params, type],
            [...values, value],
          ],
          [[], []]
        )

      return ethers.utils.defaultAbiCoder.encode(types, paramValues)
    })

    const signatures = actions.map(
      (action) =>
        `${action.method}(${Object.values(action.arguments)
          .filter(({ type }) => type !== 'ether')
          .map(({ type }) => type)
          .join()})`
    )

    const values = actions.flatMap(
      ({ arguments: { payable } }) => payable?.value ?? '0'
    )

    const addresses = actions
      .map((action) => contracts[action.contract]?.address)
      .filter(Boolean)

    try {
      await switchNetwork(String(config.DEFAULT_CHAIN_ID))

      if (!wallet?.account) return

      model.proposeFx({
        addresses,
        values,
        signatures,
        callDatas,
        description,
        account: wallet.account,
        chainId: String(wallet.chainId),
        provider: wallet.provider,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return (
    <AppLayout>
      <Head title="Create proposal" />
      <form
        noValidate
        autoComplete="off"
        className={styles.form}
        onSubmit={handleSubmit(handleCreateProposal)}
      >
        <Input
          type="text"
          placeholder="Enter the name of proposal"
          className={styles.input}
          disabled={loading}
          {...register('name', { required: true })}
        />
        {formState.errors.name?.type === 'required' && (
          <Typography className={styles.error}>required</Typography>
        )}
        {!isEmpty(actions) && (
          <Paper radius={8} className={clsx(styles.actions, styles.input)}>
            {actions.map((action, index) => (
              <div key={String(index)} className={styles.action}>
                <Typography
                  variant="h5"
                  className={styles.actionTitle}
                  as="div"
                >
                  {index + 1}:{' '}
                  {contracts[action.contract] ? (
                    cutAccount(contracts[action.contract].address)
                  ) : (
                    <span className={styles.unsupportedContract}>
                      Unsupported contract
                    </span>
                  )}
                  .{action.method}({joinArguments(action.arguments)})
                </Typography>
                <ButtonBase
                  className={styles.actionButton}
                  onClick={handleEditAction(action, index)}
                  disabled={loading}
                >
                  Edit
                </ButtonBase>
                <ButtonBase
                  className={styles.actionButton}
                  onClick={handleDeleteAction(index)}
                  disabled={loading}
                >
                  Delete
                </ButtonBase>
              </div>
            ))}
            <Button onClick={handleAddAction}>+ Add another action</Button>
          </Paper>
        )}
        {isEmpty(actions) && (
          <Button
            className={styles.input}
            onClick={handleAddAction}
            disabled={loading}
          >
            + Add Action
          </Button>
        )}
        <Suspense fallback="loading...">
          <MarkdownEditor
            value=""
            label="Write a description"
            disabled={loading}
            onChange={(value) => setValue('description', value)}
            className={styles.input}
          />
        </Suspense>
        {formState.errors.description?.type === 'required' && (
          <Typography className={styles.error}>required</Typography>
        )}
        <Button type="submit" loading={loading} className={styles.submit}>
          Submit proposal
        </Button>
      </form>
    </AppLayout>
  )
}
