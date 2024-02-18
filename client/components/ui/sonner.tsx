"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {

  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-overlay group-[.toaster]:text-surface group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-surface",
          actionButton:
            "group-[.toast]:bg-surface group-[.toast]:text-overlay",
          cancelButton:
            "group-[.toast]:bg-surface group-[.toast]:text-overlay",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
