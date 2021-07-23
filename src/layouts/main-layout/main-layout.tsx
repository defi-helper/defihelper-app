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
import { Link, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import ContactsIcon from '@material-ui/icons/Contacts'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ListIcon from '@material-ui/icons/List'

import { paths } from '~/paths'
import { Can } from '~/users'
import { useDialog } from '~/common/dialog'
import { WalletList } from '~/wallets/wallet-list'
import { cutAccount } from '~/common/cut-account'
import { WalletDetail } from '~/wallets/wallet-detail'
import { networkModel } from '~/wallets/wallet-networks'
import { ProtocolConnectedList } from '~/protocols/protocol-connected-list'
import { WalletNetworkSwitcher } from '~/wallets/wallet-network-switcher'

export type MainLayoutProps = unknown

const drawerWidth = 340

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    color: 'inherit',
    textDecoration: 'none',
  },
  actions: {
    marginLeft: 'auto',
  },
}))

const MENU = [
  {
    title: 'Protocols',
    path: paths.protocols.list,
    icon: ListIcon,
  },
  {
    title: 'Proposals',
    path: paths.proposals.list,
    icon: ThumbsUpDownIcon,
  },
  {
    title: 'Contacts',
    path: paths.contacts.list,
    icon: ContactsIcon,
  },
  {
    title: 'Event Subscriptions',
    path: paths.userEventSubscriptions.list,
    icon: NotificationsIcon,
  },
]

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const { account } = networkModel.useNetworkProvider()

  const classes = useStyles()

  const history = useHistory()

  const handleChangeLocation = (path: string) => () =>
    history.push(path.toLowerCase())

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
            <WalletNetworkSwitcher />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <ProtocolConnectedList />
          <Can I="read" a="Dashboard">
            <Divider />
            <List>
              <ListItem button onClick={handleChangeLocation(paths.dashboard)}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </List>
          </Can>
          <List>
            {MENU.map((menuItem) => (
              <ListItem
                button
                key={menuItem.title}
                component={Link}
                to={menuItem.path}
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
