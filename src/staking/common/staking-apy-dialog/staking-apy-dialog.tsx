import clsx from 'clsx'
import { useState } from 'react'

// import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { Dialog } from '~/common/dialog'
import { Icon } from '~/common/icon'
import { Link } from '~/common/link'
import { NumericalInput } from '~/common/numerical-input'
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
        <Button color="green" onClick={props.onConfirm}>
          Auto-stake
        </Button>
      </>
    ),
    [CompoundingEvery['1D']]: (
      <>
        <Button color="green" onClick={props.onConfirm}>
          Auto-stake
        </Button>
      </>
    ),
    [CompoundingEvery['7D']]: (
      <>
        <Button color="green" onClick={props.onConfirm}>
          Auto-stake
        </Button>
      </>
    ),
    [CompoundingEvery['14D']]: (
      <>
        <Button color="green" onClick={props.onConfirm}>
          Auto-stake
        </Button>
      </>
    ),
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
            Compounding every{' '}
            <Icon icon="checkboxChecked" width="1em" height="1em" />
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
