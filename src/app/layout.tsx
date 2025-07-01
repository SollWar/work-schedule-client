import './globals.css'
import { ToastProvider } from '../components/Toast/ToastProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <title>Расписание Типманов</title>
        <meta name="description" content="Расписание Типманов" />
      </head>
      <body className="antialiased">
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}
