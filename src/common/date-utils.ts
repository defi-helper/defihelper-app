import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const dateUtils = {
  format: (
    date?: string | number | Date | dayjs.Dayjs,
    format = 'YYYY-MM-DD'
  ) => dayjs(date).format(format),

  fromNow: (date?: string | number | Date | dayjs.Dayjs) =>
    dayjs(date).fromNow(),

  after180Days: () => dayjs().subtract(180, 'days').toISOString(),

  now: () => dayjs().toISOString(),
}
