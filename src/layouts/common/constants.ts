import { IconProps } from '~/common/icon'

export const SOCIAL_LINKS: Array<{
  link: string
  icon: IconProps['icon']
  width?: number
  height?: number
}> = [
  {
    link: 'https://defihelper.medium.com/',
    icon: 'medium',
  },
  {
    link: 'https://github.com/defi-helper',
    icon: 'github',
  },
  {
    link: 'https://twitter.com/defihelper',
    icon: 'twitter',
  },
  {
    link: 'https://t.me/defihelper_chat',
    icon: 'telegram',
  },
  {
    link: 'https://discord.gg/2sT3bmjPhf',
    icon: 'discord',
  },
  {
    link: 'https://www.youtube.com/channel/UCrR-viomtFZndBdcJZFQe9g',
    icon: 'youtube',
    width: 29,
    height: 20,
  },
]
