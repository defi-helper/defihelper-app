import { useForm, Controller } from 'react-hook-form'

import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { NumericalInput } from '~/common/numerical-input'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import { Loader } from '~/common/loader'
import { Input } from '~/common/input'
import { MarkdownRender } from '~/common/markdown-render'
import { StakingAdapterRadio } from '~/staking/common/staking-adapter-radio'
import * as styles from './staking-stake-dialog.css'

export type StakingStakeDialogProps = {
  onConfirm: () => void
}

export const StakingStakeDialog: React.FC<StakingStakeDialogProps> = () => {
  const { control, formState } = useForm()

  const loading = false

  return (
    <Dialog className={styles.root}>
      {loading ? (
        <div className={styles.loader}>
          <Loader height="36" />
        </div>
      ) : (
        <>
          <div className={styles.description}>
            <MarkdownRender>description</MarkdownRender>
          </div>
          <form noValidate autoComplete="off" className={styles.form}>
            {([] as any[]).map((input, index) => {
              const Component = !input.value ? Input : NumericalInput

              return (
                <Controller
                  control={control}
                  key={input.placeholder}
                  name={`stake.${index}`}
                  render={({ field }) => {
                    const components: Record<string, JSX.Element> = {
                      select: (
                        <Select
                          {...field}
                          label={input.placeholder}
                          value={field.value || input.value}
                          className={styles.input}
                          disabled={formState.isSubmitting}
                        >
                          {input.options?.map((option: any) => (
                            <SelectOption
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </SelectOption>
                          ))}
                        </Select>
                      ),
                      radio: (
                        <div>
                          <Typography
                            as="div"
                            variant="body2"
                            family="mono"
                            transform="uppercase"
                            className={styles.label}
                          >
                            {input.placeholder}
                          </Typography>
                          {input.options?.map((option: any) => (
                            <StakingAdapterRadio
                              key={option.value}
                              {...field}
                              value={option.value}
                              className={styles.radio}
                              disabled={formState.isSubmitting}
                            >
                              {option.label}
                            </StakingAdapterRadio>
                          ))}
                        </div>
                      ),
                    }

                    return (
                      components[input.type] ?? (
                        <Component
                          label={input.placeholder}
                          disabled={formState.isSubmitting}
                          className={styles.input}
                          {...field}
                          value={field.value || input.value}
                        />
                      )
                    )
                  }}
                />
              )
            })}
            <Button
              type="submit"
              loading={formState.isSubmitting}
              className={styles.button}
            >
              stake
            </Button>
          </form>
        </>
      )}
    </Dialog>
  )
}
