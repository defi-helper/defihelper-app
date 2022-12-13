import clsx from 'clsx'
import { Controller, useForm } from 'react-hook-form'

import { NumericalInput } from '~/common/numerical-input'
import { Switch } from '~/common/switch'
import { Typography } from '~/common/typography'
import { TradePercentagePicker } from '~/trade/common/trade-percentage-picker'
import { config } from '~/config'
import { SmartTradeRouter, SmartTradeSwapHandler } from '~/common/load-adapter'
import { Icon } from '~/common/icon'
import { Button } from '~/common/button'
import { Dropdown } from '~/common/dropdown'
import { ButtonBase } from '~/common/button-base'
import { TradePlusMinus } from '~/trade/common/trade-plus-minus'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Exchange, Pair } from '~/trade/common/trade.api'
import * as styles from './trade-trailing-buy.css'

export type TradeTrailingBuyProps = {
  className?: string
  router?: SmartTradeRouter['methods']
  swap?: SmartTradeSwapHandler['methods']
  tokens?: {
    address: string
    name: string
    symbol: string
  }[]
  exchangeAddress?: string
  transactionDeadline: string
  slippage: string
  exchangesMap: Map<string, Exchange>
  currentPair?: Pair
}

type FormValues = {
  amount: string
  price: string
  total: string
  trailingBuy: boolean
  targetPrice: string
  trailingBuyPercent: string
}

export const TradeTrailingBuy: React.VFC<TradeTrailingBuyProps> = (props) => {
  const { handleSubmit, control, watch, setValue, formState } =
    useForm<FormValues>({
      defaultValues: {
        trailingBuy: false,
        trailingBuyPercent: '0',
        total: '0',
      },
    })

  const handleOnSubmit = handleSubmit(() => {})

  const trailingBuy = watch('trailingBuy')
  const trailingBuyPercent = watch('trailingBuyPercent')

  return (
    <form
      className={styles.form}
      onSubmit={handleOnSubmit}
      autoComplete="off"
      noValidate
    >
      <div className={clsx(styles.root, !config.IS_DEV && styles.overflow)}>
        <div className={styles.inputGroup}>
          <Controller
            control={control}
            name="amount"
            render={({ field }) => (
              <NumericalInput
                label="Amount"
                rightSide={props.tokens?.[0]?.symbol}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <NumericalInput
                label="Market price"
                rightSide={props.tokens?.[1]?.symbol}
                disabled
                {...field}
              />
            )}
          />
          <div>
            <div className={styles.trailingBuyTitle}>
              <Typography
                as="div"
                variant="body3"
                className={clsx(styles.takeProfitLabel, styles.greyTitle)}
              >
                Trailing buy
              </Typography>
              <Dropdown
                control={
                  <ButtonBase>
                    <Icon icon="info" width="16" height="16" />
                  </ButtonBase>
                }
                offset={[0, 8]}
                className={styles.dropdown}
                placement="bottom-start"
              >
                <Typography variant="body2">text</Typography>
              </Dropdown>
              <Switch
                size="small"
                onChange={({ target }) =>
                  setValue('trailingBuy', target.checked)
                }
                checked={trailingBuy}
                disabled={formState.isSubmitting}
              />
            </div>
            {trailingBuy && (
              <>
                <div className={styles.trailingBuy}>
                  <Controller
                    control={control}
                    name="trailingBuyPercent"
                    render={({ field }) => (
                      <NumericalInput
                        size="small"
                        rightSide="%"
                        className={styles.trailingBuyInput}
                        {...field}
                      />
                    )}
                  />
                  <TradePlusMinus
                    onPlus={(value) =>
                      setValue('trailingBuyPercent', String(value))
                    }
                    onMinus={(value) =>
                      setValue('trailingBuyPercent', String(value))
                    }
                    min={1}
                    max={100}
                    value={trailingBuyPercent}
                  />
                </div>
                <Typography
                  as="div"
                  variant="body3"
                  className={clsx(styles.takeProfitLabel, styles.greyTitle)}
                >
                  Target price: 50000 {props.tokens?.[1]?.symbol}
                </Typography>
              </>
            )}
          </div>
          <Controller
            control={control}
            name="total"
            render={({ field }) => (
              <NumericalInput
                label={
                  <>
                    Total{' '}
                    <Typography variant="inherit" className={styles.balance}>
                      Available{' '}
                      <ButtonBase
                        className={styles.balanceButton}
                        onClick={() => setValue('total', '0')}
                      >
                        {bignumberUtils.format(0)} {props.tokens?.[1]?.symbol}
                      </ButtonBase>
                    </Typography>
                  </>
                }
                rightSide={props.tokens?.[1]?.symbol}
                {...field}
              />
            )}
          />
          <TradePercentagePicker />
        </div>
      </div>
      <div className={styles.buttons}>
        <Button color="green" className={styles.fullWidth}>
          Approve {props.tokens?.[0]?.symbol}
        </Button>
        <Button color="green" className={styles.fullWidth} type="submit">
          Create Order
        </Button>
      </div>
    </form>
  )
}
