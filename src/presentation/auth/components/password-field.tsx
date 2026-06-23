import { useState } from 'react'

import AuthField from '@/presentation/auth/components/auth-field'
import { EyeIcon, EyeOffIcon, LockIcon } from '@/presentation/icons'

type PasswordFieldProps = {
  label: string
  hint?: string
  name?: string
  autoComplete?: 'current-password' | 'new-password'
  placeholder?: string
}

export default function PasswordField({
  label,
  hint,
  name,
  autoComplete,
  placeholder,
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <AuthField label={label} hint={hint}>
      {({ inputId, hintId }) => (
        <div className="flex w-full items-stretch overflow-hidden rounded-lg border border-[#4b4d62] bg-[#1e1f29]">
          <div className="flex items-center border-r border-[#4b4d62] px-3 text-[#6272a4]">
            <LockIcon className="h-5 w-5" />
          </div>
          <input
            aria-describedby={hintId}
            autoComplete={autoComplete}
            className="input h-11 min-w-0 flex-1 border-0 bg-transparent text-[#f8f8f2] placeholder:text-[#6272a4] focus:outline-none"
            id={inputId}
            name={name}
            placeholder={placeholder}
            type={isVisible ? 'text' : 'password'}
          />
          <button
            aria-label={isVisible ? 'Ocultar senha' : 'Mostrar senha'}
            className="flex h-11 w-11 shrink-0 items-center justify-center border-0 border-l border-[#4b4d62] bg-transparent text-[#bd93f9] transition-colors hover:bg-[#282a36] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bd93f9]/50"
            onClick={() => setIsVisible((currentValue) => !currentValue)}
            type="button"
          >
            {isVisible ? (
              <EyeOffIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      )}
    </AuthField>
  )
}
