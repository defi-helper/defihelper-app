import React from 'react'
import { useNProgress } from '@tanem/react-nprogress'
import clsx from 'clsx'

import * as styles from './progress.css'

export type ProgressProps = { loading: boolean }

const LENGTH = 20

export const Progress: React.VFC<ProgressProps> = (props) => {
  const { progress } = useNProgress({
    isAnimating: props.loading,
  })

  if (!props.loading) return <></>

  return (
    <div className={styles.loader}>
      {Array.from({ length: LENGTH }, (_, i) => i).map((index) => (
        <div
          key={index}
          className={clsx(
            styles.loaderItem,
            Math.floor(progress * LENGTH) >= index && styles.loaderItemActive
          )}
        />
      ))}
    </div>
  )
}
