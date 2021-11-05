import clsx from 'clsx'
import { cloneElement, isValidElement } from 'react'

import { ButtonBase, ButtonBaseProps } from '~/common/button-base'
import * as styles from './automation-select-list.css'

export type AutomationSelectListItemProps = Omit<ButtonBaseProps, 'ref'> & {
  icon?: React.ReactNode
}

export const AutomationSelectListItem: React.FC<AutomationSelectListItemProps> =
  (props) => {
    const { className, icon, children, ...restOfProps } = props

    return (
      <li className={clsx(styles.listItem, className)}>
        <ButtonBase className={styles.listItemButton} {...restOfProps}>
          {isValidElement(icon) &&
            cloneElement(icon, { ...icon.props, className: styles.icon })}{' '}
          <span>{children}</span>
        </ButtonBase>
      </li>
    )
  }
