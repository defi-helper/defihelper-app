const KEY = 'sid'

export const sidUtils = {
  set: (sid: string) => {
    localStorage.setItem(KEY, sid)

    window.dispatchEvent(new Event('storage'))
  },

  get: () => localStorage.getItem(KEY),

  remove: () => {
    localStorage.removeItem(KEY)

    window.dispatchEvent(new Event('storage'))
  },

  subscribe: (cb: (key: string | null) => void) => {
    const handler = () => cb(sidUtils.get())

    window.addEventListener('storage', handler)

    return () => {
      window.removeEventListener('storage', handler)
    }
  },
}
