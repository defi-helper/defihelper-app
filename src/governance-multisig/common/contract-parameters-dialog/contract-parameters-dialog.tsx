import { useForm } from 'react-hook-form'
import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Input } from '~/common/input'
import { isEthAddress } from '~/common/is-eth-address'
import { GovernancePowOptions } from '~/governance/common'
import * as styles from './contract-parameters-dialog.css'

export type ContractParametersDialogProps = {
  method: {
    name: string
    id: string
    inputs: {
      type: string
      name: string
      id: string
      value?: string
    }[]
  }
  onConfirm: (params: {
    name: string
    params: { name: string; type: string; value: string }[]
  }) => void
}

export const ContractParametersDialog: React.VFC<ContractParametersDialogProps> =
  (props) => {
    const { register, handleSubmit, formState, setValue, getValues, trigger } =
      useForm({
        defaultValues: props.method.inputs.reduce<
          Record<string, Record<string, string>>
        >((acc, param) => {
          acc[param.name] = {
            [param.type]: param.value ?? '',
          }

          return acc
        }, {}),
      })

    const handleOnSubmit = handleSubmit((formValues) => {
      props.onConfirm({
        name: props.method.name,
        params: Object.entries(formValues).map(([name, valueObj]) => {
          const [element] = Object.entries(valueObj) ?? []
          const [type, value] = element

          return {
            name,
            type,
            value,
          }
        }),
      })
    })

    const handleChangeUintValue = (name: string) => async (pow: string) => {
      await trigger(name, { shouldFocus: true })

      const values = getValues(name)

      setValue(name, ((values || 1) + pow) as unknown as Record<string, string>)
    }

    return (
      <Dialog className={styles.root}>
        <form onSubmit={handleOnSubmit}>
          <div className={styles.fn}>
            {props.method.name}
            {props.method.inputs.map((input) => (
              <Input
                key={input.id}
                label={
                  <>
                    {input.name}{' '}
                    {input.type === 'uint256' && (
                      <GovernancePowOptions
                        onClick={handleChangeUintValue(
                          `${input.name}.${input.type}`
                        )}
                        className={styles.pow}
                      />
                    )}
                  </>
                }
                placeholder={input.type}
                className={styles.input}
                error={Boolean(
                  formState.errors?.[input.name]?.[input.type]?.message
                )}
                helperText={
                  formState.errors?.[input.name]?.[input.type]?.message
                }
                {...register(`${input.name}.${input.type}`, {
                  required: true,
                  pattern:
                    input.type === 'address' ? isEthAddress.regex : undefined,
                })}
              />
            ))}
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Dialog>
    )
  }
