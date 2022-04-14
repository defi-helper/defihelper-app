import { useGate, useStore } from 'effector-react'
import { useMemo } from 'react'
import { useLocalStorage } from 'react-use'

import { Button } from '~/common/button'
import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { UserContactBrokerEnum } from '~/graphql/_generated-types'
import * as settingsContacts from '~/settings/settings-contacts/settings-contact.model'
import * as styles from './settings-telegram.css'
import * as model from './settings-telegram.model'

export type SettingsTelegramProps = unknown

export const SettingsTelegram: React.VFC<SettingsTelegramProps> = () => {
  const userContact = useStore(model.$userContact)
  const userContacts = useStore(settingsContacts.$userContactList)
  const [noThanks, setNoThanks] = useLocalStorage('telegram', false)

  const contacts = useMemo(
    () => (userContact ? [...userContacts, userContact] : userContacts),
    [userContact, userContacts]
  )

  const hasTelegram = contacts.some(
    ({ broker }) => broker === UserContactBrokerEnum.Telegram
  )

  useGate(settingsContacts.SettingsContactsGate)

  const handleHandleNoThanks = () => setNoThanks(true)

  if (hasTelegram || noThanks) return <></>

  return (
    <Paper radius={8} className={styles.root}>
      <Typography variant="body2" as="div" className={styles.text}>
        Never miss your{' '}
        <Link href="/" target="_blank" color="blue">
          income
        </Link>{' '}
        again with our smart{' '}
        <Link href="/" target="_blank" color="blue">
          telegram notifications
        </Link>
      </Typography>
      <div className={styles.buttons}>
        <Button
          size="small"
          color="blue"
          variant="contained"
          className={styles.button}
          onClick={model.openTelegram}
        >
          Turn on
        </Button>
        <Button
          size="small"
          color="blue"
          variant="outlined"
          className={styles.button}
          onClick={handleHandleNoThanks}
        >
          No Thanks
        </Button>
      </div>
    </Paper>
  )
}
