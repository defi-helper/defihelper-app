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
import { ReactComponent as SelectArrowIcon } from '~/assets/icons/select-arrow.svg'
import { ReactComponent as HomeIcon } from '~/assets/icons/home.svg'
import { ReactComponent as SettingsIcon } from '~/assets/icons/settings.svg'
import { ReactComponent as SettingsArrowIcon } from '~/assets/icons/settings-arrow.svg'
import { ReactComponent as PlusIcon } from '~/assets/icons/plus.svg'
import { ReactComponent as BackArrowIcon } from '~/assets/icons/back-arrow.svg'
import { ReactComponent as DotsIcon } from '~/assets/icons/dots.svg'
import { ReactComponent as StarIcon } from '~/assets/icons/star.svg'
import { ReactComponent as DoubleArrowLeftIcon } from '~/assets/icons/double-arrow-left.svg'
import { ReactComponent as LogoMiniIcon } from '~/assets/icons/logo-mini.svg'
import { ReactComponent as LogoIcon } from '~/assets/icons/logo.svg'
import { ReactComponent as EnergyIcon } from '~/assets/icons/energy.svg'
import { ReactComponent as CheckIcon } from '~/assets/icons/check.svg'
import { ReactComponent as GridIcon } from '~/assets/icons/grid.svg'
import { ReactComponent as NotificationIcon } from '~/assets/icons/notification.svg'
import { ReactComponent as SunIcon } from '~/assets/icons/sun.svg'
import { ReactComponent as MoonIcon } from '~/assets/icons/moon.svg'
import { ReactComponent as GithubIcon } from '~/assets/icons/socials/github.svg'
import { ReactComponent as DiscordIcon } from '~/assets/icons/socials/discord.svg'
import { ReactComponent as MediumIcon } from '~/assets/icons/socials/medium.svg'
import { ReactComponent as TelegramIcon } from '~/assets/icons/socials/telegram.svg'
import { ReactComponent as TwitterIcon } from '~/assets/icons/socials/twitter.svg'
import { ReactComponent as EthereumIcon } from '~/assets/icons/blockchains/ethereum.svg'
import { ReactComponent as BscIcon } from '~/assets/icons/blockchains/bsc.svg'
import { ReactComponent as WavesIcon } from '~/assets/icons/blockchains/waves.svg'
import { ReactComponent as SolanaIcon } from '~/assets/icons/blockchains/solana.svg'
import { ReactComponent as ArrowTopIcon } from '~/assets/icons/arrow-top.svg'
import { ReactComponent as CheckedIcon } from '~/assets/icons/checked.svg'
import { ReactComponent as ArrowDownIcon } from '~/assets/icons/arrow-down.svg'
import { ReactComponent as EmailIcon } from '~/assets/icons/socials/email.svg'
import { ReactComponent as QuestionIcon } from '~/assets/icons/question.svg'
import { ReactComponent as AttentionIcon } from '~/assets/icons/attention.svg'

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
  selectArrow: SelectArrowIcon,
  home: HomeIcon,
  settings: SettingsIcon,
  settingsArrow: SettingsArrowIcon,
  plus: PlusIcon,
  backArrow: BackArrowIcon,
  dots: DotsIcon,
  star: StarIcon,
  doubleArrowLeft: DoubleArrowLeftIcon,
  logo: LogoIcon,
  logoMini: LogoMiniIcon,
  energy: EnergyIcon,
  check: CheckIcon,
  grid: GridIcon,
  notification: NotificationIcon,
  sun: SunIcon,
  moon: MoonIcon,
  github: GithubIcon,
  discord: DiscordIcon,
  medium: MediumIcon,
  telegram: TelegramIcon,
  twitter: TwitterIcon,
  email: EmailIcon,
  ethereum: EthereumIcon,
  binance: BscIcon,
  waves: WavesIcon,
  solana: SolanaIcon,
  arrowTop: ArrowTopIcon,
  checked: CheckedIcon,
  arrowDown: ArrowDownIcon,
  question: QuestionIcon,
  attention: AttentionIcon,
} as const

export type IconProps = Omit<React.SVGProps<SVGSVGElement>, 'children'> & {
  title?: string | undefined
  icon: keyof typeof ICONS
}

export const Icon: React.VFC<IconProps> = (props) => {
  const { icon, ...restOfProps } = props

  const Component = ICONS[icon]

  return <Component {...restOfProps} />
}
