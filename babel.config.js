// babel.config.js
//
// WHY THIS ORDER MATTERS:
// 1. babel-preset-expo: core Expo transform with jsxImportSource set to "nativewind"
//    so JSX automatically picks up NativeWind's className support without extra imports.
// 2. nativewind/babel: transforms className props into React Native StyleSheet calls at build time.
// 3. react-native-reanimated/plugin: MUST be last — it hoists worklet functions to the
//    UI thread. If placed before other transforms, it can corrupt the worklet AST.

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      // Reanimated plugin MUST be the last plugin
      'react-native-reanimated/plugin',
    ],
  };
};
