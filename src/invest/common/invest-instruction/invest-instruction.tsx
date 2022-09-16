import clsx from 'clsx'
import { analytics } from '~/analytics'

import { Button } from '~/common/button'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './invest-instruction.css'

export type InvestInstructionProps = {
  className?: string
}

const INSTRUCTION = [
  {
    title: 'Auto-staking, explained',
    text: 'The auto-staking feature helps increase the profitability (APY) of staking contracts across other DeFi protocols',
    link: (
      <Button
        color="green"
        as="a"
        href="https://defihelper.medium.com/auto-staking-explained-da5fbab082e0"
        target="_blank"
        size="medium"
        onClick={() => analytics.log('auto_staking_read_article_click')}
      >
        read article
      </Button>
    ),
  },
  {
    title: 'How to enable auto-staking in DeFiHelper',
    text: 'Read or watch our detailed instructions on how to enable auto-staking in DeFiHelper',
    link: (
      <Button
        color="green"
        as="a"
        href="https://defihelper.medium.com/how-to-enable-auto-staking-in-defihelper-698064069408"
        target="_blank"
        size="medium"
        onClick={() => analytics.log('auto_staking_read_watch_video_click')}
      >
        Watch video
      </Button>
    ),
  },
  {
    title: 'Math behind auto-staking',
    text: 'Learn about the specific formula behind our auto-staking algorithm',
    link: (
      <Button
        color="green"
        as="a"
        href="https://defihelper.io/static/media/Math_Behind_DeFiHelper.pdf"
        target="_blank"
        size="medium"
        onClick={() => analytics.log('auto_staking_read_learn_more')}
      >
        learn more
      </Button>
    ),
  },
]

export const InvestInstruction: React.VFC<InvestInstructionProps> = (props) => {
  return (
    <div className={clsx(styles.instruction, props.className)}>
      {INSTRUCTION.map((instructionItem) => (
        <Paper
          className={styles.instructionCard}
          radius={8}
          key={instructionItem.title}
        >
          <Typography className={styles.instructionCardTitle}>
            {instructionItem.title}
          </Typography>
          <Typography variant="body2" className={styles.instructionCardText}>
            {instructionItem.text}
          </Typography>
          {instructionItem.link}
        </Paper>
      ))}
    </div>
  )
}
