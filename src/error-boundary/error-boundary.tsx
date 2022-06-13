import { Component, ErrorInfo } from 'react'

import { Button } from '~/common/button'
import { Icon } from '~/common/icon'
import { Typography } from '~/common/typography'
import { Sentry } from './sentry'
import * as styles from './error-boundary.css'

type ErrorBoundaryState = {
  hasError: boolean
  error: Error | null
}

type ErrorBoundaryProps = unknown

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state = {
    hasError: false,
    // eslint-disable-next-line react/no-unused-state
    error: null,
  }

  public static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error({ error, errorInfo })
    Sentry.log(error, errorInfo as unknown as Record<string, unknown>)
  }

  private handleReloadPage = () => {
    window.location.reload()
  }

  public render() {
    const { hasError } = this.state

    if (hasError) {
      return (
        <div className={styles.root}>
          <Icon icon="logo" className={styles.logo} />
          <div className={styles.content}>
            <Typography variant="h3" className={styles.title} weight="bold">
              Oh-oh, something went wrong.
            </Typography>
            <Typography variant="h4" className={styles.subtitle}>
              Please, reload page
            </Typography>
            <Button
              onClick={this.handleReloadPage}
              color="green"
              className={styles.button}
            >
              Reload
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export { ErrorBoundary }
