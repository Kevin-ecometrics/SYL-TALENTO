import { Providers } from './providers'
import './globals.css'
import { roboto_mono } from './fonts'
export const metadata = {
  title: 'SYL talento | soluciones en selección, reclutamiento y suministros de materiales para las Californias',
  description: 'En SYL Talento, nos dedicamos a brindar soluciones de reclutamiento y selección de personal, así como suministros de materiales en Baja California y en toda la República Mexicana. Somos una empresa 100% comprometida con la innovación, la integridad y la calidad.',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto_mono.className}>
      <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
