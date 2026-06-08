import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('vi')

export const formatDate = (date: string | Date, format = 'DD/MM/YYYY') => dayjs(date).format(format)

export const formatDateTime = (date: string | Date) => dayjs(date).format('DD/MM/YYYY HH:mm')

export const fromNow = (date: string | Date) => dayjs(date).fromNow()

export const isExpired = (date: string | Date) => dayjs(date).isBefore(dayjs())

export const daysUntil = (date: string | Date) => dayjs(date).diff(dayjs(), 'day')
