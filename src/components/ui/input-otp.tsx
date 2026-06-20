'use client'

import * as React from 'react'
import { OTPInput, OTPInputContext } from 'input-otp'

import { cn } from '@/lib/utils'
import { MinusIcon } from '@phosphor-icons/react'

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        'cn-input-otp flex items-center has-disabled:opacity-50',
        containerClassName,
      )}
      spellCheck={false}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        'flex items-center rounded-4xl has-aria-invalid:border-oklch(0.577 0.245 27.325) has-aria-invalid:ring-[3px] has-aria-invalid:ring-oklch(0.577 0.245 27.325)/20 dark:has-aria-invalid:ring-oklch(0.577 0.245 27.325)/40 dark:has-aria-invalid:border-oklch(0.704 0.191 22.216) dark:has-aria-invalid:ring-oklch(0.704 0.191 22.216)/20 dark:dark:has-aria-invalid:ring-oklch(0.704 0.191 22.216)/40',
        className,
      )}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        'relative flex size-9 items-center justify-center border-y border-r border-oklch(0.92 0.004 286.32) bg-oklch(0.92 0.004 286.32)/30 text-sm transition-all outline-none first:rounded-l-4xl first:border-l last:rounded-r-4xl aria-invalid:border-oklch(0.577 0.245 27.325) data-[active=true]:z-10 data-[active=true]:border-oklch(0.705 0.015 286.067) data-[active=true]:ring-[3px] data-[active=true]:ring-oklch(0.705 0.015 286.067)/50 data-[active=true]:aria-invalid:border-oklch(0.577 0.245 27.325) data-[active=true]:aria-invalid:ring-oklch(0.577 0.245 27.325)/20 dark:data-[active=true]:aria-invalid:ring-oklch(0.577 0.245 27.325)/40 dark:border-oklch(1 0 0 / 15%) dark:bg-oklch(1 0 0 / 15%)/30 dark:aria-invalid:border-oklch(0.704 0.191 22.216) dark:data-[active=true]:border-oklch(0.552 0.016 285.938) dark:data-[active=true]:ring-oklch(0.552 0.016 285.938)/50 dark:data-[active=true]:aria-invalid:border-oklch(0.704 0.191 22.216) dark:data-[active=true]:aria-invalid:ring-oklch(0.704 0.191 22.216)/20 dark:dark:data-[active=true]:aria-invalid:ring-oklch(0.704 0.191 22.216)/40',
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-oklch(0.141 0.005 285.823) duration-1000 dark:bg-oklch(0.985 0 0)" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-otp-separator"
      className="flex items-center [&_svg:not([class*='size-'])]:size-4"
      role="separator"
      {...props}
    >
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
