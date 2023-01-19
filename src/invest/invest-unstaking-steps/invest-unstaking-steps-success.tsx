import clsx from 'clsx'
import { Link as ReactRouterLink } from 'react-router-dom'

import { Button } from '~/common/button'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { InvestPoolTokens } from '~/invest/common/invest-pool-tokens'
import { InvestContract } from '~/invest/common/invest.types'
import { InvestStepsProgress } from '~/invest/common/invest-steps-progress'
import { paths } from '~/paths'
import * as styles from './invest-unstaking-steps.css'

export type InvestUnstakingStepsSuccessProps = {
  balanceOf?: string
  canMigrate?: boolean
  onSubmit: () => void
  contract: InvestContract
  token?: string
  isUniV3: boolean
}

export const InvestUnstakingStepsSuccess: React.FC<InvestUnstakingStepsSuccessProps> =
  (props) => {
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
            You have successfully withdrawn
            <br />
            funds from the pool
          </Typography>
          <Typography as="div" align="center">
            <div className={styles.pool}>
              <InvestPoolTokens tokens={props.contract.tokens.stake} />
              {props.contract.name}
            </div>
          </Typography>
          {!props.isUniV3 && (
            <>
              <Typography align="center" as="div">
                total withdrawal
              </Typography>
              <Typography variant="h4" align="center" as="div">
                {props.balanceOf ?? '0'} {props.token}
              </Typography>
            </>
          )}
        </div>
        <div className={clsx(styles.connectTelegramActions, styles.mt)}>
          <Button color="green" as={ReactRouterLink} to={paths.invest.list}>
            done
          </Button>
        </div>
      </>
    )
  }
