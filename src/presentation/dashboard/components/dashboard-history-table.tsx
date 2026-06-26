import { UserIcon } from '@/presentation/icons'
import {
  formatClockTime,
  formatDate,
  type HistoryRow,
} from '@/presentation/dashboard/utils'
import { DashboardStatusBadge } from '@/presentation/dashboard/components/dashboard-status-badge'

export function DashboardHistoryTable({ rows, isLoading }: { rows: HistoryRow[], isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-[#4b4d62] bg-[#1e1f29] p-6 text-sm text-[#6272a4]">
        Carregando histórico...
      </div>
    )
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-[#4b4d62] bg-[#1e1f29] p-6 text-sm text-[#6272a4]">
        Nenhum ponto encontrado para os filtros.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#4b4d62] bg-[#1e1f29]">
      <div className="overflow-x-auto">
        <table className="table">
          <caption className="sr-only">Histórico de pontos filtrado</caption>
          <thead>
            <tr className="border-[#4b4d62] text-xs uppercase tracking-[0.12em] text-[#6272a4]">
              <th scope="col">Funcionário</th>
              <th scope="col">Data</th>
              <th scope="col">Entrada</th>
              <th scope="col">Pausa</th>
              <th scope="col">Retorno</th>
              <th scope="col">Saída</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr className="border-[#4b4d62]/40" key={row.key}>
                <th className="font-medium text-[#f8f8f2]" scope="row">
                  <span className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-[#bd93f9]" />
                    {row.collaboratorName}
                  </span>
                </th>
                <td className="text-[#6272a4]">{formatDate(row.date)}</td>
                <td className="font-mono">{formatClockTime(row.inClock)}</td>
                <td className="font-mono">{formatClockTime(row.lunchClock)}</td>
                <td className="font-mono">{formatClockTime(row.returnClock)}</td>
                <td className="font-mono">{formatClockTime(row.outClock)}</td>
                <td>
                  <DashboardStatusBadge row={row} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
