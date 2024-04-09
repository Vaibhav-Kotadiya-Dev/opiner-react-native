module.exports = {
  assets: ['./src/assets/fonts/'],
  dependencies: {
    'react-native-video-cache': {
      platforms: {
        android: null, // disable auto-linking Android platform, as we're using native module
      },
    },
  },
};
