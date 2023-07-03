import { Inter } from 'next/font/google'
import { Providers } from "./provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'city view',
  description: 'searching the city pics you love',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
