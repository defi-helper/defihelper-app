import 'slick-carousel/slick/slick.css'
import Slider from 'react-slick'
import { Children, cloneElement, isValidElement, useState } from 'react'
import clsx from 'clsx'

import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import * as styles from './invest-carousel.css'

export type InvestCarouselProps = {
  className?: string
  slidesToShow: number
  count: number
}

export const InvestCarousel: React.FC<InvestCarouselProps> = (props) => {
  const [slider, setSlider] = useState<Slider | null>(null)

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: props.slidesToShow,
    slidesToScroll: props.slidesToShow,
    centerPadding: '15px',
    arrows: false,
    outerEdgeLimit: true,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ButtonBase onClick={slider?.slickPrev}>
          <Icon icon="arrowLongLeft" height="16" width="27" />
        </ButtonBase>
        <ul className={styles.dots}>{dots}</ul>
        <ButtonBase onClick={slider?.slickNext}>
          <Icon icon="arrowLongRight" height="16" width="27" />
        </ButtonBase>
      </div>
    ),
    customPaging: () => <ButtonBase className={styles.dot} />,
  }

  if (props.count <= props.slidesToShow) {
    return (
      <div
        className={clsx(props.className)}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr '.repeat(props.slidesToShow),
          gridGap: 24,
        }}
      >
        {props.children}
      </div>
    )
  }

  const renderChildren = (child: React.ReactNode, index: number) => {
    return isValidElement(child) ? (
      <div className={styles.slide} key={String(index)}>
        {cloneElement(child, {
          ...child.props,
          className: clsx(child.props.className),
        })}
      </div>
    ) : null
  }

  return (
    <Slider
      {...settings}
      className={clsx(styles.root, props.className)}
      ref={setSlider}
    >
      {Children.map(props.children, renderChildren)}
    </Slider>
  )
}
