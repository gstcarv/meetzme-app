module.exports = {
  presets: ["module:metro-react-native-babel-preset", "mobx"],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
}
