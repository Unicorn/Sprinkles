/** @format */

import React from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import { Spring, animated } from '@react-spring/konva'

import { colors } from '@/constants/theme'

const sq1 = {
  from: { fill: colors.sailboat, height: 800, width: 0, rotation: 45, x: 0, opacity: 0 },
  to: { width: window.innerWidth * 1.4, opacity: 0.2 },
  config: {
    duration: 1500,
  },
  delay: 500,
}

const sq2 = {
  from: { fill: colors.sailboat, height: 900, width: 0, rotation: 45, x: 1000, opacity: 0 },
  to: { width: window.innerWidth * 1.4, opacity: 0.2 },
  config: {
    duration: 1000,
  },
  delay: 1500,
}

const sq3 = {
  from: { fill: colors.calm, height: 1100, width: 0, rotation: 45, x: 0, opacity: 0 },
  to: { width: window.innerWidth * 1.4, opacity: 0.2 },
  config: {
    duration: 1500,
  },
  delay: 1000,
}

const sq4 = {
  from: { fill: colors.sailboat, height: 1100, width: 0, rotation: -45, x: -300, opacity: 0 },
  to: { width: window.innerWidth * 1.4, opacity: 0.2 },
  config: {
    duration: 1000,
  },
  delay: 1500,
}

const sq5 = {
  from: { fill: colors.calm, height: 800, width: 0, rotation: -45, x: window.innerWidth / 2, opacity: 0 },
  to: { width: window.innerWidth, opacity: 0.2 },
  config: {
    duration: 1000,
  },
  delay: 1000,
}

const Squares = () => {
  return (
    <Stage className="canvas" width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Spring {...sq1}>{props => <animated.Rect {...props} y={-500} />}</Spring>
        <Spring {...sq2}>{props => <animated.Rect {...props} y={-400} />}</Spring>
        <Spring {...sq3}>{props => <animated.Rect {...props} y={400} />}</Spring>
        <Spring {...sq4}>{props => <animated.Rect {...props} y={600} />}</Spring>
        <Spring {...sq5}>{props => <animated.Rect {...props} y={window.innerHeight} />}</Spring>
      </Layer>
    </Stage>
  )
}

export default Squares
