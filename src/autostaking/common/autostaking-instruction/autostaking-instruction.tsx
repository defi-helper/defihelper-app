import clsx from 'clsx'

import { Button } from '~/common/button'
import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './autostaking-instruction.css'

export type AutostakingInstructionProps = {
  className?: string
}

const INSTRUCTION = [
  {
    title: 'What is auto-staking?',
    text: 'Read our article and know everything about auto-staking feature',
    link: (
      <Button
        color="green"
        as={Link}
        href="https://defihelper.medium.com/auto-staking-explained-da5fbab082e0"
        target="_blank"
        size="medium"
      >
        read article
      </Button>
    ),
  },
  {
    title: 'How to anable auto-staking?',
    text: 'Full tutorial to make auto-staking set-up easy for you',
    link: (
      <Button
        color="green"
        as={Link}
        href="https://defihelper.medium.com/how-to-enable-auto-staking-in-defihelper-698064069408"
        target="_blank"
        size="medium"
      >
        check instruction
      </Button>
    ),
  },
  {
    title: 'Math behind DeFiHelper',
    text: "Learn more about DFH algorithm and it's work",
    link: (
      <Button
        color="green"
        as={Link}
        href="https://defihelper.io/static/media/Math_Behind_DeFiHelper.pdf"
        target="_blank"
        size="medium"
      >
        learn more
      </Button>
    ),
  },
]

export const AutostakingInstruction: React.VFC<AutostakingInstructionProps> = (
  props
) => {
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
