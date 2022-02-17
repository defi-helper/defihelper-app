import isEmpty from 'lodash.isempty'
import { useAsync } from 'react-use'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'

import { Button } from '~/common/button'
import { NumericalInput } from '~/common/numerical-input'
import { Select, SelectOption } from '~/common/select'
import { AutomationForm } from '../automation-form'
import { AutomationChooseButton } from '../automation-choose-button'
import { useDialog } from '~/common/dialog'
import { ConditionTypes } from '~/automations/common/automation.constants'
import { Contract, Protocol } from '~/automations/common/automation.types'
import { automationConditionContractMetricSchema } from './automation-condition-contract-metric.validation'
import { AutomationProtocolDialog } from '../automation-protocol-dialog'
import * as styles from './automation-condition-contract-metric.css'
import { AutomationContractDialog } from '../automation-contract-dialog'
import { toastsService } from '~/toasts'
import { bignumberUtils } from '~/common/bignumber-utils'

const MetricTypes = {
  TVL: 'tvl',
  'Yearly APR': 'aprYear',
  'Monthly APR': 'aprMonth',
  'Weekly APR': 'aprWeek',
  'Daily APR': 'aprDay',
} as const

type FormValues = {
  contract: string
  protocol: Protocol
  metric: typeof MetricTypes[keyof typeof MetricTypes]
  op: '>' | '>=' | '<' | '<=' | '!=' | '=='
  value: string
}

export type AutomationConditionContractMetricProps = {
  onSubmit: (formValues: string) => void
  defaultValues?: Omit<FormValues, 'protocol'>
  getProtocols: () => Promise<Protocol[]>
}

const isError = (object: unknown): object is { message: string } => {
  return typeof object === 'object' && object !== null && 'message' in object
}

const isApr = (value: string) => {
  const arr: string[] = [
    MetricTypes['Daily APR'],
    MetricTypes['Monthly APR'],
    MetricTypes['Weekly APR'],
    MetricTypes['Yearly APR'],
  ]

  return arr.includes(value)
}

export const AutomationConditionContractMetric: React.VFC<AutomationConditionContractMetricProps> =
  (props) => {
    const protocols = useAsync(props.getProtocols, [])

    const [openProtocolDialog] = useDialog(AutomationProtocolDialog)
    const [openContractDialog] = useDialog(AutomationContractDialog)

    const {
      register,
      handleSubmit,
      formState,
      control,
      setValue,
      watch,
      trigger,
      getValues,
      reset,
    } = useForm<FormValues>({
      resolver: yupResolver(automationConditionContractMetricSchema),
    })

    const handleChooseProtocol = async () => {
      if (isEmpty(protocols.value) || !protocols.value) return

      try {
        const result = await openProtocolDialog({
          protocols: protocols.value,
        })

        setValue('protocol', result)
        setValue('contract', '')
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }
    const handleChooseContract = async () => {
      const curProtocol = getValues('protocol')

      if (!curProtocol) return toastsService.error('choose protocol')

      const contracts = curProtocol.contracts?.list ?? []

      if (isEmpty(contracts))
        return toastsService.error('protocol does not have contracts')

      try {
        const result = await openContractDialog({
          contracts,
        })

        setValue('contract', result.id)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

    const contracts = watch('protocol.contracts.list')?.reduce<
      Record<string, Contract>
    >((acc, contract) => {
      acc[contract.id] = contract

      return acc
    }, {})

    useEffect(() => {
      const curProtocol = protocols.value?.find((protocol) =>
        protocol.contracts.list?.some(
          ({ id }) => id === props.defaultValues?.contract
        )
      )

      if (!curProtocol || !props.defaultValues) return

      const { value, metric, ...restDefaultValues } = props.defaultValues

      reset({
        ...restDefaultValues,
        protocol: curProtocol,
        metric,
        value: isApr(value) ? bignumberUtils.mul(value, 100) : value,
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.defaultValues, protocols.value])

    const protocolId = watch('protocol.id')
    const contractId = watch('contract')

    useEffect(() => {
      if (!protocolId) return

      trigger('protocol')
    }, [protocolId, trigger])

    useEffect(() => {
      if (!contractId) return

      trigger('contract')
    }, [contractId, trigger])

    return (
      <AutomationForm
        onSubmit={handleSubmit((formValues) => {
          const { value, metric, ...restFormValues } = formValues

          props.onSubmit(
            JSON.stringify({
              ...restFormValues,
              metric,
              value: isApr(value) ? bignumberUtils.div(value, 100) : value,
            })
          )
        })}
      >
        <Controller
          control={control}
          name="protocol"
          render={({ field }) => (
            <AutomationChooseButton
              label="protocol"
              onClick={handleChooseProtocol}
              className={styles.input}
              disabled={Boolean(props.defaultValues)}
              error={
                isError(formState.errors.protocol)
                  ? formState.errors.protocol?.message
                  : undefined
              }
            >
              {(field.value && (
                <>
                  {field.value.icon && (
                    <img src={field.value.icon} width="28" height="28" alt="" />
                  )}
                  {field.value.name}
                </>
              )) ||
                'Choose protocol'}
            </AutomationChooseButton>
          )}
        />
        <Controller
          control={control}
          name="contract"
          render={({ field }) => {
            const currentContract = contracts?.[field?.value]

            return (
              <AutomationChooseButton
                label="contract"
                onClick={handleChooseContract}
                className={styles.input}
                disabled={Boolean(props.defaultValues)}
                error={
                  isError(formState.errors.contract)
                    ? formState.errors.contract?.message
                    : undefined
                }
              >
                {currentContract?.name || 'Choose contract'}
              </AutomationChooseButton>
            )
          }}
        />
        <Controller
          render={({ field }) => (
            <Select
              {...field}
              label="Metric"
              helperText={formState.errors.metric?.message}
              error={Boolean(formState.errors.metric?.message)}
              value={field.value || props.defaultValues?.metric || ''}
              className={styles.input}
            >
              {Object.entries(MetricTypes).map(([key, value]) => (
                <SelectOption key={key} value={value}>
                  {key}
                </SelectOption>
              ))}
            </Select>
          )}
          name="metric"
          control={control}
        />
        <Controller
          render={({ field }) => (
            <Select
              {...field}
              label="Condition"
              helperText={formState.errors.op?.message}
              error={Boolean(formState.errors.op?.message)}
              value={field.value || props.defaultValues?.op || ''}
              className={styles.input}
            >
              {Object.entries(ConditionTypes).map(([key, value]) => (
                <SelectOption key={key} value={value}>
                  {value}
                </SelectOption>
              ))}
            </Select>
          )}
          name="op"
          control={control}
        />
        <NumericalInput
          label="value"
          {...register('value')}
          helperText={formState.errors.value?.message}
          error={Boolean(formState.errors.value?.message)}
          value={props.defaultValues?.value}
          className={styles.input}
        />
        <Button type="submit" size="small">
          Save
        </Button>
      </AutomationForm>
    )
  }
