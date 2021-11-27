/** @format */

import { FC, SyntheticEvent } from 'react'
import { animated, useSpring } from '@react-spring/web'
import Image from 'next/image'
import { Button } from '@mui/material'

import styles from '@/styles/modules/auth.module.css'

interface Props {
  confirmHandler: (e: SyntheticEvent<HTMLButtonElement>) => void
  cancelHandler: (e: SyntheticEvent<HTMLButtonElement>) => void
}

const CheckoutModule: FC<Props> = () => {
  return (
    <animated.div className={styles.modal} style={useSpring({ opacity: 1 })}>
      <div className={styles.columns}>
        <div className={styles.left}>
          <h2 className={styles.title}>Create a subscription</h2>

          <div className="help info">
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
          </div>
        </div>

        <div className={styles.right}>
          <Image src="/images/sq-subscription-basic.png" alt="A unicorn featuring a gorgeous and long mane" width="200" height="200" />
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <Button color="success" onClick={confirmHandler} size="large" variant="contained">
            Next
          </Button>

          <Button size="large" variant="contained" color="error" onClick={cancelHandler}>
            Cancel
          </Button>
        </div>
      </footer>
    </animated.div>
  )
}

export default CheckoutModule
