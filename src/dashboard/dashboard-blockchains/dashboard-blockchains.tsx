import { useGate, useStore } from 'effector-react'
import { Paper, Typography } from '@material-ui/core'

import * as model from './dashboard-blockchains.model'

export type DashboardBlockchainsProps = unknown

export const DashboardBlockchains: React.FC<DashboardBlockchainsProps> = () => {
  const blockchains = useStore(model.$blockchains)

  useGate(model.blockchainsGate)

  return (
    <div>
      {blockchains.map((blockchain) => (
        <Paper key={blockchain.name}>
          <Typography>{blockchain.name}</Typography>
          <Typography>{blockchain.blockchain}</Typography>
          <Typography>{blockchain.network}</Typography>
          {Boolean(blockchain.tokenMetricChart.length) && (
            <>
              <Typography>wallets</Typography>
              {blockchain.tokenMetricChart.map((token, index) => (
                <Typography key={String(index)}>
                  {token.sum}
                  <br />
                  {token.date}
                </Typography>
              ))}
            </>
          )}
        </Paper>
      ))}
    </div>
  )
}
