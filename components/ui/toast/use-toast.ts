'use client';

import * as React from "react"
import type { ToastProps } from "./toast-variants"

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  function toast({ ...props }: ToastProps) {
    setToasts((prevToasts) => [...prevToasts, { ...props }])
  }

  function dismiss(toastId?: string) {
    setToasts((prevToasts) =>
      prevToasts.filter((toast) => toast.id !== toastId)
    )
  }

  return {
    toast,
    dismiss,
    toasts,
  }
}