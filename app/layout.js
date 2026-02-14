import './globals.css'

export const metadata = {
  title: 'Nexus Omni',
  description: 'World\'s Most Powerful AI App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
