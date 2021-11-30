/** @format */

import React, { useState, SyntheticEvent, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { animated, useSpring } from '@react-spring/web'
import { Button } from '@mui/material'

import styles from '@/styles/pages/home.module.css'
import animations from '@/styles/pages/home.animations'
import { clear } from '@/controllers/customerController'
import { useAppDispatch } from '@/helpers/reactHooks'
import { useBlink } from '@/helpers/blinkHooks'
import HamburgerMenu from '@/views/ui/buttons/HamburgerMenu'
import AuthModule from '@/views/modules/AuthModule'
import CheckoutModule from '@/views/modules/CheckoutModule'
import Logo from '@/views/graphics/Logo'

const Squares = dynamic(() => import('client/views/canvas/Squares'), {
  ssr: false,
})

const Home: NextPage = () => {
  const dispatch = useAppDispatch()
  const [_showAuth, _setShowAuth] = useState<boolean>(false)
  const [_showCheckout, _setShowCheckout] = useState<boolean>(false)
  // const blink = useBlink()

  const _authConfirm = (e: SyntheticEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    _setShowAuth(false)
    _setShowCheckout(true)
  }

  const _authCancel = (e: SyntheticEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    _setShowAuth(false)
    dispatch(clear())
  }

  const _checkoutConfirm = (e: SyntheticEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    _setShowCheckout(false)
  }

  const _checkoutCancel = (e: SyntheticEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    _setShowCheckout(false)
  }

  const _captureUser = (): void => {
    alert(process && process.arch && process.platform ? `${process.platform} - ${process.arch}` : 'Not Supported')
  }

  return (
    <>
      <Head>
        <title>The Mane | Lake George Grocery</title>
        <meta name="description" content="A unicorn owned grocery and cafe in Lake George Michigan." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="fonts/RousseauDeco-Bold.woff2" as="font" type="font/woff2" crossOrigin="crossOrigin" />
      </Head>

      <Squares />

      <header className="global-header">
        <HamburgerMenu />
      </header>

      {_showAuth && <AuthModule confirmHandler={_authConfirm} cancelHandler={_authCancel} />}
      {_showCheckout && <CheckoutModule confirmHandler={_checkoutConfirm} cancelHandler={_checkoutCancel} />}

      <main className={styles.main}>
        <div className={styles.brand}>
          <animated.div className={styles.logo} style={useSpring(animations.logo)}>
            <Logo />
          </animated.div>

          <animated.div className={styles.intro} style={useSpring(animations.intro)}>
            <animated.p className={styles.title} style={useSpring(animations.title)}>
              The Horn
            </animated.p>

            <animated.p className={styles.slogan} style={useSpring(animations.slogan)}>
              Welcome to our 24-hour cafe!
            </animated.p>
          </animated.div>
        </div>

        <animated.div className={styles.actions} style={useSpring(animations.auth)}>
          <div className={styles.container}>
            <Button color="primary" variant="contained" size="large" onClick={() => _setShowAuth(!_showAuth)}>
              Register
            </Button>
            <Button color="secondary" variant="contained" size="large" onClick={_captureUser}>
              Login
            </Button>
          </div>
        </animated.div>
      </main>
    </>
  )
}

export default Home
