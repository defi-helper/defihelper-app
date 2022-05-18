import { AppLayout } from '~/layouts'
import { Typography } from '~/common/typography'
import { Icon } from '~/common/icon'
import * as styles from './buy-liquidity.css'
import { Paper } from '~/common/paper'
import { Head } from '~/common/head'
import { Select, SelectOption } from '~/common/select'
import { Input } from '~/common/input'
import { Button } from '~/common/button'

export type BuyLiquidityProps = unknown

const INSTRUCTION = [
  {
    title: '1. Choose  one of supported protocol ',
    text: 'You can buy LP only with suported protocols. Look up for «Buy LP» button',
  },
  {
    title: '2. Choose contract ',
    text: "Make your choice based on the numbers: we've already calculated TVL and APY for you",
  },
  {
    title: "3. Press «Buy LP» button and you're in!",
    text: 'AS easy as that! Pressing «Buy LP» will start automation wich allows you do it right in DFH!',
  },
]

export const BuyLiquidity: React.VFC<BuyLiquidityProps> = () => {
  const test = (event: any) => {
    console.log(event.target.value)
  }

  return (
    <AppLayout title="Buy LP">
      <Head title="Buy LP" />
      <div className={styles.header}>
        <Icon icon="automation" className={styles.headerIcon} />
        <Typography variant="h3">Buy LP</Typography>
      </div>
      <Typography variant="h4" className={styles.subtitle}>
        Buying liquidity pools in DFH is easy as 1,2,3
      </Typography>
      <div className={styles.instruction}>
        {INSTRUCTION.map((instructionItem) => (
          <Paper
            className={styles.instructionCard}
            radius={8}
            key={instructionItem.title}
          >
            <Typography className={styles.instructionCardTitle}>
              {instructionItem.title}
            </Typography>
            <Typography variant="body2">{instructionItem.text}</Typography>
          </Paper>
        ))}
      </div>
      <div className={styles.selects}>
        <Select placeholder="Choose blockchain" className={styles.select}>
          <SelectOption value="select">select</SelectOption>
        </Select>
        <Select
          placeholder="Choose protocol"
          clearable
          onChange={test}
          multiple
          className={styles.select}
          header={<Input placeholder="Search" />}
          footer={
            <Button color="green" size="medium" className={styles.apply}>
              Apply
            </Button>
          }
        >
          <SelectOption value="select1">select1</SelectOption>
          <SelectOption value="select2">select2</SelectOption>
          <SelectOption value="select3">select3</SelectOption>
          <SelectOption value="select4">select4</SelectOption>
          <SelectOption value="select5">select5</SelectOption>
        </Select>
      </div>
    </AppLayout>
  )
}
