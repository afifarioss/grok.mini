import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { base } from 'wagmi/chains'
import { createConfig, http } from 'wagmi'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'

const inter = Inter({ subsets: ['latin'] })

const config = createConfig(
  getDefaultConfig({
    chains: [base],
    transports: {
      [base.id]: http(),
    },
    ssr: true,
  })
)

const queryClient = new QueryClient()

export const metadata: Metadata = {
  title: 'GrokBase — Mini Grok on Base',
  description: 'Mini Grok on Base | AI Chat for Base builders, grants, trading & memes',
  icons: '/favicon.ico',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-green-400`}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <ConnectKitProvider>
              {children}
            </ConnectKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}