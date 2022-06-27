import clsx from 'clsx'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import * as styles from './trade-slider.css'

export type TradeSliderProps = React.ComponentProps<typeof Slider>

export const TradeSlider: React.VFC<TradeSliderProps> = (props) => {
  const { className, ...restProps } = props

  return (
    <Slider
      {...restProps}
      className={clsx(
        styles.root,
        restProps.reverse && styles.reverse,
        className
      )}
    />
  )
}
