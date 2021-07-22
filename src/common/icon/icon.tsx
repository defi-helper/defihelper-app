import { ReactComponent as BAGicon } from '~/assets/icons/coins/bag.svg'
import { ReactComponent as USDCicon } from '~/assets/icons/coins/usdc.svg'
import { ReactComponent as USDapicon } from '~/assets/icons/coins/usdap.svg'
import { ReactComponent as DaiIcon } from '~/assets/icons/coins/dai.svg'
import { ReactComponent as UsdtIcon } from '~/assets/icons/coins/usdt.svg'
import { ReactComponent as BtcIcon } from '~/assets/icons/coins/btc.svg'
import { ReactComponent as EthIcon } from '~/assets/icons/coins/eth.svg'
import { ReactComponent as USDNIcon } from '~/assets/icons/coins/usdn.svg'
import { ReactComponent as BNBIcon } from '~/assets/icons/coins/bnb.svg'
import { ReactComponent as PAXIcon } from '~/assets/icons/coins/pax.svg'

const ICONS = {
  BAG: BAGicon,
  bBAG: BAGicon,
  BNB: BNBIcon,
  BUSD: BNBIcon,
  USDap: USDapicon,
  DAI: DaiIcon,
  WBTC: BtcIcon,
  ETH: EthIcon,
  USDT: UsdtIcon,
  USDC: USDCicon,
  USDN: USDNIcon,
  PAX: PAXIcon,
} as const

export type IconProps = React.SVGProps<SVGSVGElement> & {
  title?: string | undefined
  icon: keyof typeof ICONS
}

export const Icon: React.FunctionComponent<IconProps> = (props) => {
  const { icon, ...restOfProps } = props

  const Component = ICONS[icon]

  return <Component {...restOfProps} />
}
