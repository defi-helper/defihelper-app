import { AutostakingStakingContractsQuery } from '~/api'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import * as styles from './invest-pool-tokens.css'

export type InvestPoolTokensProps = {
  tokens: Exclude<
    AutostakingStakingContractsQuery['contracts']['list'],
    null | undefined
  >[number]['tokens']['reward']
}

export const InvestPoolTokens: React.VFC<InvestPoolTokensProps> = (props) => {
  return (
    <div className={styles.tokenIcons}>
      {props.tokens.map(({ alias, name }) =>
        alias?.logoUrl ? (
          <img
            alt=""
            src={alias.logoUrl}
            key={name}
            className={styles.tokenIcon}
          />
        ) : (
          <Paper className={styles.tokenIcon}>
            <Icon icon="unknownNetwork" width="16" height="16" key={name} />
          </Paper>
        )
      )}
    </div>
  )
}
