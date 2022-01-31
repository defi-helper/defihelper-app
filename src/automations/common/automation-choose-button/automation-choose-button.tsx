import clsx from 'clsx'
import { forwardRef } from 'react'

import { ButtonBase, ButtonBaseProps } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import * as styles from './automation-choose-button.css'

export type AutomationChooseButtonProps = {
  label: string
  error?: string
  onDelete?: () => void
} & ButtonBaseProps

export const AutomationChooseButton = forwardRef<
  HTMLButtonElement,
  AutomationChooseButtonProps
>(function AutomationChooseButton(props, ref) {
  const { label, className, children, onDelete, error, ...restOfProps } = props

  return (
    <div className={clsx(styles.root, className)}>
      <Typography
        variant="body3"
        family="mono"
        transform="uppercase"
        className={styles.label}
      >
        {props.label}
        {props.onDelete && (
          <ButtonBase onClick={props.onDelete}>
            <Icon icon="close" width="30" height="30" />
          </ButtonBase>
        )}
      </Typography>
      <ButtonBase
        {...restOfProps}
        ref={ref}
        className={clsx(styles.button, props.error && styles.error)}
      >
        {children}{' '}
        <Icon
          icon="arrowRight"
          width="16"
          height="16"
          className={styles.icon}
        />
      </ButtonBase>
      {error && (
        <Typography as="span" variant="body3">
          {error}
        </Typography>
      )}
    </div>
  )
})
