import { useEffect, useState } from 'react'

import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { Checkbox } from '~/common/checkbox'
import { Dialog } from '~/common/dialog'
import { Icon } from '~/common/icon'
import { Link } from '~/common/link'
import { Typography } from '~/common/typography'
import * as styles from './autostaking-video-dialog.css'

export type AutostakingVideoDialogProps = {
  dontShowAgain?: boolean
  onDontShowAgain?: (value: boolean) => void
  onConfirm: () => void
}

const VIDEO_UD = 'VYgoIHapVEM'

export const AutostakingVideoDialog: React.VFC<AutostakingVideoDialogProps> = (
  props
) => {
  const [play, setPlay] = useState(false)
  const [dontShow, setDontShow] = useState(props.dontShowAgain ?? false)

  const handleDontShow = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDontShow(event.target.checked)
  }

  const handlePlay = () => {
    setPlay(true)
  }

  useEffect(() => {
    props.onDontShowAgain?.(dontShow)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dontShow])

  return (
    <Dialog className={styles.root}>
      <div className={styles.mb}>
        <Typography
          variant="body2"
          transform="uppercase"
          className={styles.title}
          as="span"
        >
          Enable AUTO-STAKING
        </Typography>
      </div>
      <Typography variant="body2" className={styles.subtitle}>
        Auto-staking is a special kind of automation which auto-compounds your
        tokens at the optimal rate - maximizing profit and minimizing effort.
        Learn more from the video introduction.
      </Typography>
      <div className={styles.video}>
        {play ? (
          <iframe
            className={styles.iframe}
            scrolling="no"
            title="This is a unique title"
            src={`https://www.youtube.com/embed/${VIDEO_UD}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <ButtonBase className={styles.playButton} onClick={handlePlay}>
              <Icon icon="play" />
            </ButtonBase>
            <img
              className={styles.iframe}
              alt=""
              src={`https://img.youtube.com/vi/${VIDEO_UD}/maxresdefault.jpg`}
            />
          </>
        )}
      </div>
      <Link
        href="https://defihelper.io/security"
        color="blue"
        target="_blank"
        className={styles.link}
      >
        Learn more about DeFiHelper security
      </Link>
      {props.onDontShowAgain && (
        <Typography variant="body2" as="label" className={styles.checkbox}>
          <Checkbox onChange={handleDontShow} checked={dontShow} />
          Don&apos;t show this again
        </Typography>
      )}
      <Button size="medium" onClick={props.onConfirm}>
        start
      </Button>
    </Dialog>
  )
}
