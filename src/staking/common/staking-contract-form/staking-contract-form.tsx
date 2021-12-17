import { useForm, Controller } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import ReactSelect from 'react-select'

import { BlockchainEnum } from '~/graphql/_generated-types'
import { Button } from '~/common/button'
import { stakingContractFormSchema } from './staking-contract-form.validation'
import { networksConfig } from '~/networks-config'
import { Input } from '~/common/input'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import { Checkbox } from '~/common/checkbox'
import * as styles from './staking-contract-form.css'

export type FormValues = {
  blockchain: BlockchainEnum
  network: string
  address: string
  adapter: string
  name: string
  description?: string | null
  link?: string | null
  hidden?: boolean | null
  layout: string
  eventsToSubscribe?: string[]
  autorestakeAdapter?: string
  automates: string[]
}

export type StakingContractFormProps = {
  loading: boolean
  onSubmit: (formValues: FormValues) => void
  defaultValues?: Omit<FormValues, 'layout'> & { layout?: string }
  layouts?: string[]
  automates?: string[]
}

export const StakingContractForm: React.VFC<StakingContractFormProps> = (
  props
) => {
  const { register, setValue, handleSubmit, reset, formState, watch, control } =
    useForm<FormValues>({
      resolver: yupResolver(stakingContractFormSchema),
    })

  const [subscribeToEventsFromList, setSubscribeToEventsFromList] =
    useState(false)

  useEffect(() => {
    if (!props.defaultValues) return

    reset(props.defaultValues)
  }, [props.defaultValues, reset])

  useEffect(() => {
    if (!subscribeToEventsFromList) {
      setValue('eventsToSubscribe', undefined)
    } else {
      setValue('eventsToSubscribe', [])
    }
  }, [subscribeToEventsFromList, setValue])

  const currentBlockchain = watch('blockchain')

  const networks = Object.entries(networksConfig)
    .filter(
      ([, { blockchain }]) =>
        blockchain === (currentBlockchain || BlockchainEnum.Ethereum)
    )
    .map(([key, { title }]) => [title, key])

  const automates =
    props.automates?.map((key) => ({ value: key, label: key })) ?? []

  return (
    <form
      noValidate
      autoComplete="off"
      className={styles.root}
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <Input
        type="text"
        label="Name"
        defaultValue={props.defaultValues?.name}
        {...register('name')}
        disabled={props.loading}
        error={Boolean(formState.errors.name)}
        helperText={formState.errors.name?.message}
      />
      <Input
        type="textarea"
        label="Description"
        defaultValue={props.defaultValues?.description ?? ''}
        {...register('description')}
        disabled={props.loading}
        error={Boolean(formState.errors.description)}
        helperText={formState.errors.description?.message}
      />
      <Controller
        control={control}
        name="adapter"
        render={({ field }) => (
          <Select
            type="text"
            label="Adapter"
            defaultValue={props.defaultValues?.adapter}
            {...field}
            disabled={props.loading}
            error={Boolean(formState.errors.adapter)}
            helperText={formState.errors.adapter?.message}
          >
            {props.layouts?.map((layout) => (
              <SelectOption key={layout} value={layout}>
                {layout}
              </SelectOption>
            ))}
          </Select>
        )}
      />
      <Input
        type="text"
        label="Address"
        defaultValue={props.defaultValues?.address}
        {...register('address')}
        disabled={props.loading}
        error={Boolean(formState.errors.address)}
        helperText={formState.errors.address?.message}
      />
      <Typography as="label" variant="body2">
        Subscribe on events from list{' '}
        <Checkbox
          onChange={(event) => {
            setSubscribeToEventsFromList(event.target.checked)
          }}
          disabled={props.loading}
        />
      </Typography>
      {subscribeToEventsFromList && (
        <Input
          type="text"
          label="Events to subscribe"
          onChange={(changeEvent) =>
            setValue(
              'eventsToSubscribe',
              changeEvent.target.value
                ? changeEvent.target.value
                    .split(',')
                    .map((event) => event.trim())
                : []
            )
          }
          disabled={props.loading}
          error={Boolean(formState.errors.eventsToSubscribe)}
        />
      )}
      <Controller
        control={control}
        name="network"
        render={({ field }) => (
          <Select
            type="text"
            label="Network"
            defaultValue={props.defaultValues?.network}
            {...field}
            disabled={props.loading}
            error={Boolean(formState.errors.network)}
            helperText={formState.errors.network?.message}
          >
            {networks.map(([label, value]) => (
              <SelectOption key={value} value={value}>
                {label}
              </SelectOption>
            ))}
          </Select>
        )}
      />
      <Controller
        control={control}
        name="blockchain"
        render={({ field }) => (
          <Select
            type="text"
            label="Blockchain"
            defaultValue={
              props.defaultValues?.blockchain ?? BlockchainEnum.Ethereum
            }
            disabled={props.loading}
            {...field}
            error={Boolean(formState.errors.blockchain)}
            helperText={formState.errors.blockchain?.message}
          >
            {Object.entries(BlockchainEnum).map(([label, value]) => (
              <SelectOption key={label} value={value}>
                {label}
              </SelectOption>
            ))}
          </Select>
        )}
      />
      <Input
        type="text"
        label="Link"
        defaultValue={props.defaultValues?.link ?? ''}
        {...register('link')}
        disabled={props.loading}
        error={Boolean(formState.errors.link)}
        helperText={formState.errors.link?.message}
      />
      <Controller
        name="layout"
        control={control}
        render={({ field }) => (
          <Select
            type="text"
            label="Layout"
            defaultValue={props.defaultValues?.layout}
            {...field}
            disabled={props.loading}
            error={Boolean(formState.errors.layout)}
            helperText={formState.errors.layout?.message}
          >
            <SelectOption value="staking">staking</SelectOption>
          </Select>
        )}
      />
      <Controller
        control={control}
        name="autorestakeAdapter"
        render={({ field }) => (
          <Select
            type="text"
            label="AutorestakeAdapter"
            defaultValue={props.defaultValues?.autorestakeAdapter}
            {...field}
            disabled={props.loading}
            error={Boolean(formState.errors.autorestakeAdapter)}
            helperText={formState.errors.autorestakeAdapter?.message}
          >
            {props.automates?.map((layout) => (
              <SelectOption key={layout} value={layout}>
                {layout}
              </SelectOption>
            ))}
          </Select>
        )}
      />
      <Controller
        control={control}
        name="automates"
        render={({ field }) => (
          <ReactSelect
            placeholder="Automates"
            defaultValue={props.defaultValues?.automates?.map((option) => ({
              label: option,
              value: option,
            }))}
            {...field}
            value={field.value?.map((option) => ({
              label: option,
              value: option,
            }))}
            onChange={(event) =>
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              field.onChange(event.map(({ value }) => value))
            }
            isDisabled={props.loading}
            isMulti
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            options={automates}
          />
        )}
      />
      <Typography as="label" variant="body2">
        Hidden{' '}
        <Checkbox
          defaultChecked={props.defaultValues?.hidden ?? undefined}
          onChange={(event) => setValue('hidden', event.target.checked)}
          disabled={props.loading}
        />
      </Typography>
      <Button
        color="primary"
        variant="contained"
        disabled={props.loading}
        type="submit"
      >
        Submit
      </Button>
    </form>
  )
}
