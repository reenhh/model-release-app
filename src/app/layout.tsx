import './globals.css'

export const metadata = {
  title: 'Model Release App',
  description: 'Digitale Model Releases',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  )
}
