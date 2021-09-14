import clsx from 'clsx'
import { Typography } from '~/common/typography'

import * as styles from './layout-currency-switcher.css'

export type LayoutCurrencySwitcherProps = {
  className?: string
}

export const LayoutCurrencySwitcher: React.VFC<LayoutCurrencySwitcherProps> = (
  props
) => {
  return (
    <Typography
      className={clsx(styles.root, props.className)}
      as="div"
      variant="body2"
      align="center"
    >
      $USD
    </Typography>
  )
}
