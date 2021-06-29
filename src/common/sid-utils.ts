import { config } from '~/config'

const KEY = 'sid'

type Data = {
  value: string
  expires: number
}

export const sidUtils = {
  set: (sid: string) => {
    const expires = new Date().getTime() + config.SID_LIFE_TIME * 60 * 1000

    const data: Data = { value: sid, expires }

    localStorage.setItem(KEY, JSON.stringify(data))
  },

  get: () => {
    const value = localStorage.getItem(KEY)

    if (!value) return null

    const data: Data = JSON.parse(value)

    const currentTime = new Date().getTime()

    if (data.expires !== null && data.expires > currentTime) {
      sidUtils.set(data.value)

      return data.value
    }

    if (data.expires !== null && data.expires <= currentTime) {
      sidUtils.remove()

      return null
    }

    return data.value
  },

  remove: () => localStorage.removeItem(KEY)
}
