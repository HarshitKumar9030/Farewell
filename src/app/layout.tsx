import "@/app/globals.css"
import { Inter } from "next/font/google"
import { DesktopModePopup } from "@/components/DesktopModePopup"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Farewell Invitations",
  description: "Send personalized farewell invitations to students",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <DesktopModePopup />
      </body>
    </html>
  )
}

