import clsx from 'clsx'

import { Button } from '~/common/button'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './lp-tokens-sell-no-found.css'

export type LPTokensSellNoFoundProps = {
  className?: string
  onFind: () => void
}

export const LPTokensSellNoFound: React.VFC<LPTokensSellNoFoundProps> = (
  props
) => {
  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <Typography variant="body2" as="div" className={styles.protocolTitle}>
        Save time and sell LP Tokens in a couple of clicks on DFH. Don&apos;t
        see your token?Add manually
      </Typography>
      <Button
        color="green"
        size="small"
        onClick={props.onFind}
        className={styles.sellButton}
      >
        find lp
      </Button>
    </Paper>
  )
}
