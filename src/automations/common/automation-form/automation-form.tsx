import clsx from 'clsx'

import * as styles from './automation-form.css'

export type AutomationFormProps = React.ComponentProps<'form'>

export const AutomationForm: React.FC<AutomationFormProps> = (props) => (
  <form
    noValidate
    autoComplete="off"
    {...props}
    className={clsx(styles.root, props.className)}
  />
)
