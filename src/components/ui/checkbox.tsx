import * as React from 'react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'
import { CheckIcon } from '@phosphor-icons/react'

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer relative flex size-4 shrink-0 items-center justify-center rounded-[6px] border border-oklch(0.92 0.004 286.32) transition-shadow outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-oklch(0.705 0.015 286.067) focus-visible:ring-[3px] focus-visible:ring-oklch(0.705 0.015 286.067)/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-oklch(0.577 0.245 27.325) aria-invalid:ring-[3px] aria-invalid:ring-oklch(0.577 0.245 27.325)/20 aria-invalid:aria-checked:border-oklch(0.21 0.006 285.885) dark:bg-oklch(0.92 0.004 286.32)/30 dark:aria-invalid:border-oklch(0.577 0.245 27.325)/50 dark:aria-invalid:ring-oklch(0.577 0.245 27.325)/40 data-checked:border-oklch(0.21 0.006 285.885) data-checked:bg-oklch(0.21 0.006 285.885) data-checked:text-oklch(0.985 0 0) dark:data-checked:bg-oklch(0.21 0.006 285.885) dark:border-oklch(1 0 0 / 10%) dark:border-oklch(1 0 0 / 15%) dark:focus-visible:border-oklch(0.552 0.016 285.938) dark:focus-visible:ring-oklch(0.552 0.016 285.938)/50 dark:aria-invalid:border-oklch(0.704 0.191 22.216) dark:aria-invalid:ring-oklch(0.704 0.191 22.216)/20 dark:aria-invalid:aria-checked:border-oklch(0.92 0.004 286.32) dark:dark:bg-oklch(1 0 0 / 15%)/30 dark:dark:aria-invalid:border-oklch(0.704 0.191 22.216)/50 dark:dark:aria-invalid:ring-oklch(0.704 0.191 22.216)/40 dark:data-checked:border-oklch(0.92 0.004 286.32) dark:data-checked:bg-oklch(0.92 0.004 286.32) dark:data-checked:text-oklch(0.21 0.006 285.885) dark:dark:data-checked:bg-oklch(0.92 0.004 286.32)',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
