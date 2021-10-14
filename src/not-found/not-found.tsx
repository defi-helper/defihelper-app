import { AppLayout } from '~/layouts'
import { Typography } from '~/common/typography'
import { Head } from '~/common/head'

export type NotFoundProps = unknown

export const NotFound: React.VFC<NotFoundProps> = () => {
  return (
    <AppLayout>
      <Head title="404" />
      <Typography>404</Typography>
    </AppLayout>
  )
}
