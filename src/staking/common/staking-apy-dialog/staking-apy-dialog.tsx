import clsx from 'clsx'
import { useState } from 'react'

// import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { Checkbox } from '~/common/checkbox'
import { Dialog } from '~/common/dialog'
import { Link } from '~/common/link'
import { NumericalInput } from '~/common/numerical-input'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './staking-apy-dialog.css'

export type StakingApyDialogProps = {
  apr: Record<string, string>
  staked: string
  onCancel: () => void
  onConfirm: () => void
}

// {apr.map((aprItem) => (
//   <div className={styles.row} key={aprItem.title}>
//     <Typography variant="body2">{aprItem.title}</Typography>
//     <Typography variant="body2" family="mono" align="right">
//       {bignumberUtils.formatMax(aprItem.apy, 10000)}%
//     </Typography>
//     <Typography variant="body2" family="mono" align="right">
//       ${bignumberUtils.format(aprItem.perStaked)}
//     </Typography>
//   </div>
// ))}

const StakedFor: Record<string, string> = {
  '1D': '1D',
  '7D': '7D',
  '30D': '30D',
  '1Y': '1Y',
}

const CompoundingEvery: Record<string, string> = {
  AUTO: 'AUTO',
  '1D': '1D',
  '7D': '7D',
  '14D': '14D',
}

const Tabs = (props: {
  children: Record<string, string>
  title: React.ReactNode
  onChange: (value: string) => void
  value: string
  className?: string
}) => {
  return (
    <div className={clsx(styles.tabs, props.className)}>
      <Typography variant="body3" className={styles.tabsTitle}>
        {props.title}
      </Typography>
      <div className={styles.tabsPaper}>
        {Object.values(props.children).map((value) => (
          <ButtonBase
            key={value}
            onClick={() => props.onChange(value)}
            className={clsx(styles.tabsItem, {
              [styles.tabsItemActive]: props.value === value,
            })}
          >
            {value}
          </ButtonBase>
        ))}
      </div>
    </div>
  )
}

export const StakingApyDialog: React.FC<StakingApyDialogProps> = (props) => {
  const [amount, setAmount] = useState('1000')
  const [stakedFor, setStakedFor] = useState(StakedFor['1D'])
  const [compoundingEvery, setCompoundingEvery] = useState(
    CompoundingEvery.AUTO
  )

  // const staked = bignumberUtils.eq(props.staked, 0) ? amount : props.staked

  // const apr = Object.entries(props.apr).map(([title, apy]) => {
  //   const apyMul = bignumberUtils.mul(apy, 100)

  //   return {
  //     title,
  //     apy: apyMul,
  //     perStaked: bignumberUtils.mul(apy, staked),
  //   }
  // })

  const withoutAuto = (
    <>
      <Paper radius={8} className={styles.paper}>
        <div>
          <Typography variant="body3" className={clsx(styles.fs12, styles.mb4)}>
            Yield on the selected staking period
          </Typography>
          <Typography variant="body2" weight="bold">
            199943000000 MOONLIGHT
          </Typography>
        </div>
        <div>
          <Typography variant="body3" className={clsx(styles.fs12, styles.mb4)}>
            Yield in USD*
          </Typography>
          <Typography variant="body2" weight="bold">
            $345,20
          </Typography>
        </div>
      </Paper>
      <Typography variant="body3" className={styles.attention}>
        *the amount of yield is calculated based on the average price of token
        for the last 30 days
      </Typography>
      <Paper radius={8} className={styles.versus}>
        <div>
          <Typography
            className={clsx(styles.fs18, styles.mb8)}
            weight="bold"
            align="center"
          >
            $35,20
          </Typography>
          <Typography className={styles.fs12} weight="bold" align="center">
            Manual restake yield
          </Typography>
        </div>
        <Typography className={styles.fs12} as="span">
          vs
        </Typography>
        <div>
          <Typography
            className={clsx(styles.fs18, styles.mb8)}
            weight="bold"
            align="center"
          >
            $345,20
          </Typography>
          <Typography className={styles.fs12} weight="bold" align="center">
            Auto-staking yield
          </Typography>
        </div>
      </Paper>
      <Typography as="div" align="center" className={styles.howItWorks}>
        <Link
          href="https://defihelper.medium.com/auto-staking-explained-da5fbab082e0"
          target="_blank"
          color="blue"
        >
          How auto-staking works?
        </Link>
      </Typography>
    </>
  )

  const CompundingEveryComponents = {
    [CompoundingEvery.AUTO]: (
      <>
        <Link
          href="https://defihelper.medium.com/auto-staking-explained-da5fbab082e0"
          target="_blank"
          color="blue"
          className={styles.howItWorks}
        >
          How auto-staking works?
        </Link>
        <Paper radius={8} className={styles.paper}>
          <div>
            <Typography variant="body3" className={styles.fs12}>
              Yield on the selected staking period
            </Typography>
            <Typography variant="body2" weight="bold">
              199943000000 MOONLIGHT
            </Typography>
          </div>
          <div>
            <Typography variant="body3" className={styles.fs12}>
              Yield in USD*
            </Typography>
            <Typography variant="body2" weight="bold">
              $345,20
            </Typography>
          </div>
          <div>
            <Typography variant="body3" className={styles.fs12}>
              Next restake at
            </Typography>
            <Typography variant="body2" weight="bold">
              13/08 04:40
            </Typography>
          </div>
        </Paper>
        <Typography variant="body3" className={styles.attention}>
          *the amount of yield is calculated based on the average price of token
          for the last 30 days
        </Typography>
        <Button
          color="green"
          onClick={props.onConfirm}
          className={styles.button}
        >
          Auto-stake
        </Button>
      </>
    ),
    [CompoundingEvery['1D']]: withoutAuto,
    [CompoundingEvery['7D']]: withoutAuto,
    [CompoundingEvery['14D']]: withoutAuto,
  }

  return (
    <Dialog className={styles.root}>
      <Typography
        variant="body3"
        family="mono"
        transform="uppercase"
        className={styles.title}
      >
        Roi calculator
      </Typography>
      <NumericalInput
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        rightSide="$"
        className={styles.mb16}
        label="Amount"
      />
      <Tabs
        title="Staked for"
        onChange={setStakedFor}
        value={stakedFor}
        className={styles.mb16}
      >
        {StakedFor}
      </Tabs>
      <Tabs
        title={
          <>
            Compounding every <Checkbox />
          </>
        }
        onChange={setCompoundingEvery}
        value={compoundingEvery}
        className={styles.mb16}
      >
        {CompoundingEvery}
      </Tabs>
      {CompundingEveryComponents[compoundingEvery]}
    </Dialog>
  )
}
