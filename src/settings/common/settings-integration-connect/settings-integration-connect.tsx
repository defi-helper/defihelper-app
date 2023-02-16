import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import isEmpty from 'lodash.isempty'

import { Button } from '~/common/button'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { SettingsIntegrationBinanceForm } from '~/settings/common/settings-integration-binance-form'
import { SettingsIntegrationHuobiForm } from '~/settings/common/settings-integration-huobi-form'
import { SettingsIntegrationOkexForm } from '~/settings/common/settings-integration-okex-form'
import { SettingsIntegrationAscendexForm } from '~/settings/common/settings-integration-ascendex-form'
import { SettingsIntegrationMexcForm } from '~/settings/common/settings-integration-mexc-form'
import { SettingsIntegrationBitmartForm } from '~/settings/common/settings-integration-bitmart-form'
import { SettingsIntegrationCoinexForm } from '~/settings/common/settings-integration-coinex-form'
import { SettingsIntegrationPoloniexForm } from '~/settings/common/settings-integration-poloniex-form'
import { SettingsIntegrationBybitForm } from '~/settings/common/settings-integration-bybit-form'
import { SettingsIntegrationGateioForm } from '../settings-integration-gateio-form'
import { SettingsIntegrationLbankForm } from '../settings-integration-lbank-form'
import { WalletExchangeTypeEnum } from '~/api'
import { Select, SelectOption } from '~/common/select'
import * as styles from './settings-integration-connect.css'
import { analytics } from '~/analytics'

export type SettingsIntegrationConnectProps = {
  className?: string
  onConnect: (
    exchange: WalletExchangeTypeEnum,
    value: Record<string, string>
  ) => void
  connecting: boolean
  countRender: number
}

const forms: Record<string, { title: string; form: React.ElementType }> = {
  [WalletExchangeTypeEnum.Binance]: {
    title: 'Binance',
    form: SettingsIntegrationBinanceForm,
  },
  [WalletExchangeTypeEnum.Binanceus]: {
    title: 'Binance US',
    form: SettingsIntegrationBinanceForm,
  },
  [WalletExchangeTypeEnum.Huobi]: {
    title: 'Huobi',
    form: SettingsIntegrationHuobiForm,
  },
  [WalletExchangeTypeEnum.Okex]: {
    title: 'OKEx',
    form: SettingsIntegrationOkexForm,
  },
  [WalletExchangeTypeEnum.Ascendex]: {
    title: 'AscendEX',
    form: SettingsIntegrationAscendexForm,
  },
  [WalletExchangeTypeEnum.Mexc]: {
    title: 'MEXC',
    form: SettingsIntegrationMexcForm,
  },
  [WalletExchangeTypeEnum.Bitmart]: {
    title: 'Bitmart',
    form: SettingsIntegrationBitmartForm,
  },
  [WalletExchangeTypeEnum.Coinex]: {
    title: 'Coinex',
    form: SettingsIntegrationCoinexForm,
  },
  [WalletExchangeTypeEnum.Poloniex]: {
    title: 'Poloniex',
    form: SettingsIntegrationPoloniexForm,
  },
  [WalletExchangeTypeEnum.Bybit]: {
    title: 'Bybit',
    form: SettingsIntegrationBybitForm,
  },
  [WalletExchangeTypeEnum.Lbank]: {
    title: 'Lbank',
    form: SettingsIntegrationLbankForm,
  },
  [WalletExchangeTypeEnum.Gateio]: {
    title: 'Gate.io',
    form: SettingsIntegrationGateioForm,
  },
}

export const SettingsIntegrationConnect: React.FC<SettingsIntegrationConnectProps> =
  (props) => {
    const [form, setForm] = useState<string>('')
    const [connect, setConnect] = useState(false)
    const formValuesRef = useRef<Record<string, string>>({})

    const handleConnect = () => {
      setConnect(!connect)
      analytics.log('settings_cex_connect')
    }

    const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm(event.target.value)
    }

    const handleOnChange = (formValues: Record<string, string>) => {
      formValuesRef.current = formValues
    }

    const handleOnSubmit = (
      exchange: string,
      values: Record<string, string>
    ) => {
      if (isEmpty(values)) return

      props.onConnect(exchange as WalletExchangeTypeEnum, values)
    }

    useEffect(() => {
      setForm('')
      setConnect(false)
    }, [props.countRender])

    const CurrentForm = forms[form]?.form

    return (
      <Paper radius={8} className={clsx(styles.root, props.className)}>
        <div className={styles.text}>
          <Typography className={styles.title}>Add new integration</Typography>
          <Typography variant="body2">
            Connect your CEX exchange account to track all your balances in one
            place
          </Typography>
        </div>
        <Button
          color="blue"
          size="small"
          onClick={
            connect
              ? () => handleOnSubmit(form, formValuesRef.current)
              : handleConnect
          }
          loading={props.connecting}
          className={styles.button}
        >
          Connect
        </Button>
        {connect && (
          <div className={styles.form}>
            <Select
              onChange={handleChangeForm}
              value={form}
              placeholder="Exchange"
              className={styles.select}
            >
              {Object.entries(forms).map(([value, { title }]) => (
                <SelectOption value={value} key={title}>
                  {title}
                </SelectOption>
              ))}
            </Select>
            {CurrentForm && (
              <CurrentForm
                onChange={handleOnChange}
                onSubmit={handleOnSubmit}
              />
            )}
          </div>
        )}
      </Paper>
    )
  }
