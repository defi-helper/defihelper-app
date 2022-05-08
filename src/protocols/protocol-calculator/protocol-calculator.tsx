import clsx from 'clsx'
import { useStore } from 'effector-react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useEffect, useMemo, useState } from 'react'
import { useThrottle } from 'react-use'
import { bignumberUtils } from '~/common/bignumber-utils'

import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { WalletConnect } from '~/wallets/wallet-connect'
import * as styles from './protocol-calculator.css'
import * as model from './protocol-calculator.model'

export type ProtocolCalculatorProps = {
  protocolId: string
}

// const [apy, setApy] = useState(100);
// const [throttledSum, throttledApy] = useThrottle(
//   useMemo(() => [sum, apy / 100], [sum, apy]),
//   500
// );
// const [{ data }] = useRestakeStrategyQuery({
//   variables: { balance: throttledSum, apy: throttledApy }
// });

export const ProtocolCalculator: React.VFC<ProtocolCalculatorProps> = (
  props
) => {
  const [value, setValue] = useState(10000)
  const contracts = useStore(model.$contracts)

  const metrics = useStore(model.$metrics)

  const [currentContract, setContract] = useState<
    typeof contracts[number] | null
  >(null)

  const handleChange = (num: number | number[]) => {
    setValue(Array.isArray(num) ? num[0] : num)
  }

  useEffect(() => {
    model.fetchContractsFx(props.protocolId)

    return () => model.reset()
  }, [props.protocolId])

  useEffect(() => {
    if (!contracts[0]) return

    setContract(contracts[0])
  }, [contracts])

  const throttledSum = useThrottle(
    useMemo(() => value, [value]),
    500
  )

  useEffect(() => {
    if (!currentContract) return

    model.fetchEstimateFx({
      balance: throttledSum,
      apy: Number(currentContract.metric.aprYear),
      network: currentContract.network,
      blockchain: currentContract.blockchain,
    })
  }, [currentContract, throttledSum])

  const [lastHoldValue] = metrics?.hold.slice(-1) ?? []
  const [lastRestakeValue] = metrics?.everyDay.slice(-1) ?? []
  const [lastAutostakingValue] = metrics?.optimal.slice(-1) ?? []

  const autostaking = bignumberUtils.format(
    bignumberUtils.mul(
      bignumberUtils.div(
        bignumberUtils.minus(lastAutostakingValue?.v, value),
        value
      ),
      100
    )
  )

  return (
    <Paper radius={8} className={styles.root}>
      <Typography variant="h3" align="center" className={styles.title}>
        Calculate your income
      </Typography>
      <Paper radius={12} className={styles.content}>
        <div className={styles.select}>
          <Dropdown
            control={(open) => (
              <ButtonBase>
                {currentContract?.name ?? 'loading...'}{' '}
                <Icon
                  icon={open ? 'arrowUp' : 'arrowDown'}
                  height="1em"
                  width="1em"
                />
              </ButtonBase>
            )}
            placement="bottom-start"
            offset={[0, 4]}
          >
            {contracts.map((contract) => (
              <ButtonBase
                key={contract.id}
                onClick={() => setContract(contract)}
              >
                {contract.name}
              </ButtonBase>
            ))}
          </Dropdown>
        </div>
        <div className={styles.contentHeader}>
          <div>
            <Typography variant="body2" className={styles.fs14}>
              What is your deposit?
            </Typography>
            <Typography variant="h4" className={styles.value}>
              {bignumberUtils.format(value)} $
            </Typography>
          </div>
          <div>
            <Typography variant="body2" className={styles.fs14}>
              Auto-staking benefit
            </Typography>
            <Typography
              variant="h4"
              className={clsx(styles.value, styles.green)}
            >
              {bignumberUtils.format(autostaking)}%
            </Typography>
          </div>
        </div>
        <Slider
          min={10000}
          value={value}
          max={1000000}
          onChange={handleChange}
          defaultValue={10000}
          className={styles.slider}
        />
        <table className={styles.table}>
          <tbody>
            <tr className={styles.row}>
              <Typography
                as="th"
                variant="body2"
                className={clsx(styles.col, styles.fs14)}
              >
                Just hold
              </Typography>
              <Typography as="th" variant="body1" className={styles.col}>
                ${bignumberUtils.format(lastHoldValue?.v)}
              </Typography>
              <Typography
                as="th"
                variant="body1"
                className={clsx(styles.brown, styles.col)}
              >
                {bignumberUtils.format(currentContract?.metric.aprYear)}% APY
              </Typography>
            </tr>
            <tr className={styles.row}>
              <Typography
                as="th"
                variant="body2"
                className={clsx(styles.col, styles.fs14)}
              >
                Restake manualy
              </Typography>
              <Typography as="th" variant="body1" className={styles.col}>
                ${bignumberUtils.format(value)}
              </Typography>
              <Typography
                as="th"
                variant="body1"
                className={clsx(styles.red, styles.col)}
              >
                {bignumberUtils.format(
                  bignumberUtils.mul(
                    bignumberUtils.div(
                      bignumberUtils.minus(lastRestakeValue?.v, value),
                      value
                    ),
                    100
                  )
                )}
                % APY
              </Typography>
            </tr>
            <tr className={styles.row}>
              <Typography
                as="th"
                variant="body2"
                className={clsx(styles.col, styles.fs14)}
              >
                Use auto-staking
              </Typography>
              <Typography as="th" variant="body1" className={styles.col}>
                ${bignumberUtils.format(lastAutostakingValue?.v)}
              </Typography>
              <Typography
                as="th"
                variant="body1"
                className={clsx(styles.green, styles.col)}
              >
                {bignumberUtils.format(
                  bignumberUtils.mul(
                    bignumberUtils.div(
                      bignumberUtils.minus(lastAutostakingValue?.v, value),
                      value
                    ),
                    100
                  )
                )}
                % APY
              </Typography>
            </tr>
          </tbody>
        </table>
        <WalletConnect
          fallback={
            <Button color="secondary" size="large" className={styles.button}>
              CONNECT WALLET
            </Button>
          }
        />
      </Paper>
    </Paper>
  )
}
