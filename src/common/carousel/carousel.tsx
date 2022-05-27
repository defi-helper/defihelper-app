import 'slick-carousel/slick/slick.css'
import Slider from 'react-slick'
import { Children, cloneElement, isValidElement } from 'react'
import clsx from 'clsx'

import { ButtonBase } from '~/common/button-base'
import * as styles from './carousel.css'

export type CarouselProps = {
  children: React.ReactNode
  className?: string
}

export const Carousel: React.VFC<CarouselProps> = (props) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    centerPadding: '15px',
    arrows: false,
    centerMode: true,
    outerEdgeLimit: true,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className={styles.dots}>{dots}</ul>
      </div>
    ),
    customPaging: () => <ButtonBase className={styles.dot} />,
  }

  const renderChildren = (child: React.ReactNode) => {
    return isValidElement(child) ? (
      <div className={styles.slide}>
        {cloneElement(child, {
          ...child.props,
          className: clsx(child.props.className),
        })}
      </div>
    ) : null
  }

  return (
    <Slider {...settings} className={clsx(styles.root, props.className)}>
      {Children.map(props.children, renderChildren)}
    </Slider>
  )
}
