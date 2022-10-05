import clsx from 'clsx'

import { Button } from '~/common/button'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as telegramModel from '~/settings/settings-telegram/settings-telegram.model'
import * as styles from './invest-staking-steps.css'

export type InvestStakingStepsTelegramProps = unknown

export const InvestStakingStepsTelegram: React.FC<InvestStakingStepsTelegramProps> =
  () => {
    const handleOpenTelegram = () => {
      telegramModel.openTelegram(undefined)
    }

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
