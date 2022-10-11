import { useStore } from 'effector-react'
import clsx from 'clsx'
import { Link as ReactRouterLink } from 'react-router-dom'

import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { InvestContract } from '~/invest/common/invest.types'
import { InvestStepsProgress } from '~/invest/common/invest-steps-progress'
import { UserContactBrokerEnum } from '~/api'
import { paths } from '~/paths'
import * as telegramModel from '~/settings/settings-telegram/settings-telegram.model'
import * as settingsContacts from '~/settings/settings-contacts/settings-contact.model'
import * as styles from './invest-staking-steps.css'

export type InvestStakingStepsSuccessProps = {
  balanceOf?: string
  onSubmit: () => void
  contract: InvestContract
}

export const InvestStakingStepsSuccess: React.FC<InvestStakingStepsSuccessProps> =
  (props) => {
    const contacts = useStore(settingsContacts.$userContactList)

    const telegram = contacts.find(
      ({ broker }) => broker === UserContactBrokerEnum.Telegram
    )

    const handleOpenTelegram = () => {
      telegramModel.openTelegram(undefined)
      props.onSubmit()
    }

    return (
      <>
        <InvestStepsProgress success={2} />
        <Typography
          family="mono"
          transform="uppercase"
          as="div"
          align="center"
          className={styles.title}
        >
          &nbsp;
        </Typography>
        <div className={styles.successContent}>
          <Icon
            icon="checkboxCircle"
            width={100}
            height={100}
            className={styles.checked}
          />
          <Typography as="div" align="center">
            Success! Your transaction
            <br />
            is completed.
          </Typography>
        </div>
        {!telegram?.address && (
          <Typography
            as="div"
            align="center"
            variant="body2"
            className={styles.connnectTelegramHint1}
          >
            Connect your Telegram account and get daily
            <br />
            updates about your portfolio
          </Typography>
        )}
        <div className={clsx(styles.connectTelegramActions, styles.mt)}>
          {!telegram?.address ? (
            <>
              <Button onClick={handleOpenTelegram} color="green">
                CONNECT TELEGRAM
              </Button>
              <ButtonBase as={ReactRouterLink} to={paths.invest.list}>
                SKIP
              </ButtonBase>
            </>
          ) : (
            <Button color="green" as={ReactRouterLink} to={paths.invest.list}>
              ALL DONE
            </Button>
          )}
        </div>
      </>
    )
  }
