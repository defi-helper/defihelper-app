import clsx from 'clsx'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { ButtonBase } from '~/common/button-base'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { cutAccount } from '~/common/cut-account'
import { Button } from '~/common/button'
import { Link } from '~/common/link'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { CircularProgress } from '~/common/circular-progress'
import { bignumberUtils } from '~/common/bignumber-utils'
import { networksConfig } from '~/networks-config'
import * as styles from './settings-wallet-card.css'
import { dateUtils } from '~/common/date-utils'

export type SettingsWalletCardProps = {
  className?: string
  title: string
  address: string
  network: string
  blockchain: string
  automations: string
  worth: string
  onDeposit: () => void
  onRefund: () => void
  onRename: () => void
  onDelete: () => void
  onUpdateStatistics: () => void
  error?: boolean
  feeFunds: number
  locked: number
  statisticsCollectedAt: string
  deleting?: boolean
  editing?: boolean
  depositing?: boolean
  refunding?: boolean
}

export const SettingsWalletCard: React.VFC<SettingsWalletCardProps> = (
  props
) => {
  const pending =
    props.deleting || props.editing || props.depositing || props.refunding

  return (
    <Paper className={clsx(styles.root, props.className)} radius={8}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <div className={styles.icon}>
            <Jazzicon diameter={28} seed={jsNumberForAddress(props.address)} />
          </div>
          <Typography as="span">
            {props.title || cutAccount(props.address)}
          </Typography>
          <Dropdown
            control={(active) => (
              <ButtonBase
                className={clsx(
                  styles.manage,
                  active && styles.manageActive,
                  pending && styles.manageLoading
                )}
              >
                {(props.deleting || props.editing) && (
                  <CircularProgress className={styles.circularProgress} />
                )}
                <Icon
                  icon="dots"
                  className={clsx(
                    styles.manageIcon,
                    (props.deleting || props.editing) &&
                      styles.manageIconloading
                  )}
                />
              </ButtonBase>
            )}
            className={styles.dropdown}
            placement="left-start"
            offset={[0, 4]}
          >
            <ButtonBase
              className={styles.dropdownItem}
              onClick={props.onRename}
            >
              Rename
            </ButtonBase>
            <ButtonBase
              className={styles.dropdownItem}
              onClick={props.onUpdateStatistics}
            >
              Update statistics
            </ButtonBase>
            <ButtonBase
              className={clsx(styles.dropdownItem, styles.deleteButton)}
              onClick={props.onDelete}
            >
              Delete
            </ButtonBase>
          </Dropdown>
        </div>
        <div className={styles.row}>
          <Typography
            variant="body2"
            as="span"
            className={clsx(styles.infoTitle, styles.opacity)}
          >
            Address
          </Typography>
          <Typography
            variant="body2"
            as={Link}
            href={buildExplorerUrl({
              network: props.network,
              address: props.address,
            })}
            target="_blank"
          >
            {cutAccount(props.address)}
          </Typography>
        </div>
        <div className={styles.row}>
          <Typography
            variant="body2"
            as="span"
            className={clsx(styles.infoTitle, styles.opacity)}
          >
            Network
          </Typography>
          <Typography variant="body2" as="span">
            {networksConfig[props.network]?.title}
          </Typography>
        </div>
        <div className={styles.row}>
          <Typography
            variant="body2"
            as="span"
            className={clsx(styles.infoTitle, styles.opacity)}
          >
            Automations
          </Typography>
          <Typography variant="body2" as="span">
            {props.automations}
          </Typography>
        </div>
        <div className={styles.row}>
          <Typography
            variant="body2"
            as="span"
            className={clsx(styles.infoTitle, styles.opacity)}
          >
            Balance
          </Typography>
          <Typography variant="body2" as="span">
            ${bignumberUtils.format(props.worth)}
          </Typography>
        </div>
        <div className={styles.row}>
          <Typography
            variant="body2"
            as="span"
            className={clsx(styles.infoTitle, styles.opacity)}
          >
            Stats. updated
          </Typography>
          <Typography variant="body2" as="span">
            {dateUtils.format(props.statisticsCollectedAt, 'M MMM')} {` at `}
            {dateUtils.format(props.statisticsCollectedAt, 'HH:mm')}
          </Typography>
        </div>
      </div>
      <div className={clsx(styles.footer, props.error && styles.error)}>
        <div className={styles.row}>
          <Typography variant="body2" as="span" className={styles.infoTitle}>
            <Typography variant="inherit" className={styles.opacity}>
              Fee Funds
            </Typography>
            <Dropdown
              control={
                <ButtonBase className={clsx(styles.opacity)}>
                  <Icon className={styles.question} icon="question" />
                </ButtonBase>
              }
              placement="top"
              className={styles.questionDropdown}
              offset={[0, 8]}
            >
              <Typography variant="inherit">
                In order to execute every automated action in the blockchain,
                such as Auto-staking, provide us with your Fee Balance.{' '}
                <Link
                  target="_blank"
                  href="https://defihelper.medium.com/how-does-defihelper-work-a-detailed-explanation-5153dbcea2c7"
                  className={styles.howItWorks}
                >
                  Learn more on How It Works
                </Link>
              </Typography>
            </Dropdown>
          </Typography>
          <Typography variant="body2" as="span">
            {bignumberUtils.format(props.feeFunds)}{' '}
            {networksConfig[props.network]?.coin}
          </Typography>
        </div>
        <div className={styles.row}>
          <Typography variant="body2" as="span" className={styles.infoTitle}>
            <Typography variant="inherit" className={styles.opacity}>
              Locked
            </Typography>
            <Dropdown
              control={
                <ButtonBase className={clsx(styles.opacity)}>
                  <Icon className={styles.question} icon="question" />
                </ButtonBase>
              }
              placement="top"
              className={styles.questionDropdown}
              offset={[0, 8]}
            >
              <Typography variant="inherit">
                We are currently clarifying your balance. You need to wait 3-5
                minutes for balance update{' '}
                <Link
                  target="_blank"
                  href="https://defihelper.medium.com/how-does-defihelper-work-a-detailed-explanation-5153dbcea2c7"
                  className={styles.howItWorks}
                >
                  Learn more on How It Works
                </Link>
              </Typography>
            </Dropdown>
          </Typography>
          <Typography variant="body2" as="span">
            {bignumberUtils.format(props.locked)}{' '}
            {networksConfig[props.network]?.coin}
          </Typography>
        </div>
        <div className={styles.buttons}>
          <Button
            size="small"
            className={styles.deposit}
            onClick={props.onDeposit}
            loading={props.depositing}
            disabled={props.editing || props.deleting || props.refunding}
          >
            Deposit
          </Button>
          <Button
            size="small"
            variant="light"
            className={styles.refund}
            onClick={props.onRefund}
            loading={props.refunding}
            disabled={props.editing || props.deleting || props.depositing}
          >
            Refund
          </Button>
          {props.error && (
            <Dropdown
              control={
                <ButtonBase className={styles.attention}>
                  <Icon icon="attention" />
                </ButtonBase>
              }
              className={styles.attentionDropdown}
              placement="top-end"
              offset={[0, 8]}
            >
              This wallet has active automations which aren&apos;t currently
              functioning due to a low Fee Funds balance. Please deposit funds
              to enable automations.
            </Dropdown>
          )}
        </div>
      </div>
    </Paper>
  )
}
