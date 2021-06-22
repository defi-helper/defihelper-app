import { Button, Link, Typography, Paper, makeStyles } from '@material-ui/core'

import { MainLayout } from '~/layouts'

export type StakingDetailProps = unknown

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none'
  },

  info: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 10,
    marginBottom: 20
  },

  title: {
    fontWeight: 'bold',
    opacity: 0.7
  },

  col: {
    padding: 15,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 10
  },

  attention: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
    display: 'flex'
  },

  mr: {
    marginRight: 10
  }
}))

export const StakingDetail: React.VFC<StakingDetailProps> = () => {
  const classes = useStyles()

  return (
    <MainLayout>
      <div>
        <div className={classes.info}>
          <Paper className={classes.col}>
            <div>
              <Typography className={classes.title}>Price</Typography>
              <Typography>$1,994,157.97</Typography>
            </div>
            <div>
              <Typography className={classes.title}>TVL</Typography>
              <Typography>$7,432,458.67</Typography>
            </div>
            <div>
              <Typography className={classes.title}>USDap Price</Typography>
              <Typography>$0.99</Typography>
            </div>
            <div>
              <Typography className={classes.title}>USDC Price</Typography>
              <Typography>$1.00</Typography>
            </div>
          </Paper>
          <Paper className={classes.col}>
            <div>
              <Typography className={classes.title}>Staked</Typography>
              <Typography>3.7269 UNI-V2 ($7,432,004.83)</Typography>
            </div>
            <div>
              <Typography className={classes.title}>BAG Per Week</Typography>
              <Typography>229754.60 ($81,252.95)</Typography>
            </div>
            <div className={classes.attention}>
              <Typography className={`${classes.title} ${classes.mr}`}>
                APR
              </Typography>
              <Typography className={classes.mr}>Day 0.16%</Typography>
              <Typography className={classes.mr}>Week 1.09%</Typography>
              <Typography>Year 56.85%</Typography>
            </div>
            <Typography className={classes.attention}>
              You are staking 0.000000 USDap/USDC Uni LP $0.00 (0.00% of the
              pool).
            </Typography>
          </Paper>
        </div>
        <div>
          <Link
            href="https://etherscan.io/address/0x5b90eB5d9dD24eC45A5160E59a8Ca2847d30ecBC#code"
            target="_blank"
          >
            Etherscan
          </Link>
        </div>
        <div>
          <Typography gutterBottom>USDap/USDC Uni LP: 0.000000</Typography>
          <Button color="primary" variant="contained">
            Stake
          </Button>
        </div>
        <div>
          <Typography gutterBottom>USDap/USDC Uni LP: 0.000000</Typography>
          <Button color="primary" variant="contained">
            Unstake
          </Button>
        </div>
        <div>
          <Typography gutterBottom> 0.000000 BAG ($0.00)</Typography>
          <Button color="primary" variant="contained">
            Claim
          </Button>
        </div>
        <div>
          <Typography gutterBottom>(set approval to 0)</Typography>
          <Button color="primary" variant="contained">
            Revoke
          </Button>
        </div>
        <div>
          <Button color="primary" variant="outlined">
            Exit
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
