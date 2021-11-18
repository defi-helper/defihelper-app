import { Link as ReactRouterLink, useHistory } from 'react-router-dom'

import { AppLayout } from '~/layouts'
import { Typography } from '~/common/typography'
import { Head } from '~/common/head'
import { Button } from '~/common/button'
import { paths } from '~/paths'
import * as styles from './not-found.css'

export type NotFoundProps = unknown

export const NotFound: React.VFC<NotFoundProps> = () => {
  const history = useHistory()

  return (
    <AppLayout>
      <Head title="404 Not Found" />
      <div className={styles.root}>
        <Typography variant="body2" as="span" className={styles.sup}>
          404 Not Found
        </Typography>
        <Typography variant="h2" transform="uppercase" family="mono">
          We lost this page
        </Typography>
        <Typography className={styles.subtitle}>
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved. Try searching our site
        </Typography>
        <div className={styles.actions}>
          <Button color="blue" as={ReactRouterLink} to={paths.main}>
            Take me home
          </Button>
          <Button color="blue" variant="outlined" onClick={history.goBack}>
            Go back
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}
