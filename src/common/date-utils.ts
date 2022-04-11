import dayjs, { OpUnitType } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc)
dayjs.extend(timezone)

const MOSCOW_TIMEZONE = 'Europe/Moscow'

dayjs.tz.setDefault(MOSCOW_TIMEZONE)

export const dateUtils = {
  format: (
    date?: string | number | Date | dayjs.Dayjs,
    format = 'YYYY-MM-DD'
  ) => dayjs(date).format(format),

  toDate: (date?: string | number | Date | dayjs.Dayjs) => dayjs(date).toDate(),

  fromNow: (date?: string | number | Date | dayjs.Dayjs) =>
    dayjs(date).fromNow(),

  fromNowTo: (count: number, unit: dayjs.OpUnitType = 'days') =>
    dayjs().subtract(count, unit).toISOString(),

  now: () => dayjs().toISOString(),

  yesterday: () => dayjs().subtract(1, 'day').toISOString(),

  formatUnix: (timestamp: number | string, format = 'hh:mm:ss') => {
    const date = dayjs.unix(Number(timestamp))

    return date.format(format)
  },

  isBeforeNow: (date: number | string) => dayjs(date).isBefore(dayjs()),
  isAfterNow: (date: number | string) => dayjs(date).isAfter(dayjs()),

  addTimestamp: (value: number, unit?: OpUnitType) =>
    dayjs().add(value, unit).unix(),

  addDate: (value: number, unit?: OpUnitType) =>
    dayjs().add(value, unit).toISOString(),

  after: (from: string | number | Date, to: string | number | Date) =>
    dayjs(from).isAfter(to),
}
