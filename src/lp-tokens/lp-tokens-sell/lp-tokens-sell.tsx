import clsx from 'clsx'
import isEmpty from 'lodash.isempty'
import { Link as ReactRouterLink } from 'react-router-dom'

import { Link } from '~/common/link'
import { Typography } from '~/common/typography'
import { LPTokensSellCard } from '~/lp-tokens/common/lp-tokens-sell-card'
import { LPTokensSellNoFound } from '../common/lp-tokens-sell-no-found'
import * as styles from './lp-tokens-sell.css'

export type LPTokensSellProps = {
  className?: string
}

export const LPTokensSell: React.VFC<LPTokensSellProps> = (props) => {
  const contracts: unknown[] = [null]
  const loading = false

  return (
    <div className={clsx(styles.root, props.className)}>
      <Typography variant="h4" className={styles.title}>
        Sell your LP tokens just in a few steps
      </Typography>
      {!isEmpty(contracts) && !loading && (
        <Typography variant="h4" className={styles.subtitle}>
          Didn&apos;t see your tokens? You can add them manually.{' '}
          <Link color="blue" as={ReactRouterLink} to="/">
            Add LP
          </Link>
        </Typography>
      )}
      <div className={styles.grid}>
        {isEmpty(contracts) && !loading && (
          <LPTokensSellNoFound onFind={() => {}} />
        )}
        {contracts.map((_, index) => (
          <LPTokensSellCard
            protocolImg=""
            protocolName="ApeSwap"
            pool="BANANA-WBNB"
            tokens={['123', null]}
            cost="100"
            onSell={() => {}}
            key={String(index)}
          />
        ))}
      </div>
    </div>
  )
}
