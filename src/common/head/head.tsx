import { Helmet } from 'react-helmet-async'

import OpenGraph from 'src/assets/images/opengraph.jpg'

export type HeadProps = {
  title?: string
  description?: string
  ogImageUrl?: string
  ogUrl?: string
}

const SITE_URL = 'https://app.defihelper.io'

const SITE_DESCRIPTION =
  'Automate your DeFi strategies across chains, earn more with auto-staking feature'

export const Head: React.VFC<HeadProps> = (props) => {
  const siteTitle = ['DeFiHelper', props.title].filter(Boolean).join(' - ')

  const {
    ogImageUrl = SITE_URL + OpenGraph,
    ogUrl = SITE_URL,
    description = SITE_DESCRIPTION,
  } = props

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta property="description" content={description} />
      <meta property="og:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={ogUrl} />
      <meta name="twitter:url" content={ogUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta property="og:site_name" content={siteTitle} />
      <meta name="twitter:title" content={siteTitle} />
    </Helmet>
  )
}
