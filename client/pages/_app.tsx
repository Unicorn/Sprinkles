/** @format */

import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import '@/styles/global.css'
import store from '@/controllers/reduxController'

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
