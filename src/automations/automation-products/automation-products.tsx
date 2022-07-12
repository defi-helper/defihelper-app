import { useGate, useStore } from 'effector-react'
import { analytics } from '~/analytics'
import { bignumberUtils } from '~/common/bignumber-utils'
import { pluralize } from '~/common/pluralize'
import { Typography } from '~/common/typography'

import { AutomationDialog } from '../common/automation-dialog'
import {
  AutomationSelectList,
  AutomationSelectListItem,
} from '../common/automation-select-list'
import * as styles from './automation-products.css'
import * as model from './automation-products.model'

export type AutomationProductsProps = {
  balance: number
  account: string
  chainId: string
  provider: unknown
  onConfirm: () => void
}

const numFromString = (str: string) => str.match(/(\d+)/)?.[0] ?? ''

export const AutomationProducts: React.VFC<AutomationProductsProps> = (
  props
) => {
  const products = useStore(model.$products)

  const handleBuyProduct = (product: typeof products[number]) => async () => {
    analytics.log(`automations_topup_${product.number}_notifications_click`)
    try {
      await model.buyProductFx({
        account: props.account,
        provider: props.provider,
        chainId: props.chainId,
        product,
      })

      analytics.log(`automations_topup_${product.number}_notifications_success`)
      props.onConfirm()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
        analytics.log(
          `automations_topup_${product.number}_notifications_failure`
        )
      }
    }
  }

  useGate(model.AutomationProductsGate)

  return (
    <AutomationDialog
      title={<span className={styles.title}>Buy Notification</span>}
      className={styles.root}
    >
      <AutomationSelectList className={styles.selectList}>
        {products.map((product) => {
          const num = numFromString(product.name)
          const title = product.name.replace(num, '')

          return (
            <AutomationSelectListItem
              key={product.id}
              onClick={handleBuyProduct(product)}
              loading={product.buying}
            >
              <Typography as="div">
                {bignumberUtils.format(num)}
                {title}
              </Typography>
              <Typography as="div" variant="body3" className={styles.grey}>
                ${bignumberUtils.format(product.priceUSD)}
              </Typography>
            </AutomationSelectListItem>
          )
        })}
      </AutomationSelectList>
      <Typography
        variant="body3"
        as="div"
        transform="uppercase"
        family="mono"
        className={styles.balance}
      >
        balance: {bignumberUtils.format(props.balance)}{' '}
        {pluralize(props.balance, 'notification')}
      </Typography>
    </AutomationDialog>
  )
}
