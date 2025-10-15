import './globals.css'

export const metadata = {
  title: 'Crime Archives',
  description: 'The Truth Awaits To Be Told',
icons: {
    icon: 'https://ik.imagekit.io/n24n6n3cq/Gemini_Generated_Image_1l2rv61l2rv61l2r%20Background%20Removed.png?updatedAt=1760541058355', 
  },
};


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
