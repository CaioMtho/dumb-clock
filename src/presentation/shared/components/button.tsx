import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'status'
type ButtonTone = 'success' | 'warning' | 'danger' | 'info'
type ButtonSize = 'sm' | 'md'
type ButtonJustify = 'center' | 'start'
type ButtonRoundness = 'md' | 'lg' | 'xl' | 'full'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  tone?: ButtonTone
  size?: ButtonSize
  justify?: ButtonJustify
  rounded?: ButtonRoundness
  iconOnly?: boolean
  fullWidth?: boolean
}

const variantClassName: Record<ButtonVariant, string> = {
  primary: 'border-0 bg-[#bd93f9] text-[#282a36] hover:bg-[#caa8ff]',
  secondary: 'border border-[#4b4d62] bg-transparent text-[#f8f8f2] hover:border-[#bd93f9] hover:bg-[#bd93f9]/10 hover:text-[#bd93f9]',
  ghost: 'border border-transparent bg-transparent text-[#6272a4] hover:border-[#4b4d62] hover:bg-[#1e1f29] hover:text-[#f8f8f2]',
  status: 'border',
}

const statusToneClassName: Record<NonNullable<ButtonProps['tone']>, string> = {
  success: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200 hover:border-emerald-300/50 hover:bg-emerald-300/15',
  warning: 'border-yellow-300/30 bg-yellow-300/10 text-yellow-200 hover:border-yellow-300/50 hover:bg-yellow-300/15',
  danger: 'border-red-300/30 bg-red-300/10 text-red-200 hover:border-red-300/50 hover:bg-red-300/15',
  info: 'border-cyan-300/30 bg-cyan-300/10 text-cyan-200 hover:border-cyan-300/50 hover:bg-cyan-300/15',
}

const sizeClassName: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
}

const roundnessClassName: Record<ButtonRoundness, string> = {
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
}

export function Button({
  variant = 'secondary',
  tone = 'success',
  size = 'md',
  justify = 'center',
  rounded = 'xl',
  iconOnly = false,
  fullWidth = false,
  className = '',
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  const resolvedVariantClassName = variant === 'status'
    ? `${variantClassName.status} ${statusToneClassName[tone]}`
    : variantClassName[variant]

  const resolvedSizeClassName = iconOnly
    ? 'h-11 w-11 px-0'
    : sizeClassName[size]

  const resolvedJustifyClassName = justify === 'start' ? 'justify-start' : 'justify-center'

  return (
    <button
      className={[
        'btn inline-flex items-center gap-2 border font-medium tracking-[-0.01em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bd93f9]/50 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-60',
        resolvedVariantClassName,
        resolvedSizeClassName,
        resolvedJustifyClassName,
        roundnessClassName[rounded],
        fullWidth ? 'w-full' : '',
        iconOnly ? 'shrink-0' : '',
        className,
      ].filter(Boolean).join(' ')}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button