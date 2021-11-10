module.exports = function(api) {
    api.cache(true);
    return {
        preset: "jest-expo",
        global: {
            "ts-jest": {
                tsconfig: 'tsconfig.json',
            }
        },
        transformIgnorePatterns: [
          "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
        ]
    }
}