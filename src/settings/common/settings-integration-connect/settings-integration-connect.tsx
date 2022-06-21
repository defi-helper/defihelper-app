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
import { SettingsIntegrationAaxForm } from '~/settings/common/settings-integration-aax-form'
import { SettingsIntegrationBitmartForm } from '~/settings/common/settings-integration-bitmart-form'
import { SettingsIntegrationCoinexForm } from '~/settings/common/settings-integration-coinex-form'
import { SettingsIntegrationPoloniexForm } from '~/settings/common/settings-integration-poloniex-form'
import { SettingsIntegrationFtxForm } from '~/settings/common/settings-integration-ftx-form'
import { WalletExchangeTypeEnum } from '~/api'
import { Select, SelectOption } from '~/common/select'
import * as styles from './settings-integration-connect.css'

export type SettingsIntegrationConnectProps = {
  className?: string
  onConnect: (value: Record<string, string>) => void
  connecting: boolean
  countRender: number
}

const forms: Record<string, { title: string; form: React.ElementType }> = {
  [WalletExchangeTypeEnum.Binance]: {
    title: 'Binance',
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
  [WalletExchangeTypeEnum.Aax]: {
    title: 'AAX',
    form: SettingsIntegrationAaxForm,
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
  [WalletExchangeTypeEnum.Ftx]: {
    title: 'FTX',
    form: SettingsIntegrationFtxForm,
  },
}

export const SettingsIntegrationConnect: React.FC<SettingsIntegrationConnectProps> =
  (props) => {
    const [form, setForm] = useState<string>('')
    const [connect, setConnect] = useState(false)
    const formValuesRef = useRef<Record<string, string>>({})

    const handleConnect = () => {
      setConnect(!connect)
    }

    const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm(event.target.value)
    }

    const handleOnChange = (formValues: Record<string, string>) => {
      formValuesRef.current = formValues
    }

    const handleOnSubmit = (values: Record<string, string>) => {
      if (isEmpty(values)) return

      props.onConnect(values)
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
            Integration with other exchanges allows you to track your balances
            from exchanges.
          </Typography>
        </div>
        <Button
          color="blue"
          size="small"
          onClick={
            connect
              ? () => handleOnSubmit(formValuesRef.current)
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
