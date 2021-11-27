/** @format */

import { Children } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'

import { theme } from '@/constants/theme'

class Doc extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content={theme.palette.primary.main} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

Doc.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), sheets.getStyleElement()],
  }
}

export default Doc
