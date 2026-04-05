const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    ...defaultConfig.resolver,
    alias: {
      '@': './src',
      '@components': './src/components',
      '@screens': './src/screens',
      '@hooks': './src/hooks',
      '@stores': './src/stores',
      '@services': './src/services',
      '@utils': './src/utils',
      '@types': './src/types',
      '@navigation': './src/navigation',
      '@theme': './src/theme',
      '@assets': './src/assets',
      '@config': './src/config',
      '@layouts': './src/layouts',
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
