import { UnitValue } from 'effector'
import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import isEmpty from 'lodash.isempty'
import { useForm } from 'react-hook-form'
import { useStore } from 'effector-react'
import clsx from 'clsx'
import { ethers } from 'ethers'
import networks from '@defihelper/networks/contracts.json'
import * as yup from 'yup'

import { AppLayout } from '~/layouts'
import { ButtonBase } from '~/common/button-base'
import { Button } from '~/common/button'
import { Input } from '~/common/input'
import { useDialog } from '~/common/dialog'
import {
  AbiItem,
  GovernanceActionsDialog,
  parseContract,
} from '~/governance/common'
import { Typography } from '~/common/typography'
import {
  GovernanceAction,
  GovernanceActionArguments,
} from '~/governance/common/governance.types'
import { cutAccount } from '~/common/cut-account'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { Paper } from '~/common/paper'
import { Head } from '~/common/head'
import { config } from '~/config'
import { Link } from '~/common/link'
import { useQueryParams } from '~/common/hooks'
import { fetchGovernanceProposalFx } from '~/governance/governance-detail/governance-detail.model'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { abi, AbiKeys, isContract } from '~/abi'
import { WalletSwitchNetwork } from '~/wallets/wallet-switch-network'
import * as styles from './governance-create.css'
import * as model from './governance-create.model'

const MarkdownEditor = lazy(() =>
  import('~/common/markdown-editor').then((c) => ({
    default: c.MarkdownEditor,
  }))
)

export type GovernanceCreateProps = unknown

const joinArguments = (args: GovernanceActionArguments, chainId: string) => {
  const argsArr = Object.entries(args)

  return argsArr.map(([param, paramValue], index) => {
    const value =
      paramValue.type === 'address' ? (
        <Link
          target="_blank"
          underline="always"
          href={buildExplorerUrl({
            network: chainId,
            address: paramValue.value,
          })}
        >
          {cutAccount(paramValue.value)}
        </Link>
      ) : (
        paramValue.value
      )

    return (
      <React.Fragment key={String(index)}>
        {param}: {value}
        {argsArr.length - 1 === index ? '' : ', '}
      </React.Fragment>
    )
  })
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

const safeJsonParse = (
  value: string
): Partial<UnitValue<typeof fetchGovernanceProposalFx.doneData>> => {
  try {
    return JSON.parse(value)
  } catch {
    return {}
  }
}

const contractAddresses = Object.entries(contracts).reduce<
  Record<string, string>
>((acc, [contractName, { address }]) => {
  acc[address.toLowerCase()] = contractName

  return acc
}, {})

export const GovernanceCreate: React.VFC<GovernanceCreateProps> = () => {
  const [openGovernanceActionsDialog] = useDialog(GovernanceActionsDialog)

  const clone = useQueryParams().get('clone')
  const queryObj = useMemo(
    () => (clone ? safeJsonParse(atob(clone)) : {}),
    [clone]
  )

  const loading = useStore(model.proposeFx.pending)

  const { register, handleSubmit, formState, setValue, watch } =
    useForm<FormValues>({
      resolver: yupResolver(
        yup.object().shape({
          name: yup.string().required('required'),
          description: yup.string().required('required'),
        })
      ),
    })

  const [actions, setActions] = useState<GovernanceAction[]>([])

  const wallet = walletNetworkModel.useWalletNetwork()
  useEffect(() => {
    if (queryObj) return

    setActions([])
  }, [wallet?.chainId, queryObj])

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

  useEffect(() => {
    if (!queryObj?.title) return

    setValue('name', queryObj.title)
  }, [queryObj, setValue])
  useEffect(() => {
    if (!queryObj?.description) return

    setValue('description', queryObj.description)
  }, [queryObj, setValue])

  const description = watch('description')

  useEffect(() => {
    const initialActions = queryObj?.actions?.map(
      ({ target, signature, callDatas }) => {
        const contractName = contractAddresses[target.toLowerCase()]

        const currentAbi = abi[contractName as AbiKeys]

        const methods = isContract(contractName)
          ? parseContract(currentAbi as { abi: AbiItem[] })
          : {}

        return {
          contract: contractAddresses[target.toLowerCase()],
          method: signature,
          arguments: methods[signature]?.inputs
            .map((input) => ({
              ...input,
              value: input.value,
              type: input.type,
            }))
            .reduce<GovernanceActionArguments>((acc, { name, type }, index) => {
              acc[name] = {
                value: callDatas[index],
                type,
              }

              return acc
            }, {}),
        }
      }
    )

    if (!initialActions) return

    setActions(initialActions)
  }, [queryObj])

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
          {...register('name')}
        />
        {Boolean(formState.errors.name) && (
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
                    <Link
                      href={buildExplorerUrl({
                        network: wallet?.chainId ?? '1',
                        address: contracts[action.contract].address,
                      })}
                      target="_blank"
                      underline="always"
                    >
                      {cutAccount(contracts[action.contract].address)}
                    </Link>
                  ) : (
                    <span className={styles.unsupportedContract}>
                      Unsupported contract
                    </span>
                  )}
                  .{action.method}(
                  {joinArguments(action.arguments, wallet?.chainId ?? '1')})
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
            label="Write a description"
            disabled={loading}
            onChange={(value) => setValue('description', value)}
            className={styles.input}
            value={description}
          />
        </Suspense>
        {Boolean(formState.errors.description) && (
          <Typography className={styles.error}>required</Typography>
        )}
        <WalletSwitchNetwork>
          <Button type="submit" loading={loading} className={styles.submit}>
            Submit proposal
          </Button>
        </WalletSwitchNetwork>
      </form>
    </AppLayout>
  )
}
