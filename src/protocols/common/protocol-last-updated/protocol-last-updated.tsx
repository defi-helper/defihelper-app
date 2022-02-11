import { useMedia } from 'react-use'

import { dateUtils } from '~/common/date-utils'
import { Typography } from '~/common/typography'
import * as styles from './protocol-last-updated.css'

export type ProtocolLastUpdatedProps = {
  children: string
}

export const ProtocolLastUpdated = (props: ProtocolLastUpdatedProps) => {
  const isDesktop = useMedia('(min-width: 960px)')

  const format = isDesktop ? 'DD MMMM YYYY HH:mm' : 'DD MMM YY'

  return (
    <Typography className={styles.root} variant="body2">
      Last updated at: {dateUtils.format(props.children, format)}
    </Typography>
  )
}
