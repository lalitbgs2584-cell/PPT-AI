'use client'

import * as React from 'react'
import { Slider as SliderPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        'relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative grow overflow-hidden rounded-4xl bg-oklch(0.967 0.001 286.375) data-horizontal:h-3 data-horizontal:w-full data-vertical:h-full data-vertical:w-3 dark:bg-oklch(0.274 0.006 286.033)"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute bg-oklch(0.21 0.006 285.885) select-none data-horizontal:h-full data-vertical:w-full dark:bg-oklch(0.92 0.004 286.32)"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="block size-4 shrink-0 rounded-4xl border border-oklch(0.92 0.004 286.32) border-oklch(0.21 0.006 285.885) bg-white shadow-sm ring-oklch(0.705 0.015 286.067)/50 transition-colors select-none hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:border-oklch(1 0 0 / 10%) dark:border-oklch(0.92 0.004 286.32) dark:ring-oklch(0.552 0.016 285.938)/50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
