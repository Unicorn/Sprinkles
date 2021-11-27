/** @format */

import { createTheme } from '@material-ui/core/styles'

export const colors = {
  black: '#2b3240',
  brick: '#984018',
  lime: '#75a00c',
  preschool: '#07877a',
  sunshine: '#d6bd3f',
  dark: '#5d596f',
  darker: '#252e4c',
  darkest: '#111d2a',
  light: '#babfcc',
  lighter: '#e3ecef',
  lightest: '#edf3f5',
  medium: '#76888f',
  haze: '#948abf',
  indigo: '#5e4bb3',
  lavendar: '#c5b8ff',
  midnight: '#43367f',
  twilight: '#866bff',
  bunny: '#ac8dd2',
  calm: '#879fca',
  epic: '#8d53d3',
  ocean: '#34538c',
  sailboat: '#4771bf',
}

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.indigo,
    },
    secondary: {
      main: colors.bunny,
    },
    error: {
      main: colors.brick,
    },
    background: {
      default: colors.lightest,
    },
  },
})
