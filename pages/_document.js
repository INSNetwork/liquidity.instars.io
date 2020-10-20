import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import env from 'lib/environment'

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await NextDocument.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
            crossOrigin="anonymous"
          />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="instars.com" />
          <meta name="twitter:description" content={env('SITE_DESCRIPTION')} />
          <meta name="twitter:title" content={env('SITE_TITLE')} />
          <meta name="twitter:image" content="/twitter-card-icon.png" />

          <meta property="og:title" content={env('SITE_TITLE')} />
          <meta property="og:description" content={env('SITE_DESCRIPTION')} />
          <meta property="og:url" content={env('SITE_URL')} />
          <meta property="og:site_name" content={env('SITE_TITLE')} />
          <meta property="og:image" content="/twitter-card-icon.png" />
          <meta
            property="og:image:secure_url"
            content="/twitter-card-icon.png"
          />
          <meta property="og:image:width" content="300" />
          <meta property="og:image:height" content="300" />

          <meta name="description" content={env('SITE_DESCRIPTION')} />
          <style>{`
            html, body {
            min-height: 100vh;
            background: no-repeat center/170px url(/splash_1.svg),
                #28262C; !important
            mix-blend-mode: multiply;
            overflow: auto;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
