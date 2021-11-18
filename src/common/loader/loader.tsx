import clsx from 'clsx'
import { ReactComponent as LoaderIcon } from '~/assets/icons/loader.svg'
import * as styles from './loader.css'

export type LoaderProps = React.ComponentProps<typeof LoaderIcon>

export const Loader: React.VFC<LoaderProps> = ({ className, ...props }) => {
  return <LoaderIcon className={clsx(styles.root, className)} {...props} />
}
