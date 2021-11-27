/** @format */

import React, { FC } from 'react'

interface Props {}

const HamburgerMenu: FC<Props> = () => {
  return (
    <button className="hamburger">
      <svg width="34px" height="24px" viewBox="0 0 34 24">
        <path d="M24,20 L24,24 L0,24 L0,20 L24,20 Z M34,10 L34,14 L0,14 L0,10 L34,10 Z M34,0 L34,4 L0,4 L0,0 L34,0 Z"></path>
      </svg>
    </button>
  )
}

export default HamburgerMenu
