import clsx from 'clsx'
import { useState } from 'react'
import { ButtonBase } from '~/common/button-base'
import { Dialog } from '~/common/dialog'
import { Link } from '~/common/link'
import { Typography } from '~/common/typography'
import * as styles from './autostaking-tabs-dialog.css'

export type AutostakingTabsDialogProps = unknown

enum Tabs {
  transfer,
  deposit,
}

export const AutostakingTabsDialog: React.VFC<AutostakingTabsDialogProps> =
  () => {
    const [currentTab, setCurrentTab] = useState(Tabs.transfer)

    const handleChangeTab = (tab: Tabs) => () => {
      setCurrentTab(tab)
    }

    return (
      <Dialog className={styles.root}>
        <div className={styles.header}>
          <Typography
            variant="body2"
            transform="uppercase"
            className={clsx(
              styles.tab,
              currentTab === Tabs.transfer && styles.tabActive
            )}
            as={ButtonBase}
            onClick={handleChangeTab(Tabs.transfer)}
          >
            TRANSFER
          </Typography>
          <Typography
            variant="body2"
            transform="uppercase"
            className={clsx(
              styles.tab,
              currentTab === Tabs.deposit && styles.tabActive
            )}
            as={ButtonBase}
            onClick={handleChangeTab(Tabs.deposit)}
          >
            Deposit
          </Typography>
        </div>
        {currentTab === Tabs.transfer && (
          <>
            <Typography variant="body2" className={styles.subtitle}>
              Transfer your{' '}
              <Link color="blue" href="/">
                APE-LP
              </Link>{' '}
              tokens to your personal contract to enable automation.
            </Typography>
            <Typography>
              Don&apos;t have LP tokens? Buy LP tokens (ZAP) from a single token
              in 1 click
            </Typography>
          </>
        )}
        {currentTab === Tabs.deposit && <></>}
      </Dialog>
    )
  }
