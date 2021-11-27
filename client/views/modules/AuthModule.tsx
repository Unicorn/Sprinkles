/** @format */

import React, { FC, SyntheticEvent, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'

import styles from '@/styles/modules/auth.module.css'
import { parseLicense, License } from 'client/helpers/licenseParser'
import useFocus, { useAppDispatch, useAppSelector } from 'client/helpers/reactHooks'
import { fetchCustomerByLicense, selectCustomer } from '@/controllers/customerController'

interface Props {
  confirmHandler: (e: SyntheticEvent<HTMLButtonElement>) => void
  cancelHandler: (e: SyntheticEvent<HTMLButtonElement>) => void
}

const AuthModule: FC<Props> = ({ confirmHandler, cancelHandler }) => {
  const dispatch = useAppDispatch()
  const customer = useAppSelector(selectCustomer)

  const [_license, _setLicense] = useState<License | null>(null)
  const [_magData, _setMagData] = useState<string>('')
  const [_inputRef, _setInputFocus] = useFocus()

  const _magHandler = (e: SyntheticEvent<HTMLInputElement>): void => {
    const val = e.currentTarget.value
    const license = parseLicense(val)
    _setMagData(val)
    _setLicense(license)

    if (license && license.num.length === 12) dispatch(fetchCustomerByLicense(license))
  }

  return (
    <div className={styles.modal} onClick={() => _setInputFocus()}>
      <div className={styles.columns}>
        <div className={styles.left}>
          <h2 className={styles.h2}>SWIPE YOUR STATE ID</h2>

          <animated.div className="help info">
            <p>If you have an active membership or want a day pass, we will need to verify your identity using your state-issued ID.</p>
            <p>We do not share your personal data. Your license is used as a unique identifier for membership and payment processing.</p>
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
                <strong>DOB:</strong> {_license?.dob ? `${_license.dob.month}/${_license.dob.day}/${_license.dob.year}` : 'XX/XX/XXXX'}
              </span>
              <span className={styles.exp}>
                <strong>EXP:</strong> {_license?.exp ? `${_license.exp.month}/${_license.exp.day}/${_license.exp.year}` : 'XX/XX/XXXX'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <animated.button
            className="action confirm"
            disabled={!_license?.num}
            style={useSpring({ opacity: _license?.num ? 1 : 0 })}
            onClick={confirmHandler}
          >
            Confirm
          </animated.button>
          <button className="action cancel" onClick={cancelHandler}>
            Cancel
          </button>
        </div>
      </footer>
    </div>
  )
}

export default AuthModule
