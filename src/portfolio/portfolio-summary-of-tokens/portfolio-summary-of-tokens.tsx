import { Typography } from '@material-ui/core'
import { useGate, useStore } from 'effector-react'

import * as model from './portfolio-summary-of-tokens.model'

export type PortfolioSummaryOfTokensProps = unknown

export const PortfolioSummaryOfTokens: React.VFC<PortfolioSummaryOfTokensProps> =
  () => {
    const portfolio = useStore(model.$portfolioSummaryOfTokens)

    useGate(model.PortfolioSummaryOfTokensGate)

    const fetchSummaryOfTokensForLastHourFxLoading = useStore(
      model.fetchSummaryOfTokensForLastHourFx.pending
    )
    const fetchSummaryOfTokensForLastHourFxYesterdayLoading = useStore(
      model.fetchSummaryOfTokensForLastHourForYesterdayFx.pending
    )

    return (
      <div>
        <Typography>
          Summary of all tokens for last hour(usd):{' '}
          {fetchSummaryOfTokensForLastHourFxLoading
            ? 'loading...'
            : portfolio.summaryOfTokensForLastHour.toLocaleString('en-EU')}{' '}
          (
          {fetchSummaryOfTokensForLastHourFxYesterdayLoading
            ? 'loading...'
            : portfolio.summaryDiffOfYesterdayPercent}
          %)
        </Typography>
      </div>
    )
  }
