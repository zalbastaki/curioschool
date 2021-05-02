const path = require('path');
const GoogleFontsPlugin = require('@beyonk/google-fonts-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/styles.scss";`,
            },
        },
    },

    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.md$/i,
                    use: 'raw-loader',
                },
            ],
        },

        plugins: [
            new GoogleFontsPlugin({
                fonts: [{ family: 'Lato' }],
            }),
            new PrerenderSPAPlugin({
                // Absolute path to compiled SPA
                staticDir: path.join(__dirname, 'dist'),
                // List of routes to prerender (ex. those using netlify forms)
                routes: ['/contact'],
            }),
        ],
    },
};
