module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        root: ['./src'],
        alias: {
          src: './src',
          utils: './src/utils',
          store: './src/store',
          assets: './src/assets',
          screens: './src/screens',
          network: './src/network',
          components: './src/components',
          navigators: './src/navigators',
          theme: './src/theme',
        },
      },
    ],
  ],
};
