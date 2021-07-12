import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import React, { useEffect, useState } from 'react'

import { paths } from '~/paths'
import { Can, useAbility } from '~/users'
import { useDialog } from '~/common/dialog'
import { WalletList } from '~/wallets/wallet-list'
import { cutAccount } from '~/common/cut-account'
import { WalletDetail } from '~/wallets/wallet-detail'
import { networkModel } from '~/wallets/networks'
import { protocolListModel } from '~/protocols/protocol-list'
import { config } from '~/config'
import { BlockchainEnum } from '~/graphql/_generated-types'
import { ProtocolConnectedList } from '~/protocols/protocol-connected-list'
import { setupBinance } from '~/common/setup-network'
import { ChangeNetworkDialog } from '~/common/change-network-dialog/change-network-dialog'

export type MainLayoutProps = unknown

const drawerWidth = 340

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerContainer: {
    overflow: 'auto'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  logo: {
    color: 'inherit',
    textDecoration: 'none'
  },
  actions: {
    marginLeft: 'auto'
  }
}))

const NETWORKS = [
  {
    title: 'All',
    chainIds: [] as number[],
    onClick: '',
    type: 'AllNetworks' as const
  },
  {
    title: 'Ethereum',
    chainIds: config.CHAIN_ETHEREUM_IDS,
    blockchain: BlockchainEnum.Ethereum,
    network: config.CHAIN_ETHEREUM_IDS[0],
    onClick: 'openChangeNetwork' as const,
    type: 'Networks' as const
  },
  {
    title: 'Binance Smart Chain',
    chainIds: config.CHAIN_BINANCE_IDS,
    blockchain: BlockchainEnum.Ethereum,
    network: config.CHAIN_BINANCE_IDS[0],
    onClick: 'setupBinance' as const,
    type: 'Networks' as const
  },
  {
    title: 'Waves',
    blockchain: BlockchainEnum.Waves,
    onClick: 'loginWaves' as const,
    type: 'Networks' as const
  }
]

const noop = () => {
  return new Promise((r) => r(undefined))
}

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const { account } = networkModel.useNetworkProvider()

  const [currentNetwork, setCurrentNetwork] = useState(NETWORKS[1])

  const ability = useAbility()

  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null)

  const history = useHistory()
  const location = useLocation()

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChangeLocation = (path: string) =>
    history.push(path.toLowerCase())

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const [openWalletList, closeWalletList] = useDialog(WalletList)
  const [openChangeWallet] = useDialog(WalletDetail)

  const [openChangeNetwork] = useDialog(ChangeNetworkDialog)

  const handleOpenWalletList = () =>
    openWalletList({ onClick: closeWalletList }).catch((error: Error) =>
      console.error(error.message)
    )

  const handleChangeWallet = () =>
    openChangeWallet({ onChange: handleOpenWalletList }).catch((error: Error) =>
      console.error(error.message)
    )

  const handlers: Record<string, () => Promise<unknown>> = {
    openChangeNetwork,
    setupBinance,
    loginWaves: noop
  }

  useEffect(() => {
    protocolListModel.fetchProtocolListFx(
      currentNetwork.blockchain
        ? {
            blockchain: currentNetwork.blockchain,
            network: currentNetwork.network
          }
        : undefined
    )
  }, [currentNetwork])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography
            className={classes.logo}
            variant="h6"
            noWrap
            component={Link}
            to={paths.main}
          >
            DefiHelper.io
          </Typography>
          <div className={classes.actions}>
            {account ? (
              <Button color="inherit" onClick={handleChangeWallet}>
                {cutAccount(account)}
              </Button>
            ) : (
              <Button color="inherit" onClick={handleOpenWalletList}>
                Connect wallet
              </Button>
            )}
            {location.pathname === paths.protocols.list && (
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                {currentNetwork.title}
              </Button>
            )}
          </div>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {NETWORKS.filter((networkItem) =>
              ability.can('read', networkItem.type)
            ).map((networkItem) => (
              <MenuItem
                key={networkItem.title}
                button
                onClick={() => {
                  const changeNetwork = handlers[networkItem.onClick]

                  if (changeNetwork) {
                    changeNetwork()
                      .then(() => setCurrentNetwork(networkItem))
                      .catch(console.error)
                  } else {
                    setCurrentNetwork(networkItem)
                  }
                }}
              >
                {networkItem.title}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <ProtocolConnectedList />
          <Can I="read" a="Dashboard">
            <Divider />
            <List>
              <ListItem
                button
                onClick={() => handleChangeLocation(paths.dashboard)}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </List>
          </Can>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Container maxWidth="md">
          <Box my={2}>{props.children}</Box>
        </Container>
      </main>
    </div>
  )
}
