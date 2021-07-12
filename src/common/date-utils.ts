import dayjs from 'dayjs'

export const dateUtils = {
  format: (
    date?: string | number | Date | dayjs.Dayjs,
    format = 'YYYY-MM-DD'
  ) => dayjs(date).format(format)
}
