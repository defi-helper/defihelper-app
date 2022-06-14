import clsx from 'clsx'

import React, { ReactElement } from 'react'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { cutAccount } from '~/common/cut-account'
import * as styles from './settings-integration-card.css'
import { Button } from '~/common/button'
import { CanDemo } from '~/auth/can-demo'

export type SettingsWalletCardProps = {
  className?: string
  icon: ReactElement
  account?: string
  platform: string
  onDisconnect: () => void
  deleting?: boolean
}

export const SettingsIntegrationCard: React.VFC<SettingsWalletCardProps> = (
  props
) => {
  const { icon, platform, account } = props

  return (
    <Paper className={clsx(styles.root, props.className)} radius={8}>
      <div className={styles.title}>
        {icon}
        <Typography as="span">{platform}</Typography>
      </div>
      <div>
        <Typography variant="body2" as="span" className={styles.account}>
          Account
        </Typography>
        <Typography variant="body2">
          {account ? cutAccount(account, 10) : 'none'}
        </Typography>
      </div>
      <CanDemo>
        <Button
          color="blue"
          size="small"
          onClick={props.onDisconnect}
          loading={props.deleting}
          className={styles.button}
        >
          Disconnect
        </Button>
      </CanDemo>
    </Paper>
  )
}
