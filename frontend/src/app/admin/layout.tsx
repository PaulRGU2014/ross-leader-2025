export const metadata = {
  title: 'Ross Leader - Admin',
  description: 'This is the admin interface for Ross Leader.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>{children}</body>
    </html>
  )
}
