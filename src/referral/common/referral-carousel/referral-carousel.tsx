import Slider from 'react-slick'
import clsx from 'clsx'
import { cloneElement } from 'react'

import { Button } from '~/common/button'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { ButtonBase } from '~/common/button-base'
import * as styles from './referral-carousel.css'
import { Paper } from '~/common/paper'

export type ReferralCarouselProps = unknown

export const ReferralCarousel: React.FC<ReferralCarouselProps> = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    outerEdgeLimit: true,
    arrows: false,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className={styles.dots}>{dots}</ul>
      </div>
    ),
    customPaging: () => <ButtonBase className={styles.dot} />,
  }

  const slide = (
    <div>
      <Typography className={styles.socialText}>
        With manual restaking, you may lose more than you could have earned due
        to high transaction. defihelper.io/5ecf40b805b5
      </Typography>
      <div className={styles.socialActions}>
        <div className={styles.socailLinksWrap}>
          <Typography
            variant="body2"
            as="span"
            className={clsx(styles.grey, styles.socialLabel)}
          >
            Share
          </Typography>
          <div className={styles.socialLinks}>
            <Button variant="outlined" className={styles.socialButton}>
              <Icon width={16} height={16} icon="facebook" />
            </Button>
            <Button variant="outlined" className={styles.socialButton}>
              <Icon width={16} height={16} icon="twitter" />
            </Button>
            <Button variant="outlined" className={styles.socialButton}>
              <Icon width={16} height={16} icon="telegram" />
            </Button>
            <Button variant="outlined" className={styles.socialButton}>
              <Icon width={16} height={16} icon="linkedin" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Paper radius={8} className={styles.socialMedia}>
      <div className={styles.socialMediaDesktopRow}>
        <Typography variant="body2" className={styles.title}>
          Text for Social Media
        </Typography>
        <Typography variant="body2" as="div">
          <Typography variant="inherit" className={styles.title}>
            Promote
          </Typography>{' '}
          Defihelper
        </Typography>
      </div>
      <div className={styles.socialCarousel}>
        <Slider {...settings}>
          {cloneElement(slide)}
          {cloneElement(slide)}
          {cloneElement(slide)}
        </Slider>
      </div>
    </Paper>
  )
}
