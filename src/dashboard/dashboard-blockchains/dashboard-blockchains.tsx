import { useGate, useStore } from 'effector-react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'

import { Typography } from '~/common/typography'
import { cutAccount } from '~/common/cut-account'
import * as model from './dashboard-blockchains.model'

export type DashboardBlockchainsProps = unknown

export const DashboardBlockchains: React.FC<DashboardBlockchainsProps> = () => {
  const blockchains = useStore(model.$blockchains)

  useGate(model.blockchainsGate)

  return (
    <Accordion>
      <AccordionSummary id="panel1a-header">
        <Typography>Connected blockchains</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ width: '100%' }}>
        {blockchains.map((blockchain) => (
          <div style={{ width: '100%' }} key={blockchain.name}>
            <Typography>Name: {blockchain.name}</Typography>
            <Typography>Type: {blockchain.blockchain}</Typography>
            <Typography>Network: {blockchain.network}</Typography>
            {Boolean(blockchain.tokenMetricChart.length) && (
              <>
                <Typography>metric</Typography>$
                {blockchain.tokenMetricChart.reduce(
                  (acc, metricItem) => acc + Number(metricItem.sum),
                  0
                )}
              </>
            )}
            {blockchain.wallets.list &&
              Boolean(blockchain.wallets.list.length) && (
                <Accordion style={{ width: '100%' }}>
                  <AccordionSummary id="wallets">
                    <Typography>Wallets</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {blockchain.wallets.list.map((wallet) => (
                      <div key={wallet.id}>
                        {cutAccount(wallet.address)}
                        <div>
                          {Boolean(wallet.tokenMetricChart.length) && (
                            <>
                              <Typography>Metric</Typography>$
                              {wallet.tokenMetricChart.reduce(
                                (acc, metricItem) =>
                                  acc + Number(metricItem.sum),
                                0
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  )
}
