const SassRuleRewire = require("react-app-rewire-sass-rule");
const path = require("path");
const rewireAliases = require("react-app-rewire-aliases");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = function override(config, env) {
    // Enable PostCSS with RTL support
    require("react-app-rewire-postcss")(config, {
        plugins: (loader) => [require("postcss-rtl")()],
    });

    // Webpack Aliases
    config = rewireAliases.aliasesOptions({
        "@src": path.resolve(__dirname, "src"),
        "@assets": path.resolve(__dirname, "src/@core/assets"),
        "@components": path.resolve(__dirname, "src/@core/components"),
        "@layouts": path.resolve(__dirname, "src/@core/layouts"),
        "@store": path.resolve(__dirname, "src/redux"),
        "@styles": path.resolve(__dirname, "src/@core/scss"),
        "@configs": path.resolve(__dirname, "src/configs"),
        "@utils": path.resolve(__dirname, "src/utility/Utils"),
        "@hooks": path.resolve(__dirname, "src/utility/hooks"),
    })(config, env);

    // Optimize Sass Compilation
    config = new SassRuleRewire()
        .withRuleOptions({
            test: /\.s[ac]ss$/i,
            use: [
                {
                    loader: "sass-loader",
                    options: {
                        sassOptions: {
                            includePaths: ["node_modules", "src/assets"],
                        },
                    },
                },
            ],
        })
        .rewire(config, env);

    // 🚀 Production Optimizations
    if (env === "production") {
        config.optimization = {
            splitChunks: {
                chunks: "all",
            },
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_debugger: true,
                            pure_funcs: ["console.log", "console.debug"], // Removes only log & debug
                        },
                        format: {
                            comments: false, // Remove comments
                        },
                    },
                })

            ],
        };
    }

    return config;
};
