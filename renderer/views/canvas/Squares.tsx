/** @format */

import React from 'react'
import { Stage, Layer, KonvaNodeComponent } from 'react-konva'
import { Spring, animated, SpringComponentProps } from '@react-spring/konva'

import { colors } from '@/constants/theme'
import { AnimatedComponent } from '@react-spring/web'
import { Rect, RectConfig } from 'konva/lib/shapes/Rect'

const sq1 = {
  loop: { reverse: true },
  from: { fill: colors.sailboat, height: 800, width: 0, rotation: 45, x: 0, opacity: 0 },
  to: { fill: colors.calm, width: window.innerWidth * 1.4, opacity: 0.2, rotation: -45 },
  config: {
    duration: 3500,
  },
  delay: 500,
}

const sq2 = {
  loop: { reverse: true },
  from: { fill: colors.sailboat, height: 900, width: 0, rotation: 45, x: 0, opacity: 0 },
  to: { fill: colors.calm, width: window.innerWidth * 1.4, opacity: 0.2 },
  config: {
    duration: 2500,
  },
  delay: 1500,
}

const sq3 = {
  loop: { reverse: true },
  from: { fill: colors.sailboat, height: 1100, width: 0, rotation: 45, x: 0, opacity: 0 },
  to: { fill: colors.calm, width: window.innerWidth * 1.4, opacity: 0.2, rotation: -45 },
  config: {
    duration: 4500,
  },
  delay: 1000,
}

const sq4 = {
  loop: { reverse: true },
  from: { fill: colors.sailboat, height: 1100, width: 0, rotation: -45, x: 0, opacity: 0 },
  to: { fill: colors.calm, width: window.innerWidth * 1.4, opacity: 0.2, rotation: 45 },
  config: {
    duration: 3000,
  },
  delay: 1500,
}

const sq5 = {
  loop: { reverse: true },
  from: { fill: colors.sailboat, height: 800, width: 0, rotation: -45, x: 0, opacity: 0 },
  to: { fill: colors.calm, width: window.innerWidth * 1.4, opacity: 0.2, rotation: 45 },
  config: {
    duration: 2500,
  },
  delay: 1000,
}

const square = (props: object): JSX.Element => <animated.Rect {...props} />

const Squares = () => {
  return (
    <Stage className="canvas" width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Spring {...sq1}>{square}</Spring>
        <Spring {...sq2}>{square}</Spring>
        <Spring {...sq3}>{square}</Spring>
        <Spring {...sq4}>{square}</Spring>
        <Spring {...sq5}>{square}</Spring>
      </Layer>
    </Stage>
  )
}

export default Squares
