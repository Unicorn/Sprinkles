/** @format */

import { FC } from 'react'
import { animated, useSpring } from '@react-spring/web'
import Image from 'next/image'

import styles from '@/styles/modules/auth.module.css'

interface Props {}

const CheckoutModule: FC<Props> = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.columns}>
        <div className={styles.left}>
          <h2 className={styles.h2}>Create a subscription</h2>

          <animated.div className="help info">
            <p>
              We could not find a subscription with that license number. Don't worry, you can create a subscription by scanning the QR code
              on your phone or typing this link into your browser:
            </p>
            <p>
              <strong>https://square.link/u/yxynkot2</strong>
            </p>
            <p>
              Monthly subscriptions can be managed and cancelled through the email you sign up with, or by talking to our staff during
              business hours.
            </p>
          </animated.div>
        </div>

        <div className={styles.right}>
          <Image src="/images/sq-subscription-basic.png" alt="A unicorn featuring a gorgeous and long mane" width="400" height="400" />
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <animated.button className="action confirm">Confirm</animated.button>
          <button className="action cancel">Cancel</button>
        </div>
      </footer>
    </div>
  )
}

export default CheckoutModule
