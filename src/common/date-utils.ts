import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

const MOSCOW_TIMEZONE = 'Europe/Moscow'

dayjs.tz.setDefault(MOSCOW_TIMEZONE)

export const dateUtils = {
  format: (
    date?: string | number | Date | dayjs.Dayjs,
    format = 'YYYY-MM-DD'
  ) => dayjs(date).format(format),

  fromNow: (date?: string | number | Date | dayjs.Dayjs) =>
    dayjs(date).fromNow(),

  after180Days: () => dayjs().subtract(180, 'days').toISOString(),

  now: () => dayjs().toISOString(),

  formatUnix: (timestamp: number | string, format = 'hh:mm:ss') => {
    const date = dayjs.unix(Number(timestamp))

    return date.format(format)
  },

  isBeforeNow: (date: number | string) => dayjs(date).isBefore(dayjs()),
  isAfterNow: (date: number | string) => dayjs(date).isAfter(dayjs()),

  addSeconds: (seconds: number) => dayjs().add(seconds, 'second'),

  after: (from: string | number | Date, to: string | number | Date) =>
    dayjs(from).isAfter(to),
}
