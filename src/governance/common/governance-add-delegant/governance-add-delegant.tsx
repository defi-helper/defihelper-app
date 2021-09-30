import { useForm } from 'react-hook-form'

import { Button } from '~/common/button'
import { Input } from '~/common/input'
import { Typography } from '~/common/typography'
import { isEthAddress } from '~/common/is-eth-address'
import * as styles from './governance-add-delegant.css'

type FormValues = {
  address: string
}

export type GovernanceAddDelegantProps = {
  onSubmit: (address: string) => void
}

export const GovernanceAddDelegant: React.VFC<GovernanceAddDelegantProps> = (
  props
) => {
  const { handleSubmit, register, formState } = useForm<FormValues>()

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(({ address }) => props.onSubmit(address))}
      className={styles.root}
    >
      <div className={styles.input}>
        <Input
          placeholder="Deligant address"
          {...register('address', {
            required: true,
            pattern: isEthAddress.regex,
          })}
          disabled={formState.isSubmitting}
        />
        {formState.errors.address && (
          <>
            {formState.errors.address.type === 'required' && (
              <Typography className={styles.error}>
                {formState.errors.address.type}
              </Typography>
            )}
            {formState.errors.address.type === 'pattern' && (
              <Typography className={styles.error}>
                is not ethereum address
              </Typography>
            )}
          </>
        )}
      </div>
      <Button type="submit" disabled={formState.isSubmitting}>
        Delegate
      </Button>
    </form>
  )
}
