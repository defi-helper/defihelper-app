import clsx from 'clsx'

import React, { ReactElement } from 'react'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { cutAccount } from '~/common/cut-account'
import * as styles from './settings-integration-card.css'
import { Button } from '~/common/button'
import { CanDemo } from '~/auth/can-demo'
import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'

export type SettingsWalletCardProps = {
  className?: string
  icon: ReactElement
  account?: string
  platform: string
  isExpired: boolean
  onDisconnect: () => void
  deleting?: boolean
}

export const SettingsIntegrationCard: React.VFC<SettingsWalletCardProps> = (
  props
) => {
  const { icon, platform, account, isExpired } = props

  return (
    <Paper className={clsx(styles.root, props.className)} radius={8}>
      <div>
        <div className={styles.title}>
          {icon}
          <Typography as="span">{platform}</Typography>
        </div>

        <div className={styles.cardProperties}>
          <div>
            <Typography
              variant="body2"
              as="span"
              className={styles.cardProperty}
            >
              Account
            </Typography>
            <Typography variant="body2">
              {account ? cutAccount(account, 10) : 'none'}
            </Typography>
          </div>

          <div>
            <Typography
              variant="body2"
              as="span"
              className={styles.cardProperty}
            >
              Status
            </Typography>
            <Typography
              variant="body2"
              className={
                isExpired
                  ? styles.accountStatusInactive
                  : styles.accountStatusActive
              }
            >
              {isExpired && (
                <Dropdown
                  control={
                    <ButtonBase className={styles.question}>
                      Expired
                      <Icon
                        icon="question"
                        width="16"
                        height="16"
                        className={styles.questionIcon}
                      />
                    </ButtonBase>
                  }
                  trigger="hover"
                  offset={[0, 8]}
                >
                  <Typography
                    variant="body2"
                    as="span"
                    className={styles.integrationExpiredHintHeadline}
                  >
                    API token expired
                  </Typography>

                  <Typography
                    variant="body2"
                    as="span"
                    className={styles.integrationExpiredHintBody}
                  >
                    Your token has expired, please reconnect it in the{' '}
                    <span
                      className={styles.integrationExpiredHintBodyColorAccent}
                    >
                      exchange settings
                    </span>
                  </Typography>
                </Dropdown>
              )}
              {!isExpired && <>Active</>}
            </Typography>
          </div>
        </div>
      </div>
      <CanDemo>
        <Button
          color={isExpired ? 'red' : 'blue'}
          size="small"
          onClick={props.onDisconnect}
          loading={props.deleting}
          className={styles.button}
        >
          {isExpired ? 'Reconnect' : 'Disconnect'}
        </Button>
      </CanDemo>
    </Paper>
  )
}
