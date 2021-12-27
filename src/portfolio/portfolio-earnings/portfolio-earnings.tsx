import { useStore } from 'effector-react'
import clsx from 'clsx'

import { Chart } from '~/common/chart'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { Link } from '~/common/link'
import { config } from '~/config'
import * as model from './portfolio-earnings.model'
import * as styles from './portfolio-earnings.css'

export type PortfolioEarningsProps = {
  className?: string
}

const ESTIMATED_FIELDS = [
  {
    valueY: 'hold',
    name: 'Just holding',
    dateX: 'date',
    color: '#F08BA9',
  },
  {
    valueY: 'autostaking',
    name: 'Autostaking',
    dateX: 'date',
    color: '#CCFF3C',
  },
]

export const PortfolioEarnings: React.VFC<PortfolioEarningsProps> = (props) => {
  const portfolioEarnings = useStore(model.$portfolioEarnings)

  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography>Estimated Earnings (in 3 months)</Typography>
        <Link href={config.MEDIUM_LINK} target="_blank" className={styles.link}>
          How autostaking works
        </Link>
      </div>
      <Chart
        dataFields={ESTIMATED_FIELDS}
        id="earnings"
        data={portfolioEarnings.data}
        names={ESTIMATED_FIELDS.map(({ name }) => name)}
        // eslint-disable-next-line no-template-curly-in-string
        tooltipText="{name}: [bold]${valueY}[/]"
      />
    </Paper>
  )
}
