import { useGate, useStore } from 'effector-react'

import { analytics } from '~/analytics'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Dialog } from '~/common/dialog'
import { pluralize } from '~/common/pluralize'
import { Typography } from '~/common/typography'
import { Button } from '~/common/button'
import * as styles from './automation-products.css'
import * as model from './automation-products.model'
import { Paper } from '~/common/paper'

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
    <Dialog className={styles.root}>
      <Typography className={styles.title} transform="uppercase" family="mono">
        Buy Notification
      </Typography>
      <div className={styles.selectList}>
        {products.map((product) => {
          const num = numFromString(product.name)
          const title = product.name.replace(num, '')

          return (
            <Paper
              key={product.id}
              radius={8}
              className={styles.selectListItem}
            >
              <Typography as="div" className={styles.selectListItemTitle}>
                <Typography variant="h3" as="span">
                  {bignumberUtils.format(num)}
                </Typography>
                {title}
              </Typography>
              <div className={styles.actions}>
                <Typography as="div">
                  Price ${bignumberUtils.format(product.priceUSD)}
                </Typography>
                <Button
                  onClick={handleBuyProduct(product)}
                  loading={product.buying}
                  color="green"
                  className={styles.buy}
                >
                  buy
                </Button>
              </div>
            </Paper>
          )
        })}
      </div>
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
    </Dialog>
  )
}
