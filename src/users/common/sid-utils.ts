const KEY = 'sid'

export const sidUtils = {
  set: (sid: string) => localStorage.setItem(KEY, sid),

  get: () => localStorage.getItem(KEY),

  remove: () => localStorage.removeItem(KEY)
}
