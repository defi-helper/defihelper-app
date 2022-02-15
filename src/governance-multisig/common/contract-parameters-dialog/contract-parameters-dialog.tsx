import { useForm } from 'react-hook-form'
import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Input } from '~/common/input'
import { isEthAddress } from '~/common/is-eth-address'
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
    const { register, handleSubmit, formState } = useForm({
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

    return (
      <Dialog className={styles.root}>
        <form onSubmit={handleOnSubmit}>
          <div className={styles.fn}>
            {props.method.name}
            {props.method.inputs.map((input) => (
              <Input
                key={input.id}
                label={input.name}
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
