import {
  type CurrentStatus,
} from '@/presentation/dashboard/utils'

export function DashboardStatusCard({ status }: { status: CurrentStatus }) {
  const dotClassName = {
    idle: 'bg-[#6272a4] shadow-[0_0_0_4px_rgba(98,114,164,0.18)]',
    working: 'bg-emerald-300 shadow-[0_0_0_4px_rgba(110,231,183,0.18)]',
    lunch: 'bg-yellow-300 shadow-[0_0_0_4px_rgba(253,224,71,0.18)]',
    done: 'bg-cyan-300 shadow-[0_0_0_4px_rgba(103,232,249,0.18)]',
  }[status.tone]

  const timerClassName = status.tone === 'lunch' ? 'text-yellow-200' : 'text-cyan-200'

  return (
    <div className="card border border-[#4b4d62] bg-[#1e1f29]">
      <div className="card-body gap-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm">
            <span className={`h-2 w-2 rounded-full ${dotClassName}`} />
            {status.label}
          </p>
          <p className={`font-mono text-2xl font-medium tracking-[0.06em] ${timerClassName}`}>
            {status.elapsed}
          </p>
        </div>
        <p className="text-xs text-[#6272a4]">{status.detail}</p>
      </div>
    </div>
  )
}