import { useMedia } from 'react-use'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import * as styles from './page-top-notifications.css'

export const PageTopNotifications: React.FC<{
  close: () => void
}> = ({ close }) => {
  const isDesktop = useMedia('(min-width: 600px)')

  return (
    <div className={styles.topNotificaionWrapper}>
      <div className={styles.notificationContainer}>
        <Typography className={styles.notificaionText}>
          Hi! You are at DeFiHelper — non-custodial DeFi investment assistant
          with auto-staking feauture. We have a lot of features - you can learn
          more about them on our website :)
        </Typography>

        <div className={styles.notificationContainerButtonWrapper}>
          {isDesktop && (
            <ButtonBase
              className={styles.learnMoreButton}
              onClick={() => window.open('https://defihelper.io', '_blank')}
            >
              LEARN MORE
            </ButtonBase>
          )}
        </div>

        {isDesktop && (
          <ButtonBase className={styles.closeButton} onClick={close}>
            <Icon icon="close" className={styles.closeIcon} />
          </ButtonBase>
        )}
      </div>

      {!isDesktop && (
        <div className={styles.mobileActions}>
          <ButtonBase
            className={styles.learnMoreButton}
            onClick={() => window.open('https://defihelper.io', '_blank')}
          >
            LEARN MORE
          </ButtonBase>
          <ButtonBase className={styles.notNowButton} onClick={close}>
            NOT NOW
          </ButtonBase>
        </div>
      )}
    </div>
  )
}
