import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata, Viewport } from "next"
import { cn } from "@/lib/utils"

// Load Inter font - a professional corporate font
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "PlasticInfo",
  description:
    "Comprehensive information about plastic types, formation processes, environmental impacts, and sustainable solutions.",
}

export const viewport: Viewport = {
  themeColor: "#8B0000",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("antialiased", inter.variable)}>
      <body className="min-h-screen bg-background font-sans antialiased">{children}</body>
    </html>
  )
}
