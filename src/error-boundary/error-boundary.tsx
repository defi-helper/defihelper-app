import { Component, ErrorInfo } from 'react'
import { Button } from '~/common/button'

import { Sentry } from './sentry'

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
        <>
          Oh-oh, something went wrong.
          <br />
          Please reload page
          <Button onClick={this.handleReloadPage}>Reload</Button>
        </>
      )
    }

    return this.props.children
  }
}

export { ErrorBoundary }
