/** @format */

import React, { FC, SyntheticEvent, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { LoadingButton } from '@mui/lab'
import { Check } from '@mui/icons-material'
import { Button } from '@mui/material'

import styles from '@/styles/modules/auth.module.css'
import { parseLicense, License } from 'client/helpers/licenseParser'
import useFocus, { useAppDispatch, useAppSelector } from 'client/helpers/reactHooks'
import { searchCustomerByLicense, selectCustomer } from '@/controllers/customerController'
import animations from '@/styles/global.animations'

interface Props {
  confirmHandler: (e: SyntheticEvent<HTMLButtonElement>) => void
  cancelHandler: (e: SyntheticEvent<HTMLButtonElement>) => void
}

const formattedLicense = (num: string) => (
  <>
    <span>{num.slice(0, 3)}</span>
    <span>{num.slice(3, 6)}</span>
    <span>{num.slice(6, 9)}</span>
    <span>{num.slice(9, 12)}</span>
  </>
)

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

    if (license && license.num.length === 12) dispatch(searchCustomerByLicense(license))
  }

  return (
    <animated.div className={styles.modal} style={useSpring(animations.modal)} onClick={() => _setInputFocus()}>
      <div className={styles.columns}>
        <div className={styles.left}>
          <p className={styles.title}>SWIPE YOUR STATE ID</p>

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
              <span className={styles.num}>{formattedLicense(_license?.num || 'XXXXXXXXXXXX')}</span>
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
          <LoadingButton
            color="success"
            disabled={!_license?.num}
            loading={customer.status === 'loading'}
            loadingPosition="start"
            onClick={confirmHandler}
            size="large"
            startIcon={<Check />}
            variant="contained"
          >
            Confirm
          </LoadingButton>

          <Button size="large" variant="contained" color="error" onClick={cancelHandler}>
            Cancel
          </Button>
        </div>
      </footer>
    </animated.div>
  )
}

export default AuthModule
