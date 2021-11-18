import clsx from 'clsx'
import { cloneElement, isValidElement } from 'react'

import { ButtonBase, ButtonBaseProps } from '~/common/button-base'
import { CircularProgress } from '~/common/circular-progress'
import * as styles from './automation-select-list.css'

export type AutomationSelectListItemProps = Omit<ButtonBaseProps, 'ref'> & {
  icon?: React.ReactNode
  loading?: boolean
}

export const AutomationSelectListItem: React.FC<AutomationSelectListItemProps> =
  (props) => {
    const { className, icon, children, loading, ...restOfProps } = props

    return (
      <li className={clsx(styles.listItem, className)}>
        <ButtonBase className={styles.listItemButton} {...restOfProps}>
          {loading && (
            <CircularProgress
              className={styles.listItemButtonLoadingProgress}
            />
          )}
          {isValidElement(icon) &&
            cloneElement(icon, {
              ...icon.props,
              className: clsx(icon.props.className, styles.icon, {
                [styles.listItemButtonLoading]: loading,
              }),
            })}{' '}
          <span
            className={clsx({
              [styles.listItemButtonLoading]: loading,
            })}
          >
            {children}
          </span>
        </ButtonBase>
      </li>
    )
  }
