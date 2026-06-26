import {
  getHistoryRowStatus,
  type HistoryRow,
} from '@/presentation/dashboard/utils'

export function DashboardStatusBadge({ row }: { row: HistoryRow }) {
  const status = getHistoryRowStatus(row)

  return (
    <span className={`badge border ${status.className}`}>
      {status.label}
    </span>
  )
}