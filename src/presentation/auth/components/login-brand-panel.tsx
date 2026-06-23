import { ClockIcon } from '@/presentation/icons'

export default function LoginBrandPanel() {
  return (
    <aside
      aria-label="Marca do aplicativo"
      className="flex flex-col items-center justify-center gap-3 border-t border-[#4b4d62]/70 bg-[#1e1f29] px-8 py-10 text-center lg:border-l lg:border-t-0 lg:px-10"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-[14px] border border-[#4b4d62]/70 bg-[#15131d] text-[#bd93f9]">
        <ClockIcon className="h-8 w-8" />
      </div>
      <h2 className="text-[22px] font-medium tracking-[-0.02em] text-[#f8f8f2]">
        dumb clock
      </h2>
      <p className="max-w-55 text-sm leading-6 text-[#6272a4]">
        Um sistema de ponto...é isso.
      </p>
    </aside>
  )
}
