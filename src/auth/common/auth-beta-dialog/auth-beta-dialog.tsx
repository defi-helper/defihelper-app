import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Link } from '~/common/link'
import { Typography } from '~/common/typography'
import { config } from '~/config'
import * as styles from './auth-beta-dialog.css'

export type AuthBetaDialogProps = {
  onCancel: () => void
  onConfirm: () => void
}

export const AuthBetaDialog: React.VFC<AuthBetaDialogProps> = (props) => {
  return (
    <Dialog className={styles.root}>
      <Typography variant="body2" weight="semibold" className={styles.title}>
        Important Notice
      </Typography>
      <Typography variant="body2" className={styles.title}>
        The DeFiHelper app is at the MVP stage. Though we try our best, you may
        encounter bugs or other issues. Only the basic set of functionality is
        currently available, including automations, and auto-staking, portfolio
        management and notifications. In the nearest future, we will expand the
        functionality of the service and will connect 100+ more protocols.
      </Typography>
      <Typography variant="body2" className={styles.title}>
        If you encounter any errors or want to propose a new feature/protocol,
        please write to us in{' '}
        <Link
          href="https://t.me/defihelper_chat"
          target="_blank"
          underline="always"
        >
          Telegram
        </Link>
        ,{' '}
        <Link
          href="https://discord.gg/2sT3bmjPhf"
          target="_blank"
          underline="always"
        >
          Discord
        </Link>{' '}
        or via email{' '}
        <Link
          href="mailto: hello@defihelper.io"
          target="_blank"
          underline="always"
        >
          hello@defihelper.io
        </Link>
      </Typography>
      <Typography as="div" variant="body3" className={styles.title}>
        <div>
          <Link
            href="https://github.com/HashEx/public_audits/blob/master/defi-helper/Defi-Helper_audit-report.pdf"
            target="_blank"
            underline="always"
          >
            Security audit by HashEx
          </Link>
        </div>
        <div>
          <Link
            href="https://defihelper.io/static/media/Math_Behind_DeFiHelper.pdf"
            target="_blank"
            underline="always"
          >
            Math behind DFH
          </Link>
        </div>
        <div>
          <Link href={config.MEDIUM_LINK} target="_blank" underline="always">
            How to Enable Auto-Staking In DeFiHelper
          </Link>
        </div>
      </Typography>
      <Button onClick={props.onConfirm} className={styles.button} size="small">
        Continue
      </Button>
    </Dialog>
  )
}
