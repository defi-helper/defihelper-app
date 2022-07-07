import { useState } from 'react'

import { Button } from '~/common/button'
import { Checkbox } from '~/common/checkbox'
import { Dialog } from '~/common/dialog'
import { Link } from '~/common/link'
import { Typography } from '~/common/typography'
import { config } from '~/config'
import * as styles from './auth-video-dialog.css'

export type AuthVideoDialogProps = {
  onCancel: () => void
  onConfirm: (value: boolean) => void
}

const VIDEO_UD = 'VYgoIHapVEM'

export const AuthVideoDialog: React.VFC<AuthVideoDialogProps> = (props) => {
  const [checked, setChecked] = useState(false)

  const handleToggle = () => {
    setChecked(!checked)
  }

  const handleConfirm = () => {
    props.onConfirm(checked)
  }

  return (
    <Dialog className={styles.root}>
      <Typography variant="body2" weight="semibold" className={styles.title}>
        What is DeFiHelper?
      </Typography>
      <div className={styles.videoWrap}>
        <iframe
          className={styles.video}
          scrolling="no"
          title="This is a unique title"
          src={`https://www.youtube.com/embed/${VIDEO_UD}?autoplay=0`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <Link
        href="https://www.youtube.com/channel/UCrR-viomtFZndBdcJZFQe9g"
        target="_blank"
        underline="always"
        className={styles.title}
      >
        More videos
      </Link>
      <Typography variant="body2" weight="semibold" className={styles.title}>
        Important Notice
      </Typography>
      <Typography variant="body2" className={styles.title}>
        DeFiHelper app is currently at the public beta stage. Though we try our
        best, you may encounter bugs or other issues.
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
          <Link href={config.MEDIUM_LINK} target="_blank" underline="always">
            How to Enable Auto-Staking In DeFiHelper
          </Link>
        </div>
      </Typography>
      <Typography as="label" variant="body2" className={styles.checkbox}>
        <Checkbox checked={checked} onChange={handleToggle} />
        <Typography variant="inherit">Don&apos;t show this again</Typography>
      </Typography>
      <Button onClick={handleConfirm} className={styles.button} size="small">
        Continue
      </Button>
    </Dialog>
  )
}
