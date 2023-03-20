import React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Navbar, Footer, FCMNotification } from '../components/_home'
import MetamaskProvider from '../contexts/Metamask.context'
import { store } from '../redux/store'
import '../styles/filterSidebar.css';
import googleClient from '../client_secret_wadza.apps.googleusercontent.com.json'

import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import ar from '../lang/ar.json'
import en from '../lang/en.json'
import BottomNavbar from '../components/_home/bottomNavbar'

const messages = {
  ar,
  en,
}

const getDirection = (locale: string | undefined) => {
  if (locale === 'ar') {
    return 'rtl'
  }

  return 'ltr'
}

const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider)
  library.pollingInterval =  12000
  return library
}

/* create the subgraph client */
export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_SUBGRAPH_ENDPOINT,
  cache: new InMemoryCache()
})

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter()

  let _locale: string = locale??'en'

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <IntlProvider locale={_locale} messages={messages[_locale as keyof typeof messages]}>
          <GoogleOAuthProvider clientId={googleClient.web.client_id}>
            <Web3ReactProvider getLibrary={getLibrary}>
              <MetamaskProvider>
                <FCMNotification>
                    <Head>
                      <title>Wadza</title>
                      <meta name='description' content='NFT marketplace' />
                      <link rel='icon' href='/favicon.ico' />
                    </Head>
                    <Navbar />
                    <Component {...pageProps} dir={() => getDirection(_locale)} />
                    <Footer />
                    <BottomNavbar />
                </FCMNotification>
              </MetamaskProvider>
            </Web3ReactProvider>
            <ToastContainer />
          </GoogleOAuthProvider>
        </IntlProvider>
      </ApolloProvider>
    </Provider>
  )
}
