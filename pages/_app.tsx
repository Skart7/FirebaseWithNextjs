import React from 'react'
import {CacheProvider} from '@emotion/react'
import {CssBaseline, ThemeProvider} from '@mui/material'
import nookies from 'nookies'
import axios from 'axios'

import {theme} from '../theme/theme'
import createEmotionCache  from '../utils/theme'

import { wrapper } from '../redux/store'
import { setUser } from '../redux/slices/user'
import { BASE_URL } from '../utils/url'

import {CartProvider} from '../utils/provider/cart'

const clientSideEmotionCache = createEmotionCache()

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </CartProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

App.getInitialProps = wrapper.getInitialAppProps(store => async ({ctx, Component}) => {

  if(ctx.req) {
    const cookie = nookies.get(ctx)

    if(cookie.fbtoken) {
      await axios.post(`${BASE_URL}/api/user/auth`, {
        data: cookie.fbtoken
      }).then(res => {
        if(res.data.msg) {
          store.dispatch(setUser(res.data.msg))
        }
      })
    }
  
  }

  return {
    pageProps: Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {},
  }

})

export default wrapper.withRedux(App)
