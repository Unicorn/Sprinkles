/** @format */

import { SyntheticEvent } from 'react'

export interface LicenseDate {
  day: string
  month: string
  year: string
}

export interface License {
  num: string
  exp: LicenseDate
  dob: LicenseDate
}

const defaultDateObj = {
  day: '01',
  month: '01',
  year: '2000',
}

export const parseLicense = (payload: string): License | null => {
  /**
   * ID was swiped by mag reader and is a typical MI license
   *
   * Example:
   *    s636032046110135670]250819870828]13]Z
   *
   * Parsed:
   *    [0] License:  (s636032) prefix, 046110135670 license number
   *    [1] Dates:    25/08 expiration, 1987/08/28 YYYY/MM/DD date of birth
   *    [2] Unknown:  13
   *    [3] Unknown:  Z
   */
  if (payload.length === 37 && payload.match(/^(s636032)/g)) {
    const data = payload.split(']')
    const day = data[1].slice(10, 12)
    const month = data[1].slice(8, 10)
    const year = data[1].slice(4, 8)
    const exp = data[1].slice(0, 4)

    return {
      num: data[0].slice(7, 27),
      exp: {
        ...defaultDateObj,
        day,
        month: exp.slice(2, 4),
        year: '20' + exp.slice(0, 2),
      },
      dob: {
        ...defaultDateObj,
        day,
        month,
        year,
      },
    }
  }

  return null
}
