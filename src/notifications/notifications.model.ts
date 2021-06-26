import { createStore, createApi, createEvent } from 'effector-logger'
import { nanoid } from 'nanoid'

type Variants = 'default' | 'success' | 'info' | 'warning' | 'error'

type Options = {
  persist?: boolean
  onClose?: () => void
  message: string
}

type Notification = {
  variant: Variants
  key: string
} & Options

export const $notifications = createStore<Notification[]>([], {
  name: 'notifications'
})

const getNotification =
  (variant: Variants) =>
  (state: Notification[], notification: string | Options) => {
    const defaultOptions = (message: string) => ({
      message,
      variant,
      key: nanoid()
    })

    return [
      ...state,
      typeof notification === 'string'
        ? defaultOptions(notification)
        : { ...notification, ...defaultOptions(notification.message) }
    ]
  }

export const notificationsApi = createApi($notifications, {
  default: getNotification('default'),
  info: getNotification('info'),
  success: getNotification('success'),
  warning: getNotification('warning'),
  error: getNotification('error')
})

export const removeNotification = createEvent<string>('remove')

$notifications.on(removeNotification, (state, key: string) =>
  state.filter((notification) => notification.key !== key)
)
