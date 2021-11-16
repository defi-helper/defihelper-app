import clsx from 'clsx'
import { useDebounce } from 'react-use'

import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import * as styles from './toast-item.css'

export type ToastItemProps = {
  autoHideDuration: number
  onClose: () => void
  variant: 'default' | 'info' | 'success' | 'warning' | 'error'
} & React.ComponentProps<'div'>

export const ToastItem: React.FC<ToastItemProps> = (props) => {
  const { autoHideDuration, onClose, variant, ...restOfProps } = props

  useDebounce(onClose, autoHideDuration)

  return (
    <div
      className={clsx(styles.root, styles.variants[variant])}
      {...restOfProps}
    >
      <Typography variant="body2" as="span" className={styles.text}>
        {props.children}
      </Typography>
      <ButtonBase className={styles.button} onClick={onClose}>
        <Icon icon="close" width="16" height="16" />
      </ButtonBase>
    </div>
  )
}
