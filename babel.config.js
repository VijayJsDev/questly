// babel.config.js
//
// NativeWind v5 no longer requires a Babel plugin.
// The className transform is now handled entirely by PostCSS + react-native-css at runtime.
// Only babel-preset-expo and the Reanimated plugin (must be last) are needed.

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
    ],
    plugins: [
      // Reanimated plugin MUST be the last plugin
      'react-native-reanimated/plugin',
    ],
  };
};
