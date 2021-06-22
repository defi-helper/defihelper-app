import { makeStyles, Paper } from '@material-ui/core'
import { Link as ReactRouterLink } from 'react-router-dom'

import { Icon } from '~/common/icon/icon'
import { paths } from '~/paths'
import { getStakingList } from '../common'

export type StakingListProps = {
  protocolId: string
}

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none'
  },

  link: {
    textDecoration: 'none'
  },

  card: {
    padding: '10px 15px',
    marginBottom: 5,
    display: 'flex',
    alignItems: 'center'
  },

  icons: {
    display: 'flex',

    '& > *:first-child': {
      marginRight: -3
    },

    '& > *:last-child': {
      marginLeft: -3
    }
  },

  tvl: {
    marginLeft: 'auto'
  },

  mr: {
    marginRight: 10
  }
}))

export const StakingList: React.VFC<StakingListProps> = (props) => {
  const classes = useStyles()

  const stakingList = getStakingList(props.protocolId)

  return (
    <ul className={classes.root}>
      {stakingList.map((stakingListItem) => (
        <li key={stakingListItem.id}>
          <ReactRouterLink
            to={paths.staking.detail(stakingListItem.id)}
            className={classes.link}
          >
            <Paper className={classes.card}>
              <div className={`${classes.icons} ${classes.mr}`}>
                {stakingListItem.coins.map((coin) => (
                  <Icon key={coin} icon={coin} />
                ))}
              </div>
              <div>
                <div>{stakingListItem.title}</div>
                <div>{stakingListItem.type}</div>
              </div>
              <div className={`${classes.tvl} ${classes.mr}`}>
                {stakingListItem.tvl}
              </div>
              <div className={classes.mr}>{stakingListItem.apy}</div>
              <div className={classes.mr}>{stakingListItem.balance}</div>
            </Paper>
          </ReactRouterLink>
        </li>
      ))}
    </ul>
  )
}
