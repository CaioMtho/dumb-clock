import type { CSSProperties } from 'react'

type IconProps = {
  className?: string
  size?: number | string
  color?: string
  strokeWidth?: number
}

function buildIconStyle(size: IconProps['size'], color: IconProps['color']): CSSProperties {
  const style: CSSProperties = {}

  if (size !== undefined) {
    style.width = typeof size === 'number' ? `${size}px` : size
    style.height = typeof size === 'number' ? `${size}px` : size
  }

  if (color) {
    style.color = color
  }

  return style
}

function getStrokeWidth(strokeWidth: IconProps['strokeWidth']): number {
  return strokeWidth ?? 1.8
}

export function ClockIcon({
  className,
  size = 24,
  color,
  strokeWidth,
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      style={buildIconStyle(size, color)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth={getStrokeWidth(strokeWidth)} />
      <path
        d="M12 8v4l2.5 1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={getStrokeWidth(strokeWidth)}
      />
    </svg>
  )
}

export function UserIcon({
  className,
  size = 24,
  color,
  strokeWidth,
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      style={buildIconStyle(size, color)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 11.2a4.2 4.2 0 1 0-4.2-4.2A4.2 4.2 0 0 0 12 11.2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={getStrokeWidth(strokeWidth)}
      />
      <path
        d="M5 19.5c0-3.4 3.1-6.2 7-6.2s7 2.8 7 6.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={getStrokeWidth(strokeWidth)}
      />
    </svg>
  )
}

export function LockIcon({
  className,
  size = 24,
  color,
  strokeWidth,
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      style={buildIconStyle(size, color)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="10.5"
        width="14"
        height="9"
        rx="2"
        stroke="currentColor"
        strokeWidth={getStrokeWidth(strokeWidth)}
      />
      <path
        d="M8.5 10.5V8.2a3.5 3.5 0 1 1 7 0v2.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={getStrokeWidth(strokeWidth)}
      />
    </svg>
  )
}

export function LoginIcon({
  className,
  size = 24,
  color,
  strokeWidth,
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      style={buildIconStyle(size, color)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 12h9m-3-3 3 3-3 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={getStrokeWidth(strokeWidth)}
      />
      <path
        d="M13 7V5.6A1.6 1.6 0 0 0 11.4 4H6.6A1.6 1.6 0 0 0 5 5.6v12.8A1.6 1.6 0 0 0 6.6 20h4.8A1.6 1.6 0 0 0 13 18.4V17"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={getStrokeWidth(strokeWidth)}
      />
    </svg>
  )
}

export function EyeIcon({
  className,
  size = 24,
  color,
  strokeWidth,
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      style={buildIconStyle(size, color)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={getStrokeWidth(strokeWidth)}
      />
      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth={getStrokeWidth(strokeWidth)} />
    </svg>
  )
}

export function EyeOffIcon({
  className,
  size = 24,
  color,
  strokeWidth,
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      style={buildIconStyle(size, color)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4l16 16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={getStrokeWidth(strokeWidth)}
      />
      <path
        d="M6.3 7.6C3.9 9.6 2.5 12 2.5 12s3.5 6.5 9.5 6.5c1.2 0 2.3-.2 3.3-.6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={getStrokeWidth(strokeWidth)}
      />
      <path
        d="M8.3 5.9A10 10 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a16.3 16.3 0 0 1-2.7 3.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={getStrokeWidth(strokeWidth)}
      />
      <path
        d="M9.4 9.5A3.8 3.8 0 0 0 12 16a3.8 3.8 0 0 0 2.6-1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={getStrokeWidth(strokeWidth)}
      />
    </svg>
  )
}

