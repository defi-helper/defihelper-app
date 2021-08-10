import React from 'react'

import * as styles from './layout-container.css'

export const LayoutContainer: React.FC = (props) => (
  <main className={styles.root}>
    <div className={styles.content}>{props.children}</div>
  </main>
)
