import clsx from 'clsx'
import RcSlider from 'rc-slider'
import 'rc-slider/assets/index.css'

import * as styles from './slider.css'

export type SliderProps = React.ComponentProps<typeof RcSlider>

export const Slider = (props: SliderProps) => {
  const { className, ...restProps } = props

  return (
    <RcSlider
      {...restProps}
      className={clsx(
        styles.root,
        restProps.reverse && styles.reverse,
        className
      )}
    />
  )
}
