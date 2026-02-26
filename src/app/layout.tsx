import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "sonner"
import { getSettingsAction } from "@/app/admin/settings/actions"
import { getSession } from "@/lib/auth-service"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BidAutoDirect | Premium Auto Auctions & Export",
  description: "Global vehicle auction and export services.",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSettingsAction()
  const user = await getSession()

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-background font-sans antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <Header settings={settings} user={user ? { name: user.name, role: user.role } : null} />
          <main className="flex-1">{children}</main>
          <Footer settings={settings} />
        </div>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
