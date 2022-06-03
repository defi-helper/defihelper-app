import clsx from 'clsx'
import { Link as ReactRouterLink } from 'react-router-dom'

import { Button } from '~/common/button'
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
      <Button color="green" as={ReactRouterLink} to="/" size="medium">
        read article
      </Button>
    ),
  },
  {
    title: 'How to anable auto-staking?',
    text: 'Full tutorial to make auto-staking set-up easy for you',
    link: (
      <Button color="green" as={ReactRouterLink} to="/" size="medium">
        check instruction
      </Button>
    ),
  },
  {
    title: 'Math behind DeFiHelper',
    text: "Learn more about DFH algorithm and it's work",
    link: (
      <Button color="green" as={ReactRouterLink} to="/" size="medium">
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
