/** @format */

module.exports = {
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
