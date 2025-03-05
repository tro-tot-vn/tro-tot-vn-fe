import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-slate-200 data-[state=checked]:bg-slate-900 data-[state=checked]:text-slate-50 data-[state=checked]:border-slate-900 ring-slate-950/10 dark:ring-slate-950/20 dark:outline-ring/40 outline-ring/50 size-4 shrink-0 rounded-[4px] border shadow-xs transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-0 dark:border-slate-800 dark:data-[state=checked]:bg-slate-50 dark:data-[state=checked]:text-slate-900 dark:data-[state=checked]:border-slate-50 dark:ring-slate-300/10 dark:dark:ring-slate-300/20",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
