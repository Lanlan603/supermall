module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 375,
            wiewportHeight: 667,
            unitPrecision: 5,
            viewportUnit: 'vw',
            selectorBlackList: ['ignore', 'nav-bar', 'tab-bar', 'tab-bar-item'],
            minPixelValue: 1,
            mediaQuery: false,
        }
    }
}