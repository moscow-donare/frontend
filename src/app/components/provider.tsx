"use client"

import type React from "react"

export default function Provider({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

