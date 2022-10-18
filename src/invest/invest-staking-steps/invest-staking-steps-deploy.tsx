import { Button } from '~/common/button'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { InvestContract } from '~/invest/common/invest.types'
import { InvestStepsProgress } from '~/invest/common/invest-steps-progress'
import * as styles from './invest-staking-steps.css'

export type InvestStakingStepsDeployProps = {
  onDeploy: () => void
  loading: boolean
  contract: InvestContract
}

export const InvestStakingStepsDeploy: React.FC<InvestStakingStepsDeployProps> =
  (props) => {
    return (
      <>
        <InvestStepsProgress current={1} success={0} />
        <Typography
          family="mono"
          transform="uppercase"
          as="div"
          align="center"
          className={styles.title}
        >
          DEPLOY CONTRACT
        </Typography>
        <div className={styles.deployContent}>
          <Icon
            icon="deploy"
            width={100}
            height={100}
            className={styles.checked}
          />
          <Typography as="div" align="center">
            To control your investments, you need to deploy your own personal
            contract. Later, you can set up a Stop-Loss.
          </Typography>
          <Typography
            variant="body2"
            as={Paper}
            radius={6}
            className={styles.deployHint}
          >
            DeFiHelper doesn&apos;t have any access to your funds. If you lose
            access to your wallet, funds will be lost.
          </Typography>
        </div>
        <Button
          onClick={props.onDeploy}
          loading={props.loading}
          color="green"
          className={styles.mt}
        >
          DEPLOY CONTRACT
        </Button>
      </>
    )
  }
