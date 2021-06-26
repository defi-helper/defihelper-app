export const sidUtils = {
  setSid: (sid: string) => {
    localStorage.sid = sid
  },

  getSid: (): string | null => localStorage.sid ?? null
}
