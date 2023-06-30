export const metadata = {
  title: 'City View - city pictures searching website',
  description: 'Search for your favorite city pictures here!',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
