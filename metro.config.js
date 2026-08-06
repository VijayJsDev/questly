// metro.config.js
//
// Metro is React Native's JS bundler (like webpack for RN).
// withNativeWind wraps the config to add:
//   - A CSS transformer that processes global.css
//   - A resolver extension for .css files
// The `input` option points to our Tailwind entry file.
//
// react-native-worklets is a peer dependency of react-native-reanimated v4.
// It must be explicitly listed in resolver.extraNodeModules so Metro can
// find it when Reanimated imports it through NativeWind's CSS interop chain.

const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Ensure react-native-worklets resolves correctly
config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    ...config.resolver?.extraNodeModules,
    'react-native-worklets': path.resolve(__dirname, 'node_modules/react-native-worklets'),
  },
};

module.exports = withNativeWind(config, { input: './global.css' });
