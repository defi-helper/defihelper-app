import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import clsx from 'clsx'

import { ReactComponent as Logo } from '~/assets/icons/logo.svg'
import { ReactComponent as LogoMini } from '~/assets/icons/logo-mini.svg'
import { Link } from '~/common/link'
import { paths } from '~/paths'
import { Grid } from '~/common/grid'
import { Button } from '~/common/button'
import * as styles from './layout-header.css'

export type LayoutHeaderProps = unknown

export const LayoutHeader: React.VFC<LayoutHeaderProps> = () => {
  return (
    <header className={styles.root}>
      <Grid.Container>
        <Grid.Row items="center">
          <Link as={ReactRouterLink} to={paths.main} className={styles.padding}>
            <Logo className={styles.logo} />
            <LogoMini className={styles.logoMini} />
          </Link>
          <div className={clsx(styles.padding, styles.actions)}>
            <Button color="pink">Connect Wallet</Button>
          </div>
        </Grid.Row>
      </Grid.Container>
    </header>
  )
}
