import { NavBar } from '../components';
import './globals.css';
import type { Metadata } from 'next';
import { ReactQueryProvider } from '../providers';

export const metadata: Metadata = {
  title: 'Trello Clone',
  description: 'Trello clone built with next.js and Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='dark bg-gray-900'>
        <ReactQueryProvider>
          <NavBar />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
