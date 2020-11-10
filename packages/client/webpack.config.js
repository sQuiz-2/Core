const createExpoWebpackConfigAsync = require('@expo/webpack-config');
/* const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); */

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['shared'],
      },
      offline: false,
    },
    argv
  );
  return config;
};
