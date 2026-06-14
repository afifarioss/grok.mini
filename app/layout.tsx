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
  description: 'Mini Grok on Base | AI Chat for Base builders, grants, trading & memes. Built by @afifarioss',
  icons: '/favicon.ico',
  other: {
    'talentapp:project_verification': '2dfd15ab8ee2bf871bf00997a9b8480d98de3e42d289e0d3e5e250c30feceed92a5212e364f8dac86971b783e0f01ffd8d1c677c7ac52c0bbc22b9e68e447cd0',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-green-400 min-h-screen`}>
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