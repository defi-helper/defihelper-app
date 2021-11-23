import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import * as styles from './beta-access-success.css'

export const BetaAccessSuccess: React.VFC<{ onCancel: () => void }> = (
  props
) => {
  return (
    <Dialog className={styles.root}>
      <Typography align="center" className={styles.title}>
        Your wallet is now connected. Stay tuned for the beta launch
        announcement!
      </Typography>
      <Button onClick={props.onCancel} className={styles.button} size="small">
        Ok
      </Button>
    </Dialog>
  )
}
