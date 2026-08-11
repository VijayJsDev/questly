// metro.config.js
//
// NativeWind v5: withNativewind() no longer needs the { input } option.
// CSS processing is now handled via PostCSS (@tailwindcss/postcss) configured
// in postcss.config.mjs — Metro picks it up automatically.
//
// react-native-worklets is a peer dep of react-native-reanimated v4.
// It must be in extraNodeModules so Metro finds it via the Reanimated import chain.

const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Ensure react-native-worklets resolves correctly through Reanimated's import chain
config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    ...config.resolver?.extraNodeModules,
    'react-native-worklets': path.resolve(__dirname, 'node_modules/react-native-worklets'),
  },
};

module.exports = withNativewind(config);
