import clsx from 'clsx'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './lp-tokens-sell-card.css'

export type LPTokensSellCardProps = {
  className?: string
  protocolImg: string
  protocolName: string
  tokens: (string | null)[]
  pool: string
  cost: string
  onSell: () => void
}

export const LPTokensSellCard: React.VFC<LPTokensSellCardProps> = (props) => {
  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <Typography variant="body2" as="div" className={styles.protocolTitle}>
        <img alt="" src={props.protocolImg} className={styles.protocolImg} />
        <Typography variant="inherit">{props.protocolName}</Typography>
      </Typography>
      <div className={styles.row}>
        <Typography variant="body2" className={styles.grey}>
          Pool
        </Typography>
        <Typography variant="body2" as="div">
          <div className={styles.tokenIcons}>
            {props.tokens.map((token, index) =>
              token ? (
                <img
                  alt=""
                  src={token}
                  key={String(index)}
                  className={styles.tokenIconsItem}
                />
              ) : (
                <Paper key={String(index)} className={styles.tokenIconsItem}>
                  <Icon icon="unknownNetwork" width="16" height="16" />
                </Paper>
              )
            )}
          </div>
          <Typography variant="inherit">{props.pool}</Typography>
        </Typography>
      </div>
      <div className={styles.row}>
        <Typography variant="body2" className={styles.grey}>
          LP cost
        </Typography>
        <Typography variant="body2" as="div">
          ${bignumberUtils.format(props.cost)}
        </Typography>
      </div>
      <Button
        color="green"
        size="small"
        onClick={props.onSell}
        className={styles.sellButton}
      >
        sell lp
      </Button>
    </Paper>
  )
}
