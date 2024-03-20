import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { AppProps } from 'next/app'

// Adds the session provider to the app
export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
