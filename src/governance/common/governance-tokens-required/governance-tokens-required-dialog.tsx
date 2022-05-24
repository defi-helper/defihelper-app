import { Dialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import * as styles from './governance-tokens-required-dialog.css'

export const GovernanceTokensRequired: React.VFC = () => {
  return (
    <Dialog className={styles.root}>
      <Typography variant="h4" className={styles.title}>
        10,000,000 DFH required
      </Typography>
      <Typography>
        In order to create new proposals you need to have at least 10,000,000
        DFH on your wallet and delegate votes.
      </Typography>
    </Dialog>
  )
}
