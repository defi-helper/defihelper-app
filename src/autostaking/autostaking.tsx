import { AppLayout } from '~/layouts'
import { Head } from '~/common/head'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { AutostakingInstruction } from './common/autostaking-instruction'
import { AutostakingTabs } from './common/autostaking-tabs'
import { ButtonBase } from '~/common/button-base'
import { Input } from '~/common/input'
import { AutostakingDeployedContracts } from './autostaking-deployed-contracts'
import { AutostakingMigrateContracts } from './autostaking-migrate-contracts'
import * as styles from './autostaking.css'
import { AutostakingContracts } from './autostaking-contracts'

export type AutostakingProps = unknown

export const Autostaking: React.VFC<AutostakingProps> = () => {
  return (
    <AppLayout title="Boost your APY">
      <Head title="Boost your APY" />
      <div className={styles.header}>
        <Icon icon="settings" className={styles.headerIcon} />
        <Typography variant="h3">Boost your APY</Typography>
      </div>
      <AutostakingInstruction />
      <AutostakingTabs className={styles.tabs}>
        <AutostakingTabs.Header>
          <Typography as={ButtonBase} variant="h3">
            Your deployed contracts
          </Typography>
          <Typography as={ButtonBase} variant="h3">
            Contracts to migrate
          </Typography>
          <AutostakingTabs.HeaderRight>
            <Input placeholder="Search" className={styles.search} />
          </AutostakingTabs.HeaderRight>
        </AutostakingTabs.Header>
        <AutostakingDeployedContracts />
        <AutostakingMigrateContracts />
      </AutostakingTabs>
      <AutostakingContracts />
    </AppLayout>
  )
}
