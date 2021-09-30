import { useForm, Controller } from 'react-hook-form'

import { ButtonBase } from '~/common/button-base'
import { Button } from '~/common/button'
import { Typography } from '~/common/typography'
import { Input } from '~/common/input'
import { isEthAddress } from '~/common/is-eth-address'
import { GovernanceActionArguments } from '../governance.types'
import * as styles from './governance-actions-manually-params.css'

export type GovernanceActionsManuallyParamsProps = {
  contract?: number | string
  methodName: string
  inputs: GovernanceActionArguments
  onSubmit: (value: GovernanceActionArguments) => void
}

const powOptions = [6, 8, 18]

const PowOptions: React.VFC<{ onClick: (option: string) => void }> = (
  props
) => {
  const handleOnClick = (option: number | string) => () => {
    if (typeof option === 'number') {
      return props.onClick(Array(option).fill(0).join(''))
    }

    const propmtValue = Number(
      // eslint-disable-next-line no-alert
      window.prompt('please! enter custom format')
    )

    if (!propmtValue) {
      // eslint-disable-next-line no-alert
      return window.alert('please! enter value')
    }

    if (Number.isNaN(propmtValue)) {
      // eslint-disable-next-line no-alert
      return window.alert('only numeric values are allowed')
    }

    const value = Array(propmtValue).fill(0).join('')

    props.onClick(value)
  }

  return (
    <div className={styles.pow}>
      {powOptions.map((option) => (
        <ButtonBase
          className={styles.powOption}
          key={option}
          onClick={handleOnClick(option)}
        >
          10<sup>{option}</sup>
        </ButtonBase>
      ))}
      <ButtonBase
        className={styles.powOption}
        onClick={handleOnClick('custom')}
      >
        custom
      </ButtonBase>
    </div>
  )
}

export const GovernanceActionsManuallyParams: React.FC<GovernanceActionsManuallyParamsProps> =
  (props) => {
    const { handleSubmit, formState, setValue, getValues, trigger, control } =
      useForm({
        defaultValues: props.inputs,
      })

    const handleChangeUintValue = (name: string) => async (pow: string) => {
      await trigger(name, { shouldFocus: true })

      const values = getValues(name)

      setValue(name, {
        ...values,
        value: (values.value || 1) + pow,
      })
    }

    return (
      <>
        <Typography
          variant="h3"
          family="mono"
          transform="uppercase"
          className={styles.title}
        >
          {props.children}
        </Typography>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(props.onSubmit)}
          className={styles.form}
        >
          {Object.entries(props.inputs).map(([name, input]) => {
            return (
              <div key={name} className={styles.input}>
                {input.type === 'uint256' && (
                  <PowOptions onClick={handleChangeUintValue(name)} />
                )}
                <Controller
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={`Enter ${name}(${input.type})`}
                      disabled={formState.isSubmitting}
                      value={field.value || input.value}
                    />
                  )}
                  name={`${name}.value`}
                  control={control}
                  rules={{
                    required: true,
                    pattern:
                      input.type === 'address' ? isEthAddress.regex : undefined,
                  }}
                />
                {formState.errors[name]?.value && (
                  <Typography className={styles.error}>
                    {formState.errors[name]?.value?.type === 'required' &&
                      'required'}
                    {formState.errors[name]?.value?.type === 'pattern' &&
                      'is not ethereum address'}
                  </Typography>
                )}
              </div>
            )
          })}
          <Button
            type="submit"
            disabled={formState.isSubmitting}
            className={styles.button}
          >
            Submit
          </Button>
        </form>
      </>
    )
  }
