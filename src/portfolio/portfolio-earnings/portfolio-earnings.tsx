import { useStore } from 'effector-react'
import clsx from 'clsx'
import { useMemo } from 'react'

import { Chart } from '~/common/chart'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { Link } from '~/common/link'
import { config } from '~/config'
import { useTheme } from '~/common/theme'
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
]

export const PortfolioEarnings: React.VFC<PortfolioEarningsProps> = (props) => {
  const portfolioEarnings = useStore(model.$portfolioEarnings)

  const [themeMode] = useTheme()

  const estimatedFields = useMemo(() => {
    return [
      ...ESTIMATED_FIELDS,
      {
        valueY: 'autostaking',
        name: 'Autostaking',
        dateX: 'date',
        color: themeMode === 'dark' ? '#CCFF3C' : '#39C077',
      },
    ]
  }, [themeMode])

  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography>Estimated Earnings (in 3 months)</Typography>
        <Link href={config.MEDIUM_LINK} target="_blank" className={styles.link}>
          How autostaking works
        </Link>
      </div>
      <Chart
        dataFields={estimatedFields}
        id="earnings"
        data={portfolioEarnings.data}
        names={estimatedFields.map(({ name }) => name)}
        // eslint-disable-next-line no-template-curly-in-string
        tooltipText="{name}: [bold]${valueY}[/]"
      />
    </Paper>
  )
}
