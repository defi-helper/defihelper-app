import { useStore, useStoreMap } from 'effector-react'
import { NavLink as ReactRouterLink, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { AppLayout } from '~/layouts'
import * as model from './settings-confirm-email.model'
import * as styles from './settings-confirm-email.css'
import { Typography } from '~/common/typography'
import { Link } from '~/common/link'

export type SettingsConfirmEmailProps = unknown

export const SettingsConfirmEmail: React.VFC<SettingsConfirmEmailProps> =
  () => {
    const params = useParams<{ confirmationCode: string }>()

    const confirmEmail = useStoreMap({
      store: model.$confirmEmail,
      keys: [params.confirmationCode],
      fn: (emails, [confirmationCode]) =>
        emails.find(({ code }) => code === confirmationCode) ?? null,
    })

    const loading = useStore(model.confirmEmailFx.pending)

    useEffect(() => {
      if (!confirmEmail) {
        model.confirmEmailFx({
          confirmationCode: params.confirmationCode,
        })
      }
    }, [confirmEmail, params])

    return (
      <AppLayout>
        <Typography variant="body2" as="div" className={styles.textBoxWrapper}>
          {loading && <p>Confirming email...</p>}
          {!loading && confirmEmail && confirmEmail.status === true && (
            <>
              <p>Thank you for verifying your E-Mail address.</p>
              <p>
                Now you can turn the notifications on in the{' '}
                <Link
                  as={ReactRouterLink}
                  to="/settings"
                  className={styles.link}
                >
                  Settings
                </Link>
                .
              </p>
            </>
          )}
          {!loading && confirmEmail && !confirmEmail.status && (
            <>
              <p>
                Your E-Mail is already verified or your confirmation link is
                corrupted.
              </p>
              <p>
                <Link
                  as={ReactRouterLink}
                  to="/portfolio"
                  className={styles.link}
                >
                  Continue using Application
                </Link>
              </p>
            </>
          )}
        </Typography>
      </AppLayout>
    )
  }
