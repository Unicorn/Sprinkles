/** @format */

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import '@fontsource/roboto'
import '@fontsource/mate-sc'
import '@fontsource/material-icons'

import '@/styles/global.css'
import { theme } from '@/constants/theme'
import store from '@/controllers/reduxController'

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default App
