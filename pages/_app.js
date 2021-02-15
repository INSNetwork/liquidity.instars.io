import React from 'react'
import NextHead from 'next/head'
import { useSpring, animated } from 'react-spring'
import { createGlobalStyle } from 'styled-components'
import { ViewportProvider } from 'use-viewport'
import { WalletProvider } from 'lib/wallet'

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-Regular.ttf');
    src: url('/fonts/inter/Inter-Regular.woff2') format('woff2'),  url('/fonts/inter/Inter-Regular.woff') format('woff');
  }
  @font-face {
    font-family: 'Inter';
    font-style:  normal;
    font-weight: 700;
    src: url('/fonts/inter/Inter-Bold.woff2') format('woff2'), url('../fonts/inter/Inter-Bold.woff') format('woff');
  }
  @font-face {
    font-family: 'Roboto Mono';
    src: url('/fonts/Robotomono.ttf');
  }
 
  body,
  button {
    font-family: 'Inter', sans-serif;
  }
  body,
  html {
    margin: 0;
    padding: 0;
    font-size: 16px;
  }
`

export default function App({ Component, pageProps }) {
  const revealProps = useSpring({
    from: { opacity: 0, transform: 'scale3d(0.98, 0.98, 1)' },
    to: { opacity: 1, transform: 'scale3d(1, 1, 1)' },
  })

  return (
    <ViewportProvider>
      <animated.div style={revealProps}>
        <NextHead>
          <title>Uniswap Staking Program</title>
        </NextHead>
        <GlobalStyles />
        <WalletProvider>
          <Component {...pageProps} />
        </WalletProvider>
      </animated.div>
    </ViewportProvider>
  )
}
