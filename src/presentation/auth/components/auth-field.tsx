import type { ReactNode } from 'react'
import { useId } from 'react'

type AuthFieldProps = {
  label: string
  hint?: string
  children: (fieldIds: { inputId: string; hintId?: string }) => ReactNode
}

export default function AuthField({ label, hint, children }: AuthFieldProps) {
  const inputId = useId()
  const hintId = hint ? `${inputId}-hint` : undefined

  return (
    <div className="form-control w-full gap-2">
      <label className="label px-0" htmlFor={inputId}>
        <span className="label-text text-sm font-medium text-[#f8f8f2]">
          {label}
        </span>
      </label>
      {children({ inputId, hintId })}
      {hint ? (
        <p className="text-xs leading-5 text-[#6272a4]" id={hintId}>
          {hint}
        </p>
      ) : null}
    </div>
  )
}
