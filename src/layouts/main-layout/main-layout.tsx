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
import React, { useMemo, useState } from 'react'

import { paths } from '~/paths'
import { useQueryParams } from '~/common/hooks'
import { useDialog } from '~/common/dialog'
import { WalletList } from '~/wallets/wallet-list'

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
    title: 'Ethereum',
    query: 'eth'
  },
  {
    title: 'Binance Smart Chain',
    query: 'bsc'
  },
  {
    title: 'Waves',
    query: 'waves'
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
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null)

  const history = useHistory()

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChangeNetwork = (search: string) => {
    history.push({
      pathname: paths.protocols.list,
      search: `network=${search}`
    })
  }

  const handleChangeLocation = (path: string) =>
    history.push(path.toLowerCase())

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const queryParams = useQueryParams()

  const currentNetwork = useMemo(
    () =>
      NETWORKS.find(({ query }) => query === queryParams.get('network'))?.title,
    [queryParams]
  )

  const [openWalletList] = useDialog(WalletList)

  const handleOpenWalletList = () => openWalletList().catch(console.warn)

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
            <Button color="inherit" onClick={handleOpenWalletList}>
              Connect wallet
            </Button>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              {currentNetwork ?? 'Current network'}
            </Button>
          </div>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {NETWORKS.map((network) => (
              <MenuItem
                onClick={() => handleChangeNetwork(network.query)}
                key={network.title}
              >
                {network.title}
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
          <List>
            <ListItem
              button
              onClick={() => handleChangeLocation(paths.protocols.list)}
            >
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText primary="All protocols" />
            </ListItem>
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
