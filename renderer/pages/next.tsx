/** @format */

import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { animated, useSpring } from '@react-spring/web'

import styles from '@/styles/pages/home.module.css'
import animations from '@/styles/pages/home.animations'
import HamburgerMenu from '@/views/ui/buttons/HamburgerMenu'
import AuthModule from '@/views/modules/AuthModule'

const Squares = dynamic(() => import('@/views/canvas/Squares'), {
  ssr: false,
})

const Home: NextPage = () => {
  const [_showAuth, _setShowAuth] = useState<boolean>(false)

  return (
    <>
      <Head>
        <title>The Horn | Lake George Salon</title>
        <meta name="description" content="A unicorn owned salon in Lake George Michigan. Book appointments online!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="fonts/RousseauDeco-Bold.woff2" as="font" type="font/woff2" crossOrigin="crossOrigin" />
      </Head>

      <header className="global-header">
        <HamburgerMenu />
      </header>

      {_showAuth && <AuthModule />}

      <main className={styles.main}>
        <div className={styles.brand}>
          <animated.div className={styles.logo} style={useSpring(animations.logo)}>
            <Image src="/images/logo.svg" alt="A unicorn featuring a gorgeous and long mane" width="360" height="288" />
          </animated.div>

          <animated.div className={styles.intro} style={useSpring(animations.intro)}>
            <animated.h1 className={styles.h1} style={useSpring(animations.h1)}>
              THE MANE
            </animated.h1>

            <animated.h2 className={styles.h2} style={useSpring(animations.h2)}>
              Hair Salon in Lake George, MI
            </animated.h2>
          </animated.div>
        </div>

        <animated.div className={styles.actions} style={useSpring(animations.auth)}>
          <button className="primary button" onClick={() => _setShowAuth(!_showAuth)}>
            Authenticate
          </button>
        </animated.div>
      </main>

      <Squares />
    </>
  )
}

export default Home
