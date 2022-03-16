import { useState } from 'react'
import { Button } from '~/common/button'

import { Checkbox } from '~/common/checkbox'
import { Dialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import * as styles from './auth-video-dialog.css'

export type AuthVideoDialogProps = {
  onCancel: () => void
  onConfirm: (value: boolean) => void
}

const VIDEO_UD = 'eHe9xVU1pqs'

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
      <div className={styles.videoWrap}>
        <iframe
          className={styles.video}
          scrolling="no"
          title="This is a unique title"
          src={`https://www.youtube.com/embed/${VIDEO_UD}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
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
