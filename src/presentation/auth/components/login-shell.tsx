import type { ReactNode } from 'react'

type LoginShellProps = {
  children: ReactNode
}

export default function LoginShell({ children }: LoginShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#15131d] px-4 py-6 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-20 top-20 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-280 items-stretch">
        {children}
      </div>
    </main>
  )
}

