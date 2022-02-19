const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

const node_modules = path.resolve(__dirname, '../..', 'node_modules');
const sharedDir = '../shared';

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      offline: false,
    },
    argv
  );

  config.context = path.resolve(__dirname, '../..');

  config.module.rules.push({
    test: /\.(js|ts|tsx)$/,
    include: /(packages)\/.+/,
    exclude: /node_modules/,
    use: 'babel-loader',
  });

  Object.assign(config.resolve.alias, {
    react: path.resolve(node_modules, 'react'),
    'react-native': path.resolve(node_modules, 'react-native-web'),
    'react-native-web': path.resolve(node_modules, 'react-native-web'),
    '@expo/vector-icons': path.resolve(node_modules, '@expo/vector-icons'),
  });

  config.resolve.alias[`@squiz/shared`] = path.resolve(
    sharedDir,
    require(`${sharedDir}/package.json`).source
  );

  const envIndex = config.plugins.findIndex((plugin) => plugin.definitions);
  if (envIndex !== -1) {
    config.plugins[envIndex].definitions['process.env']['APP_VERSION'] = JSON.stringify(
      require('./package.json').version
    );
  }

  return config;
};
