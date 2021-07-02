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
import LanguageIcon from '@material-ui/icons/Language'
import PowerIcon from '@material-ui/icons/Power'
import DashboardIcon from '@material-ui/icons/Dashboard'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import SettingsIcon from '@material-ui/icons/Settings'
import { Link, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import React, { useState } from 'react'

import { paths } from '~/paths'
import { useAbility } from '~/users'
import { useDialog } from '~/common/dialog'
import { WalletList } from '~/wallets/wallet-list'
import { cutAccount } from '~/common/cut-account'
import { WalletDetail } from '~/wallets/wallet-detail'
import { networkModel } from '~/wallets/networks'
import { config } from '~/config'

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
  nested: {
    paddingLeft: theme.spacing(4)
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
    type: 'AllNetworks' as const
  },
  {
    title: 'Ethereum',
    chainIds: config.CHAIN_ETHEREUM_IDS,
    type: 'Networks' as const
  },
  {
    title: 'Binance Smart Chain',
    chainIds: config.CHAIN_BINANCE_IDS,
    type: 'Networks' as const
  },
  {
    title: 'Waves',
    chainIds: [config.CHAIN_WAVES_ID],
    type: 'Networks' as const
  }
]

const PROTOCOLS = [
  {
    id: '1',
    title: '1inch'
  },
  {
    id: '2',
    title: 'Aave'
  },
  {
    id: '3',
    title: 'Alchemix'
  }
]

const MENU = [
  {
    title: 'Overview',
    icon: DashboardIcon
  },
  {
    title: 'Favorites',
    icon: BookmarkIcon
  },
  {
    title: 'Settings',
    icon: SettingsIcon
  }
]

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const { account, chainId = 1 } = networkModel.useNetworkProvider()

  const ability = useAbility()

  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null)

  const history = useHistory()

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

  const handleOpenWalletList = () =>
    openWalletList({ onClick: closeWalletList }).catch((error: Error) =>
      console.error(error.message)
    )

  const handleChangeWallet = () =>
    openChangeWallet({ onChange: handleOpenWalletList }).catch((error: Error) =>
      console.error(error.message)
    )

  const currentNetwork = NETWORKS.find(({ chainIds }) =>
    chainIds.includes(chainId)
  )

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
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              {currentNetwork?.title}
            </Button>
          </div>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {NETWORKS.filter((networkItem) =>
              ability.can('read', networkItem.type)
            ).map((networkItem) => (
              <MenuItem key={networkItem.title}>{networkItem.title}</MenuItem>
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
          <List>
            <ListItem>
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText primary="Connected protocols" />
            </ListItem>
            <List>
              {PROTOCOLS.map((network) => (
                <ListItem
                  button
                  key={network.title}
                  className={classes.nested}
                  onClick={() =>
                    handleChangeLocation(paths.protocols.detail(network.id))
                  }
                >
                  <ListItemIcon>
                    <PowerIcon />
                  </ListItemIcon>
                  <ListItemText primary={network.title} />
                </ListItem>
              ))}
            </List>
          </List>
          <Divider />
          <List>
            {MENU.map((menuItem) => (
              <ListItem
                button
                key={menuItem.title}
                onClick={() => handleChangeLocation(menuItem.title)}
              >
                <ListItemIcon>
                  <menuItem.icon />
                </ListItemIcon>
                <ListItemText primary={menuItem.title} />
              </ListItem>
            ))}
          </List>
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
