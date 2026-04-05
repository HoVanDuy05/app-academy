module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
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
    ],
    'react-native-reanimated/plugin',
  ],
};
