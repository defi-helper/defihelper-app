import { ButtonBase } from '~/common/button-base'
import { Typography } from '~/common/typography'
import * as styles from './governance-actions-select.css'

export type GovernanceActionsSelectProps = {
  className?: string
  options: string[]
  onSubmit: (value: string) => void
}

export const GovernanceActionsSelect: React.FC<GovernanceActionsSelectProps> = (
  props
) => {
  const handleSubmit = (option: string) => () => {
    props.onSubmit(option)
  }

  return (
    <>
      <Typography
        variant="h3"
        family="mono"
        transform="uppercase"
        className={styles.title}
      >
        {props.children}
      </Typography>
      <div className={styles.root}>
        {props.options.map((option) => (
          <Typography
            key={option}
            variant="h5"
            as={ButtonBase}
            className={styles.option}
            onClick={handleSubmit(option)}
          >
            {option}
          </Typography>
        ))}
      </div>
    </>
  )
}
