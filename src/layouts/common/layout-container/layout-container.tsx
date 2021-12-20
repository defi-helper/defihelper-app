import clsx from 'clsx'

import * as styles from './layout-container.css'

export type LayoutContainerProps = {
  className?: string
}

export const LayoutContainer: React.FC<LayoutContainerProps> = (props) => (
  <main className={clsx(styles.root, props.className)}>
    <div className={styles.content}>{props.children}</div>
  </main>
)
