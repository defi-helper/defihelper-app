import { useMemo } from 'react'
import { useForm, Controller, ErrorOption } from 'react-hook-form'
import omit from 'lodash.omit'

import { Button } from '~/common/button'
import { Input } from '~/common/input'
import { isEthAddress } from '~/common/is-eth-address'
import { Typography } from '~/common/typography'
import { GovernanceAction } from '../governance.types'
import * as styles from './governance-actions-template-params.css'

type Action = {
  contract: string
  method: string
  address: string
  inputs: {
    type: string
    value: string
    presetVariable: string
    name: string
    variable: boolean
  }[]
}

type ActionInput = Action['inputs'][number]

export type GovernanceActionsTemplateParamsProps = {
  actions?: Action[]
  onSubmit: (value: GovernanceAction[]) => void
}

type FormValues = Record<string, Record<string, Partial<ActionInput>>>

const isErrorOption = (
  name: string,
  error: unknown
): error is Record<string, Record<string, ErrorOption>> => {
  return typeof error === 'object' && error !== null && name in error
}

export const GovernanceActionsTemplateParams: React.FC<GovernanceActionsTemplateParamsProps> =
  (props) => {
    const defaultValues = useMemo(
      () =>
        props.actions?.reduce<FormValues>((actionAcc, action) => {
          const contract: Record<string, Partial<ActionInput>> = {
            ...actionAcc[action.contract],
            [action.method]: action.inputs.reduce<Record<string, ActionInput>>(
              (methodAcc, input) => {
                return {
                  ...methodAcc,
                  [input.name]: input,
                }
              },
              {}
            ),
          }

          return {
            ...actionAcc,
            [action.contract]: contract,
          }
        }, {}),
      [props.actions]
    )

    const {
      handleSubmit: hookFormSubmit,
      control,
      formState,
    } = useForm<FormValues>({
      defaultValues,
    })

    const handleSubmit = (formValues: FormValues) => {
      const arrFormValues = Object.entries({
        ...defaultValues,
        ...formValues,
      }).flatMap(([contract, value]) => {
        return Object.entries(value).map(([method, args]) => ({
          contract,
          method,
          arguments: omit(args, ['presetVariable', 'variable']),
        }))
      }) as GovernanceAction[]

      props.onSubmit(arrFormValues)
    }

    return (
      <>
        <Typography
          variant="h3"
          family="mono"
          transform="uppercase"
          className={styles.title}
          as="div"
        >
          {props.children}
        </Typography>
        <form
          noValidate
          autoComplete="off"
          onSubmit={hookFormSubmit(handleSubmit)}
        >
          {props.actions?.map((action, actionIndex) => {
            return (
              <div key={String(actionIndex)} className={styles.action}>
                <Typography variant="body2">
                  Action: {actionIndex + 1}
                </Typography>
                <Typography variant="body2">
                  {action.contract}.{action.method}
                </Typography>
                {action.inputs.map((input, inputIndex) => {
                  if (!input.variable) return null

                  const method =
                    formState.errors[action.contract]?.[action.method]

                  const error = isErrorOption(input.name, method)
                    ? method
                    : null

                  return (
                    <div key={String(inputIndex)} className={styles.input}>
                      <Controller
                        control={control}
                        name={`${action.contract}.${action.method}.${input.name}.value`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder={`Enter ${input.name}(${input.type})`}
                          />
                        )}
                        rules={{
                          required: true,
                          pattern:
                            input.type === 'address'
                              ? isEthAddress.regex
                              : undefined,
                        }}
                      />
                      {error?.[input.name].value && (
                        <Typography>
                          {error?.[input.name].value.type === 'required' &&
                            'required'}
                          {error?.[input.name].value.type === 'pattern' &&
                            'is not ethereum address'}
                        </Typography>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
          <Button type="submit">Add preset</Button>
        </form>
      </>
    )
  }
