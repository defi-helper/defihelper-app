import clsx from 'clsx'

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
import * as styles from './staking-contract-card.css'

export type StakingContractCardProps = {
  className?: string
  title: string
  address: string
  network: string
  blockchain: string
  balance: string
  onDeposit: () => void
  onRefund: () => void
  onMigrate: () => void
  onDelete: () => void
  error?: boolean
  apy?: string
  apyBoost?: string
  deleting?: boolean
  depositing?: boolean
  refunding?: boolean
  migrating?: boolean
}

export const StakingContractCard: React.VFC<StakingContractCardProps> = (
  props
) => {
  const pending =
    props.deleting || props.depositing || props.refunding || props.migrating

  const apyboostDifference = bignumberUtils.minus(props.apyBoost, props.apy)

  const validDiff =
    !bignumberUtils.isNaN(apyboostDifference) &&
    bignumberUtils.gt(apyboostDifference, '0.001')

  return (
    <Paper className={clsx(styles.root, props.className)} radius={8}>
      <div className={styles.header}>
        <div className={styles.heading}>
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
                {props.deleting && (
                  <CircularProgress className={styles.circularProgress} />
                )}
                <Icon
                  icon="dots"
                  className={clsx(
                    styles.manageIcon,
                    props.deleting && styles.manageIconloading
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
              as="a"
              href={buildExplorerUrl({
                network: props.network,
                address: props.address,
              })}
              target="_blank"
            >
              Explorer
            </ButtonBase>
            <ButtonBase
              className={clsx(styles.deleteButton, styles.dropdownItem)}
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
            Balance
          </Typography>
          <Typography variant="body2" as="span">
            ${bignumberUtils.format(props.balance)}
          </Typography>
        </div>
      </div>
      <div className={clsx(styles.footer, props.error && styles.error)}>
        <div className={styles.row}>
          <Typography variant="body2" as="span" className={styles.infoTitle}>
            <Typography variant="inherit" className={styles.opacity}>
              APY
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
                In order to execute every automation action in blockchain, such
                as auto-restaking, provide fee balance we can use.{' '}
                <Link href="/" className={styles.howItWorks}>
                  Learn more on How It Work
                </Link>
              </Typography>
            </Dropdown>
          </Typography>
          <Typography variant="body2" as="span">
            {bignumberUtils.formatMax(
              bignumberUtils.mul(props.apy, 100),
              10000,
              true
            )}
            %
          </Typography>
        </div>
        <div className={styles.row}>
          <Typography variant="body2" as="span" className={styles.infoTitle}>
            <Typography variant="inherit" className={styles.opacity}>
              APY Boost
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
                In order to execute every automation action in blockchain, such
                as auto-restaking, provide fee balance we can use.{' '}
                <Link href="/" className={styles.howItWorks}>
                  Learn more on How It Work
                </Link>
              </Typography>
            </Dropdown>
          </Typography>
          <Typography variant="body2" as="span">
            {validDiff ? (
              <>
                {bignumberUtils.gt(props.apyBoost, '0.001') ? '+ ' : null}
                {bignumberUtils.formatMax(
                  bignumberUtils.mul(props.apyBoost, 100),
                  10000
                )}
              </>
            ) : (
              0
            )}
            %
          </Typography>
        </div>
        <div className={styles.buttons}>
          <Button
            size="small"
            className={styles.deposit}
            onClick={props.onDeposit}
            loading={props.depositing}
            disabled={props.deleting || props.refunding || props.migrating}
          >
            Deposit
          </Button>
          <Button
            size="small"
            variant="light"
            className={styles.refund}
            onClick={props.onMigrate}
            loading={props.migrating}
            disabled={props.deleting || props.depositing || props.refunding}
          >
            Migrate
          </Button>
          <Button
            size="small"
            variant="light"
            className={styles.refund}
            onClick={props.onRefund}
            loading={props.refunding}
            disabled={props.deleting || props.depositing || props.migrating}
          >
            Unstake
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
              This wallet has 3 active automations which doesn&apos;t work now
              due to low Fee Funds balance. Deposit Fee Funds to continue
              automations.
            </Dropdown>
          )}
        </div>
      </div>
    </Paper>
  )
}
