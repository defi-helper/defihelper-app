import Slider from 'react-slick'
import clsx from 'clsx'
import { cloneElement } from 'react'

import { Button } from '~/common/button'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { ButtonBase } from '~/common/button-base'
import * as styles from './referral-carousel.css'
import { Paper } from '~/common/paper'

export type ReferralCarouselProps = {
  referralCode?: string
}

// DeFiHelper.io — your one-stop-shop dashboard for all things DeFi
// DeFiHelper.io — compound your gains in DeFi & supercharge your profits
// DeFiHelper.io — automate your DeFi investments & earn more!
export const ReferralCarousel: React.FC<ReferralCarouselProps> = (props) => {
  const link = props.referralCode
    ? `https://defihelper.io/p/${props.referralCode}`
    : ''
  const shareText = `DeFiHelper.io — your one-stop-shop dashboard for all things DeFi. ${link}`

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

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=https://defihelper.io/p/${props.referralCode}&src=sdkpreparse`,
      '_blank',
      'location=yes,height=500,width=500,scrollbars=no,status=no,menubar=no,toolbar=no'
    )
  }

  const handleShareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${shareText}`,
      '_blank',
      'location=yes,height=500,width=500,scrollbars=no,status=no,menubar=no,toolbar=no'
    )
  }

  const handleShareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=https://defihelper.io/p/${props.referralCode}`,
      '_blank',
      'location=yes,height=500,width=500,scrollbars=no,status=no,menubar=no,toolbar=no'
    )
  }

  const handleShareTelegram = () => {
    window.open(
      `https://telegram.me/share/url?url=https://defihelper.io/p/${props.referralCode}&text=${shareText}`
    )
  }

  const slide = (
    <div>
      <Typography className={styles.socialText}>{shareText}</Typography>
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
            <Button
              variant="outlined"
              className={styles.socialButton}
              onClick={() => handleShareFacebook()}
            >
              <Icon width={16} height={16} icon="facebook" />
            </Button>
            <Button
              variant="outlined"
              className={styles.socialButton}
              onClick={() => handleShareTwitter()}
            >
              <Icon width={16} height={16} icon="twitter" />
            </Button>
            <Button
              variant="outlined"
              className={styles.socialButton}
              onClick={() => handleShareTelegram()}
            >
              <Icon width={16} height={16} icon="telegram" />
            </Button>
            <Button
              variant="outlined"
              className={styles.socialButton}
              onClick={() => handleShareLinkedIn()}
            >
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
          Spread the word about DeFiHelper
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
