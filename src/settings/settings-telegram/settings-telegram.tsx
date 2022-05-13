import { useGate, useStore } from 'effector-react'
import { useMemo } from 'react'
import { useLocalStorage } from 'react-use'

import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { UserContactBrokerEnum } from '~/api/_generated-types'
import * as settingsContacts from '~/settings/settings-contacts/settings-contact.model'
import * as styles from './settings-telegram.css'
import * as model from './settings-telegram.model'

export type SettingsTelegramProps = unknown

export const SettingsTelegram: React.VFC<SettingsTelegramProps> = () => {
  const userContact = useStore(model.$userContact)
  const userContacts = useStore(settingsContacts.$userContactList)
  const [noThanks, setNoThanks] = useLocalStorage('telegram', false)
  const loading = useStore(settingsContacts.fetchUserContactListFx.pending)

  const contacts = useMemo(
    () => (userContact ? [...userContacts, userContact] : userContacts),
    [userContact, userContacts]
  )

  const hasTelegram = contacts.some(
    ({ broker }) => broker === UserContactBrokerEnum.Telegram
  )

  useGate(settingsContacts.SettingsContactsGate)

  const handleHandleNoThanks = () => setNoThanks(true)

  if (hasTelegram || noThanks || loading) return <></>

  return (
    <Paper radius={4} className={styles.root}>
      <div className={styles.alert}>
        <div className={styles.alertHeader}>
          <div className={styles.alertIcon}>
            <Icon icon="logoMini" width={6} height={5} />
          </div>
          <Typography
            variant="inherit"
            transform="uppercase"
            className={styles.alertTitle}
          >
            DEFIHELPER.IO
          </Typography>
          <Typography variant="inherit" className={styles.alertTime}>
            now
          </Typography>
        </div>
        <Typography
          variant="body2"
          as="div"
          weight="bold"
          className={styles.alertSubtitle}
        >
          Auto-stake notifications
        </Typography>
        <div className={styles.alertText}>
          <Typography variant="inherit" as="div">
            Tracked Balance $3000.41,
          </Typography>
          <Typography variant="inherit" as="div">
            Total unclaimed $652.05
          </Typography>
        </div>
      </div>
      <Typography variant="body3" as="div" className={styles.text}>
        Do you want to receive daily updates on your portfolio&apos;s balance?
      </Typography>
      <div className={styles.buttons}>
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={styles.button}
          onClick={model.openTelegram}
        >
          Turn on notifications
        </Button>
        <ButtonBase onClick={handleHandleNoThanks} className={styles.close}>
          No, thanks
        </ButtonBase>
      </div>
    </Paper>
  )
}
