import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-slate-200 file:text-slate-950 placeholder:text-slate-500 selection:bg-slate-900 selection:text-slate-50 aria-invalid:outline-destructive/60 aria-invalid:ring-red-500/20 dark:aria-invalid:outline-destructive dark:aria-invalid:ring-red-500/50 ring-slate-950/10 dark:ring-slate-950/20 dark:outline-ring/40 outline-ring/50 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500/60 dark:aria-invalid:border-red-500 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-4 focus-visible:outline-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-[3px] aria-invalid:focus-visible:outline-none md:text-sm dark:aria-invalid:focus-visible:ring-4 dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:selection:bg-slate-50 dark:selection:text-slate-900 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/50 dark:ring-slate-300/10 dark:dark:ring-slate-300/20 dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900/60 dark:dark:aria-invalid:border-red-900",
        className
      )}
      {...props}
    />
  )
}

export { Input }
