import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '~/common/button'

import { ButtonBase } from '~/common/button-base'
import { Dialog } from '~/common/dialog'
import { Icon } from '~/common/icon'
import { Input } from '~/common/input'
import { Typography } from '~/common/typography'
import * as styles from './autostaking-deploy-dialog.css'

export type AutostakingDeployDialogProps = {
  onConfirm: () => void
}

export const AutostakingDeployDialog: React.VFC<AutostakingDeployDialogProps> =
  (props) => {
    const [open, setOpen] = useState(false)

    const { register, handleSubmit } = useForm()

    const handleOnSubmit = handleSubmit((formValues) => {
      console.log(formValues)

      props.onConfirm()
    })

    const handleToggle = () => setOpen(!open)

    return (
      <Dialog className={styles.root}>
        <div className={styles.mb}>
          <Typography
            variant="body2"
            transform="uppercase"
            className={styles.title}
            as="span"
          >
            DEPLOY
          </Typography>
        </div>
        <Typography variant="body2" className={styles.subtitle}>
          To run any automate you need to deploy your own contract for this
          automation. Your tokens will be transfered to this contarct in later
          step to allow DeFiHelper to manage your automation.
        </Typography>
        <div className={styles.advancedSettings}>
          <ButtonBase onClick={handleToggle}>
            Advanced settings{' '}
            <Icon
              icon={open ? 'arrowUp' : 'arrowDown'}
              width="16"
              height="16"
            />
          </ButtonBase>
        </div>
        <form
          noValidate
          autoComplete="off"
          className={styles.form}
          onSubmit={handleOnSubmit}
        >
          {open && (
            <>
              <Input
                label="LIQUIDITY POOL ROUTER ADDRESS"
                className={styles.mb16}
                {...register('liquiditypool')}
              />
              <Input
                label="TARGET POOL INDEX"
                className={styles.mb16}
                {...register('liquiditypool')}
              />
              <Input
                label="SLIPPAGE (PERCENT)"
                className={styles.mb16}
                {...register('liquiditypool')}
              />
              <Input
                label="DEADLINE (SECONDS)"
                className={styles.mb16}
                {...register('liquiditypool')}
              />
              <Typography variant="body2" className={styles.attention}>
                Attention! Only make changes if you know exactly what you are
                doing. You can lose all of your funds!
              </Typography>
            </>
          )}
          <Button className={styles.button} type="submit" size="small">
            deploy
          </Button>
        </form>
      </Dialog>
    )
  }
