import type { ReactNode } from 'react'

import { DepsContext, type DepsContainer } from '@/presentation/deps'

type DepsProviderProps = {
  children: ReactNode
  container: DepsContainer
}

export function DepsProvider({ children, container }: DepsProviderProps) {
  return <DepsContext.Provider value={container}>{children}</DepsContext.Provider>
}
