import {
  createStore,
  createApi,
  createEvent,
  forward,
  Event,
} from 'effector-logger/macro'
import { nanoid } from 'nanoid'

type Variants = 'default' | 'success' | 'info' | 'warning' | 'error'

type Options = {
  persist?: boolean
  onClose?: () => void
  message: string
}

type Toast = {
  variant: Variants
  key: string
} & Options

export const $toasts = createStore<Toast[]>([], {
  name: '$toasts',
})

const createToast =
  (variant: Variants) => (state: Toast[], notification: string | Options) => {
    const defaultOptions = (message: string) => ({
      message,
      variant,
      key: nanoid(),
    })

    return [
      ...state,
      typeof notification === 'string'
        ? defaultOptions(notification)
        : { ...notification, ...defaultOptions(notification.message) },
    ]
  }

const toastsApi = createApi($toasts, {
  default: createToast('default'),
  info: createToast('info'),
  success: createToast('success'),
  warning: createToast('warning'),
  error: createToast('error'),
})

export const removeToast = createEvent<string>('remove')

$toasts.on(removeToast, (state, key: string) =>
  state.filter((notification) => notification.key !== key)
)

const forwardErrors = (...events: Event<Error>[]) => {
  forward({
    from: events.map((effect) => effect.map((error) => error.message)),
    to: toastsApi.error,
  })
}

export const toastsService = {
  ...toastsApi,
  forwardErrors,
}
