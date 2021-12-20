import { useMedia } from 'react-use'

import { Carousel } from '~/common/carousel'
import * as styles from './settings-grid.css'

export const SettingsGrid: React.FC = (props) => {
  const isDesktop = useMedia('(min-width: 960px)')

  return isDesktop ? (
    <div className={styles.list}>{props.children}</div>
  ) : (
    <Carousel className={styles.carousel}>{props.children}</Carousel>
  )
}
