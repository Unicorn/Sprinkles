/** @format */

import React, { FC, SyntheticEvent, useState, useRef } from 'react'
import { animated, useSpring } from '@react-spring/web'

import styles from '@/styles/modules/auth.module.css'
import { parseLicense, License } from '@/helpers/licenseParser'
import useFocus from '@/helpers/reactHooks'

interface Props {}

const AuthModule: FC<Props> = () => {
  const [_license, _setLicense] = useState<License | null>(null)
  const [_magData, _setMagData] = useState<string>('')
  const [_inputRef, _setInputFocus] = useFocus()

  const _magHandler = (e: SyntheticEvent<HTMLInputElement>): void => {
    _setMagData(e.currentTarget.value)
    _setLicense(parseLicense(e.currentTarget.value))
  }

  return (
    <div className={styles.modal} onClick={() => _setInputFocus()}>
      <div className={styles.columns}>
        <div className={styles.left}>
          <h2 className={styles.h2}>
            <span>SWIPE YOUR STATE ID</span>
          </h2>

          <animated.div className="help info">
            <p>
              Whether you have an active membership or if you want to purchase a day pass, we will need to verify your identity using your
              state-issued ID.
            </p>
            <p>
              We do not resell or maliciously use your personal data. Your license number is used as a unique identifier so that we can
              retrieve your membership information.
            </p>
          </animated.div>
        </div>

        <div className={styles.right}>
          <input
            ref={_inputRef}
            className={styles.input}
            type="text"
            onChange={_magHandler}
            placeholder="Drivers License #"
            value={_magData}
            autoFocus
          />

          <div className={styles.license}>
            <header className={styles.header}>
              <span className={styles.state}>Michigan</span>
              <span className={styles.type}>Driver License</span>
            </header>
            <div className={styles.info}>
              <span className={styles.num}>
                {_license?.num
                  ? `${_license.num.slice(0, 3)} ${_license.num.slice(3, 6)} ${_license.num.slice(6, 9)} ${_license.num.slice(9, 12)}`
                  : 'XXX XXX XXX XXX'}
              </span>
              <span className={styles.dob}>
                DOB: {_license?.dob ? `${_license.dob.month}/${_license.dob.day}/${_license.dob.year}` : 'XX/XX/XXXX'}
              </span>
              <span className={styles.exp}>
                EXP: {_license?.exp ? `${_license.exp.month}/${_license.exp.day}/${_license.exp.year}` : 'XX/XX/XXXX'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <animated.footer className={styles.footer} style={useSpring({ opacity: _license?.num ? 1 : 0 })}>
        <div className={styles.container}>
          <button className="action confirm">Confirm</button>
          <button className="action cancel">Cancel</button>
        </div>
      </animated.footer>
    </div>
  )
}

export default AuthModule
