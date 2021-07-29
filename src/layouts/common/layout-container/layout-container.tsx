import React from 'react'

import * as styles from './layout-container.css'

export const LayoutContainer: React.FC = (props) => (
  <main className={styles.root}>{props.children}</main>
)
