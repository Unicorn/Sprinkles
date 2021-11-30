/** @format */

module.exports = {
  typescript: {
    /**
     * There's some stupid issue with type inference on recursive definitions.

        ./views/canvas/Squares.tsx:61:48
        Type error: Type instantiation is excessively deep and possibly infinite.

          59 | }
          60 |
        > 61 | const square = (props: object): JSX.Element => <animated.Rect {...props} />
     */
    ignoreBuildErrors: true,
  },
  // Commenting out the target for now.
  // Electron won't need it until we need to access process globals for node packages.
  // Manually setting the globalObject to window.
  // The better approach later, will be to check electron vs web rendering and set config accordingly
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // config.target = 'electron-renderer'
      config.output.globalObject = 'window'
    }

    return config
  },
}
