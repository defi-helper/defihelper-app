import clsx from 'clsx'
import { useStore } from 'effector-react'
import { useEffect, useMemo } from 'react'

import { Button } from '~/common/button'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { authModel } from '~/auth'
import { useOnUserContactActivated } from '~/settings/common'
import { UserContactBrokerEnum, UserContactStatusEnum } from '~/api'
import * as settingsContacts from '~/settings/settings-contacts/settings-contact.model'
import * as telegramModel from '~/settings/settings-telegram/settings-telegram.model'
import * as styles from './invest-staking-steps.css'

export type InvestStakingStepsTelegramProps = {
  onSubmit: () => void
}

export const InvestStakingStepsTelegram: React.FC<InvestStakingStepsTelegramProps> =
  (props) => {
    const user = useStore(authModel.$user)

    const variables = useMemo(() => {
      if (!user) return undefined

      return {
        user: [user.id],
      }
    }, [user])

    useOnUserContactActivated(({ data }) => {
      if (data?.onUserContactActivated) {
        settingsContacts.replaceUserContact(data.onUserContactActivated)
      }
    }, variables)

    const handleOpenTelegram = () => {
      telegramModel.openTelegram(undefined)
    }

    const contacts = useStore(settingsContacts.$userContactList)

    useEffect(() => {
      const activatedTelegram = contacts.find(
        ({ broker, status }) =>
          broker === UserContactBrokerEnum.Telegram &&
          status === UserContactStatusEnum.Active
      )

      if (!activatedTelegram) return

      props.onSubmit()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contacts])

    return (
      <>
        <div className={styles.connectTelegramText}>
          <Icon icon="telegram" width={100} height={100} />
          <Typography as="div" align="center" variant="h4">
            Please confirm your
            <br />
            Telegram username
          </Typography>
        </div>
        <Typography
          variant="body2"
          as={Paper}
          radius={6}
          className={clsx(styles.deployHint, styles.connnectTelegramHint2)}
        >
          Don&apos;t forget to press START in the chat to confirm your username
        </Typography>
        <Button
          onClick={handleOpenTelegram}
          color="green"
          className={styles.mt}
        >
          OPEN TELEGRAM
        </Button>
      </>
    )
  }
