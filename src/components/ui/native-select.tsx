import * as React from 'react'

import { cn } from '@/lib/utils'
import { CaretDownIcon } from '@phosphor-icons/react'

type NativeSelectProps = Omit<React.ComponentProps<'select'>, 'size'> & {
  size?: 'sm' | 'default'
}

function NativeSelect({
  className,
  size = 'default',
  ...props
}: NativeSelectProps) {
  return (
    <div
      className={cn(
        'group/native-select relative w-fit has-[select:disabled]:opacity-50',
        className,
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className="h-9 w-full min-w-0 appearance-none rounded-4xl border border-oklch(0.92 0.004 286.32) bg-oklch(0.92 0.004 286.32)/30 py-1 pr-8 pl-3 text-sm transition-colors outline-none select-none selection:bg-oklch(0.21 0.006 285.885) selection:text-oklch(0.985 0 0) placeholder:text-oklch(0.552 0.016 285.938) focus-visible:border-oklch(0.705 0.015 286.067) focus-visible:ring-[3px] focus-visible:ring-oklch(0.705 0.015 286.067)/50 disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-oklch(0.577 0.245 27.325) aria-invalid:ring-[3px] aria-invalid:ring-oklch(0.577 0.245 27.325)/20 data-[size=sm]:h-8 dark:bg-oklch(0.92 0.004 286.32)/30 dark:hover:bg-oklch(0.92 0.004 286.32)/50 dark:aria-invalid:border-oklch(0.577 0.245 27.325)/50 dark:aria-invalid:ring-oklch(0.577 0.245 27.325)/40 dark:border-oklch(1 0 0 / 10%) dark:border-oklch(1 0 0 / 15%) dark:bg-oklch(1 0 0 / 15%)/30 dark:selection:bg-oklch(0.92 0.004 286.32) dark:selection:text-oklch(0.21 0.006 285.885) dark:placeholder:text-oklch(0.705 0.015 286.067) dark:focus-visible:border-oklch(0.552 0.016 285.938) dark:focus-visible:ring-oklch(0.552 0.016 285.938)/50 dark:aria-invalid:border-oklch(0.704 0.191 22.216) dark:aria-invalid:ring-oklch(0.704 0.191 22.216)/20 dark:dark:bg-oklch(1 0 0 / 15%)/30 dark:dark:hover:bg-oklch(1 0 0 / 15%)/50 dark:dark:aria-invalid:border-oklch(0.704 0.191 22.216)/50 dark:dark:aria-invalid:ring-oklch(0.704 0.191 22.216)/40"
        {...props}
      />
      <CaretDownIcon
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-oklch(0.552 0.016 285.938) select-none dark:text-oklch(0.705 0.015 286.067)"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  )
}

function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<'option'>) {
  return (
    <option
      data-slot="native-select-option"
      className={cn('bg-[Canvas] text-[CanvasText]', className)}
      {...props}
    />
  )
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<'optgroup'>) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn('bg-[Canvas] text-[CanvasText]', className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
