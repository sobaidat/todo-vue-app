module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    transform: {
        "^.+\\.(js|ts)$": "babel-jest",
    },
    transformIgnorePatterns: [
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$",
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.ts$",
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.tsx$",
    ],
}