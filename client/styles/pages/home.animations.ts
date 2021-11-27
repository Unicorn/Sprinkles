/** @format */

const animations = {
  logo: {
    from: { opacity: 0, y: 0 },
    to: { opacity: 1, y: 10 },
    config: {
      duration: 1000,
    },
    delay: 2000,
  },

  intro: {
    from: { opacity: 0, y: 0 },
    to: { opacity: 1, y: 10 },
    config: {
      duration: 1000,
    },
    delay: 2000,
  },

  title: {
    from: { opacity: 0, y: 0 },
    to: { opacity: 1, y: 10 },
    config: {
      duration: 1000,
    },
    delay: 2800,
  },

  slogan: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 1000,
    },
    delay: 3500,
  },

  auth: {
    from: { bottom: '-100rem', opacity: 0 },
    to: { bottom: '0', opacity: 1 },
    config: {
      duration: 1500,
    },
    delay: 4000,
  },
}

export default animations
