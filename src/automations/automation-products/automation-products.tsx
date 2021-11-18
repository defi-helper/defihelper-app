import { useGate, useStore } from 'effector-react'
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

export const AutomationProducts: React.VFC<AutomationProductsProps> = (
  props
) => {
  const products = useStore(model.$products)

  const handleBuyProduct = (product: typeof products[number]) => async () => {
    try {
      await model.buyProductFx({
        account: props.account,
        provider: props.provider,
        chainId: props.chainId,
        product,
      })

      props.onConfirm()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
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
        {products.map((product) => (
          <AutomationSelectListItem
            key={product.id}
            onClick={handleBuyProduct(product)}
            loading={product.buying}
          >
            <Typography as="div">{product.name}</Typography>
            <Typography as="div" variant="body3" className={styles.grey}>
              ${product.priceUSD}
            </Typography>
          </AutomationSelectListItem>
        ))}
      </AutomationSelectList>
      <Typography
        variant="body3"
        as="div"
        transform="uppercase"
        family="mono"
        className={styles.balance}
      >
        balance: {props.balance} notifications
      </Typography>
    </AutomationDialog>
  )
}
