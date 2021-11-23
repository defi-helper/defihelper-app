import { useEffect } from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { v4 as uuidv4 } from 'uuid'

import { Checkbox } from '~/common/checkbox'
import { Input } from '~/common/input'
import { Button } from '~/common/button'
import { Select, SelectOption } from '~/common/select'
import { ProtocolLinkInputType } from '~/graphql/_generated-types'
import { Typography } from '~/common/typography'
import { ButtonBase } from '~/common/button-base'
import * as styles from './protocol-form.css'
import { protocolFormSchema } from './protocol-form.validation'
import { Icon } from '~/common/icon'

type FormValues = {
  name: string
  description?: string
  icon?: string
  link?: string
  hidden?: boolean
  adapter: string
  links: {
    social: ProtocolLinkInputType[]
    listing: ProtocolLinkInputType[]
    audit: ProtocolLinkInputType[]
    other: ProtocolLinkInputType[]
  }
}

export type ProtocolFormProps = {
  loading: boolean
  onSubmit: (formValues: FormValues) => void
  defaultValues?: FormValues
  adapters: string[]
}

type LinkEnum = 'social' | 'audit' | 'other' | 'listing'

export const ProtocolForm: React.VFC<ProtocolFormProps> = (props) => {
  const { register, handleSubmit, setValue, reset, formState, control } =
    useForm<FormValues>({
      resolver: yupResolver(protocolFormSchema),
    })

  const social = useFieldArray({
    control,
    name: 'links.social',
  })
  const audit = useFieldArray({
    control,
    name: 'links.audit',
  })
  const other = useFieldArray({
    control,
    name: 'links.other',
  })
  const listing = useFieldArray({
    control,
    name: 'links.listing',
  })

  useEffect(() => {
    reset(props.defaultValues)
  }, [reset, props.defaultValues])

  const hidden = register('hidden')

  const fieldArrays = {
    social,
    audit,
    other,
    listing,
  }

  const handleAddLink = (type: LinkEnum) => () => {
    fieldArrays[type].append({
      id: uuidv4(),
      name: '',
      value: '',
    })
  }

  const handleRemoveLink = (type: LinkEnum, index: number) => () => {
    fieldArrays[type].remove(index)
  }

  const renderLinksSection = (type: LinkEnum) => {
    return (
      <div className={styles.input}>
        <Typography variant="body2" className={styles.title}>
          {type}
        </Typography>
        {fieldArrays[type].fields.map((socialItem, index) => (
          <div key={socialItem.id} className={styles.links}>
            <Input
              label="Title"
              {...register(`links.${type}.${index}.name`)}
              helperText={
                formState.errors.links?.[type]?.[index]?.name?.message
              }
              error={Boolean(
                formState.errors.links?.[type]?.[index]?.name?.message
              )}
            />
            <Input
              label="Link"
              {...register(`links.${type}.${index}.value`)}
              helperText={
                formState.errors.links?.[type]?.[index]?.value?.message
              }
              error={Boolean(
                formState.errors.links?.[type]?.[index]?.value?.message
              )}
            />
            <ButtonBase
              className={styles.linksRemove}
              onClick={handleRemoveLink(type, index)}
            >
              <Icon icon="close" width="24" height="24" />
            </ButtonBase>
          </div>
        ))}
        <ButtonBase onClick={handleAddLink(type)} className={styles.linksAdd}>
          <Icon icon="plus" width="11" height="11" />
        </ButtonBase>
      </div>
    )
  }

  return (
    <form
      className={styles.root}
      onSubmit={handleSubmit(props.onSubmit)}
      noValidate
      autoComplete="off"
    >
      <Input
        type="text"
        label="Name"
        {...register('name')}
        disabled={props.loading}
        error={Boolean(formState.errors.name)}
        helperText={formState.errors.name?.message}
        className={styles.input}
      />
      <Input
        type="textarea"
        label="Description"
        {...register('description')}
        disabled={props.loading}
        error={Boolean(formState.errors.description)}
        helperText={formState.errors.description?.message}
        className={styles.input}
      />
      <Input
        type="text"
        label="Icon"
        {...register('icon')}
        disabled={props.loading}
        error={Boolean(formState.errors.icon)}
        helperText={formState.errors.icon?.message}
        className={styles.input}
      />
      <Controller
        control={control}
        name="adapter"
        render={({ field }) => (
          <Select
            type="text"
            label="Adapter"
            disabled={props.loading}
            error={Boolean(formState.errors.adapter)}
            helperText={formState.errors.adapter?.message}
            className={styles.input}
            {...field}
          >
            {props.adapters.map((adapter) => (
              <SelectOption key={adapter} value={adapter}>
                {adapter}
              </SelectOption>
            ))}
          </Select>
        )}
      />
      <Input
        type="text"
        label="Link"
        {...register('link')}
        disabled={props.loading}
        error={Boolean(formState.errors.link)}
        helperText={formState.errors.link?.message}
        className={styles.input}
      />
      {renderLinksSection('social')}
      {renderLinksSection('listing')}
      {renderLinksSection('audit')}
      {renderLinksSection('other')}
      <Typography variant="body2" as="label" className={styles.input}>
        Hidden{' '}
        <Checkbox
          ref={hidden.ref}
          defaultChecked={props.defaultValues?.hidden}
          onChange={({ target }) => setValue('hidden', target.checked)}
          disabled={props.loading}
        />
      </Typography>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={props.loading}
      >
        Submit
      </Button>
    </form>
  )
}
