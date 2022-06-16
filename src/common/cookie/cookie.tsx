import { useLocalStorage } from 'react-use'
import { Portal } from '~/common/portal'
import { Button } from '~/common/button'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './cookie.css'
import { ButtonBase } from '../button-base'
import { Icon } from '../icon'

export const Cookie = () => {
  const [accept, setAccept] = useLocalStorage('cookie', false)

  const handleAccept = () => {
    setAccept(true)
  }

  if (accept) return <></>

  return (
    <Portal>
      <Paper radius={8} className={styles.root}>
        <Typography className={styles.text}>
          We use cookies to provide you with a better browsing experience. By
          continuing to browse, you are agreeing to our Cookie Policy.
        </Typography>
        <Button color="green" onClick={handleAccept} className={styles.button}>
          accept
        </Button>
        <ButtonBase onClick={handleAccept} className={styles.close}>
          <Icon icon="close" width={24} height={24} />
        </ButtonBase>
      </Paper>
    </Portal>
  )
}
