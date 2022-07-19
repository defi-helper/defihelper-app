import clsx from 'clsx'
import { useState } from 'react'
import { Sticky, StickyContainer } from 'react-sticky'

import { bignumberUtils } from '~/common/bignumber-utils'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { ButtonBase } from '~/common/button-base'
import { cutAccount } from '~/common/cut-account'
import { dateUtils } from '~/common/date-utils'
import { Icon } from '~/common/icon'
import { Input } from '~/common/input'
import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { TradeStatusChart } from '~/trade/common/trade-status-chart'
import * as styles from './trade-orders.css'

export type TradeOrdersProps = {
  className?: string
}

enum Tabs {
  Active = 'active',
  History = 'history',
}

export const TradeOrders: React.VFC<TradeOrdersProps> = (props) => {
  const [currentTab, setCurrentTab] = useState(Tabs.Active)

  const handleChangeTab = (tab: Tabs) => () => {
    setCurrentTab(tab)
  }

  return (
    <StickyContainer>
      <div className={clsx(styles.root, props.className)}>
        <Sticky>
          {({ style }) => (
            <Paper radius={8} className={styles.header} style={style}>
              <Typography variant="h4" className={styles.title}>
                Orders
              </Typography>
              <Paper className={styles.tabs} radius={8}>
                {Object.entries(Tabs).map(([key, value]) => (
                  <ButtonBase
                    key={value}
                    className={clsx(
                      styles.tabsItem,
                      value === currentTab && styles.tabsItemActive
                    )}
                    onClick={handleChangeTab(value)}
                  >
                    {key}
                  </ButtonBase>
                ))}
              </Paper>
              <Input placeholder="Search" className={styles.search} />
              <div className={styles.actions}>
                <ButtonBase>
                  <Icon width={24} height={24} icon="swap" />
                </ButtonBase>
                <ButtonBase>
                  <Icon width={24} height={24} icon="arrowUp" />
                </ButtonBase>
              </div>
            </Paper>
          )}
        </Sticky>
        <div className={styles.body}>
          <div className={styles.bodyInner}>
            <div className={styles.tableHeadings}>
              <Typography
                as={ButtonBase}
                className={styles.tableHeadingsButton}
              >
                Pair
              </Typography>
              <Typography
                as={ButtonBase}
                className={styles.tableHeadingsButton}
              >
                Volume
              </Typography>
              <Typography
                as={ButtonBase}
                className={styles.tableHeadingsButton}
              >
                Created Date
              </Typography>
              <Typography
                as={ButtonBase}
                className={styles.tableHeadingsButton}
              >
                Status
              </Typography>
              <Typography
                as={ButtonBase}
                className={styles.tableHeadingsButton}
              >
                Profit/Loss
              </Typography>
              <Typography as="div" className={styles.tableHeadingsButton}>
                Actions
              </Typography>
            </div>
            <div className={styles.tableRow}>
              <div>
                <Typography
                  variant="body2"
                  as="div"
                  className={styles.contractName}
                >
                  <div className={styles.contractIcons}>
                    <Paper className={styles.contractUnknownTokenIcon}>
                      <Icon icon="unknownNetwork" width="16" height="16" />
                    </Paper>
                    <img src="" className={styles.contractIcon} alt="" />
                  </div>
                  BTC/USDT
                </Typography>
                <Typography className={styles.contractAddress} as="div">
                  <Icon icon="binance" width="22" height="22" />
                  <Link
                    href={buildExplorerUrl({
                      address: '0xD001e8B722ab435277087f68A8cb5f565d9085Af',
                      network: '1',
                    })}
                    target="_blank"
                  >
                    {cutAccount('0xD001e8B722ab435277087f68A8cb5f565d9085Af')}
                  </Link>
                </Typography>
              </div>
              <div>
                <div className={styles.contractBalance}>
                  <Paper className={styles.contractBalanceIcon}>
                    <Icon icon="unknownNetwork" width="16" height="16" />
                  </Paper>
                  <Typography className={styles.fs12} as="div">
                    {bignumberUtils.format('11111')} BTC
                  </Typography>
                </div>
                <div className={styles.contractBalance}>
                  <img src="" className={styles.contractBalanceIcon} alt="" />
                  <Typography className={styles.fs12} as="div">
                    {bignumberUtils.format('11111')} USDT
                  </Typography>
                </div>
              </div>
              <div>
                <div className={styles.contractBalance}>
                  <Typography className={styles.fs12} as="div">
                    {dateUtils.format(new Date(), 'DD/MM/YY  h:mma')}
                  </Typography>
                </div>
                <div className={styles.contractBalance}>
                  <Typography className={styles.fs12} as="div">
                    ID 15940502
                  </Typography>
                </div>
              </div>
              <TradeStatusChart
                stopLoss="100"
                takeProfit="200"
                buy="150"
                className={styles.contractStatus}
              />
              <div>
                <div className={styles.contractBalance}>
                  <img src="" className={styles.contractBalanceIcon} alt="" />
                  <Typography className={styles.fs12} as="div">
                    {bignumberUtils.format('11111')}
                  </Typography>
                </div>
                <div className={styles.contractBalance}>
                  <Typography className={styles.fs12} as="div">
                    {bignumberUtils.format('11111')} /{' '}
                    {bignumberUtils.format('11111')}
                  </Typography>
                </div>
              </div>
              <div className={styles.contractActions}>
                <ButtonBase>
                  <Icon width={16} height={16} icon="swap" />
                </ButtonBase>
                <ButtonBase>
                  <Icon width={16} height={16} icon="arrowUp" />
                </ButtonBase>
                <ButtonBase>
                  <Icon
                    width={16}
                    height={16}
                    icon="dots"
                    className={styles.dots}
                  />
                </ButtonBase>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StickyContainer>
  )
}
