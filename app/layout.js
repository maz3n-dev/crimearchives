import './globals.css'

export const metadata = {
  title: 'Osama Youssef Productions',
  description: 'Luxury weddings & events by Osama Youssef Productions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
