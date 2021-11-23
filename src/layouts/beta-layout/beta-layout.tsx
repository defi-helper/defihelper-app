import { Grid } from '~/common/grid'
import { Icon } from '~/common/icon'
import { Link } from '~/common/link'
import { config } from '~/config'
import { paths } from '~/paths'
import * as styles from './beta-layout.css'

export type BetaLayoutProps = unknown

export const BetaLayout: React.FC<BetaLayoutProps> = (props) => {
  return (
    <div className={styles.root}>
      <Grid.Container variant="md">
        <Link href={config.MAIN_URL || paths.main} className={styles.logo}>
          <Icon icon="logo" className={styles.logoIcon} />
        </Link>
      </Grid.Container>
      {props.children}
    </div>
  )
}
