import { PortfolioAssetFragment } from '~/api/_generated-types'
import { Dialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import * as styles from './portfolio-debug-info-dialog.css'

export const PortfolioDebugInfoDialog: React.VFC<{
  assets: PortfolioAssetFragment[]
}> = ({ assets }) => {
  return (
    <Dialog className={styles.root}>
      <Typography variant="h3">Debug info</Typography>
      <ul>
        {assets.map((row) => (
          <li className={styles.listItem}>
            <div>{row.id}</div>
            <div>
              [{row.symbol}] {row.name}
            </div>
            <div>${row.metric?.myUSD}</div>
          </li>
        ))}
      </ul>
    </Dialog>
  )
}
