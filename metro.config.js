// metro.config.js
//
// Metro is React Native's JS bundler (like webpack for RN).
// withNativeWind wraps the config to add:
//   - A CSS transformer that processes global.css
//   - A resolver extension for .css files
// The `input` option points to our Tailwind entry file.

const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
