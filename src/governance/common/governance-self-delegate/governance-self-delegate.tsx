import { useEffect } from 'react'

import { Loader } from '~/common/loader'
import { Typography } from '~/common/typography'
import * as styles from './governance-self-delegate.css'

export type GovernanceSelfDelegateProps = {
  onSubmit: (address: string) => void
  account: string
}

export const GovernanceSelfDelegate: React.VFC<GovernanceSelfDelegateProps> = (
  props
) => {
  useEffect(() => {
    props.onSubmit(props.account)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.account])

  return (
    <div className={styles.root}>
      <Typography className={styles.title}>
        <Loader height="1em" />
      </Typography>
    </div>
  )
}
