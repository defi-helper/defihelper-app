import clsx from 'clsx'
import { Link as ReactRouterLink } from 'react-router-dom'

import { Button } from '~/common/button'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { InvestStepsProgress } from '~/invest/common/invest-steps-progress'
import { paths } from '~/paths'
import * as styles from './invest-staking-steps.css'

export type InvestStakingStepsTelegramConnectedProps = unknown

export const InvestStakingStepsTelegramConnected: React.FC<InvestStakingStepsTelegramConnectedProps> =
  () => {
    return (
      <>
        <InvestStepsProgress success={3} />
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
        <div className={clsx(styles.connectTelegramActions, styles.mt)}>
          <Button color="green" as={ReactRouterLink} to={paths.invest.list}>
            ALL DONE
          </Button>
        </div>
      </>
    )
  }
