import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import clsx from 'clsx'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import { ReactComponent as Logo } from '~/assets/icons/logo.svg'
import { ReactComponent as LogoMini } from '~/assets/icons/logo-mini.svg'
import { Link } from '~/common/link'
import { paths } from '~/paths'
import { Grid } from '~/common/grid'
import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { Paper } from '~/common/paper'
import { cutAccount } from '~/common/cut-account'
import { Typography } from '~/common/typography'
import * as styles from './layout-header.css'

export type LayoutHeaderProps = {
  onConnect?: () => void
  account?: string | null
  onChangeWallet?: () => void
}

export const LayoutHeader: React.VFC<LayoutHeaderProps> = (props) => {
  return (
    <header className={styles.root}>
      <Grid.Container>
        <Grid.Row items="center">
          <Link as={ReactRouterLink} to={paths.main} className={styles.padding}>
            <Logo className={styles.logo} />
            <LogoMini className={styles.logoMini} />
          </Link>
          <div className={clsx(styles.padding, styles.actions)}>
            {props.account ? (
              <Paper
                onClick={props.onChangeWallet}
                className={styles.wallet}
                as={ButtonBase}
              >
                <Typography
                  variant="body2"
                  family="mono"
                  transform="uppercase"
                  className={styles.account}
                >
                  {cutAccount(props.account)}
                </Typography>
                <Jazzicon
                  diameter={24}
                  seed={jsNumberForAddress(props.account)}
                />
              </Paper>
            ) : (
              <Button color="pink" onClick={props.onConnect}>
                Connect Wallet
              </Button>
            )}
          </div>
        </Grid.Row>
      </Grid.Container>
    </header>
  )
}
