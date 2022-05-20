import { Icon } from '~/common/icon'
import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import bnbBridge from '~/assets/images/bnb-bridge.png'
import polygonBridge from '~/assets/images/polygon-bridge.png'
import optimismBridge from '~/assets/images/optimism-bridge.png'
import arbitrumBridge from '~/assets/images/arbitrum-bridge.png'
import gnosisBridge from '~/assets/images/gnosis-bridge.png'
import avalancheBridge from '~/assets/images/avalanche-bridge.png'
import fantomBridge from '~/assets/images/fantom-bridge.png'
import { Head } from '~/common/head'
import * as styles from './bridges.css'

export type BridgesProps = unknown

const BRIDGES = [
  {
    title: 'BNB Chain bridge',
    link: 'https://www.bnbchain.world/en/bridge',
    icon: bnbBridge,
  },
  {
    title: 'Polygon bridge',
    link: 'https://wallet.polygon.technology/bridge',
    icon: polygonBridge,
  },
  {
    title: 'Optimism bridge',
    link: 'https://app.optimism.io/bridge',
    icon: optimismBridge,
  },
  {
    title: 'Arbitrum bridge',
    link: 'https://bridge.arbitrum.io/',
    icon: arbitrumBridge,
  },
  {
    title: 'Gnosis Chain bridge',
    link: 'https://omni.gnosischain.com/bridge',
    icon: gnosisBridge,
  },
  {
    title: 'Avalanche bridge',
    link: 'https://bridge.avax.network/',
    icon: avalancheBridge,
  },
  {
    title: 'Fantom bridge',
    link: 'https://multichain.org/',
    icon: fantomBridge,
  },
]

export const Bridges: React.VFC<BridgesProps> = () => {
  return (
    <AppLayout title="Bridges">
      <Head title="Bridges" />
      <div className={styles.header}>
        <Typography variant="h3">Bridges</Typography>
      </div>
      <ul className={styles.list}>
        {BRIDGES.map((bridge) => (
          <li key={bridge.title}>
            <Paper
              radius={8}
              as={Link}
              href={bridge.link}
              target="_blank"
              className={styles.card}
            >
              <img src={bridge.icon} alt="" className={styles.cardIcon} />
              <Typography variant="body2">{bridge.title}</Typography>
              <Icon
                icon="linkBridge"
                width="24"
                height="24"
                className={styles.cardLinkIcon}
              />
            </Paper>
          </li>
        ))}
      </ul>
    </AppLayout>
  )
}
