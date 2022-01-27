import { useStore } from 'effector-react'
import clsx from 'clsx'
import { useMemo } from 'react'

import { Chart } from '~/common/chart'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { useTheme } from '~/common/theme'
import { Dropdown } from '~/common/dropdown'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import * as model from './portfolio-earnings.model'
import * as styles from './portfolio-earnings.css'

export type PortfolioEarningsProps = {
  className?: string
}

const ESTIMATED_FIELDS = [
  {
    valueY: 'hold',
    format: 'holdFormat',
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
        format: 'autostakingFormat',
        name: 'Autostaking',
        dateX: 'date',
        color: themeMode === 'dark' ? '#CCFF3C' : '#39C077',
      },
    ]
  }, [themeMode])

  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <div className={styles.header}>
        <Typography className={styles.title}>
          Estimated Earnings in 3 months
          <Dropdown
            control={
              <ButtonBase className={styles.question}>
                <Icon icon="question" width="24" height="24" />
              </ButtonBase>
            }
            trigger="hover"
            offset={[0, 8]}
          >
            text
          </Dropdown>
        </Typography>
      </div>
      <Chart
        dataFields={estimatedFields}
        id="earnings"
        data={portfolioEarnings.data}
        names={estimatedFields.map(({ name }) => name)}
        // eslint-disable-next-line no-template-curly-in-string
        tooltipText="{name}: [bold]${format}[/]"
      />
    </Paper>
  )
}
