const path = require("path");
const rewireAliases = require("react-app-rewire-aliases");
const TerserPlugin = require("terser-webpack-plugin");

function configureSassIncludePaths(config) {
    const oneOfRule = config.module.rules.find((rule) => Array.isArray(rule.oneOf));

    if (!oneOfRule) {
        return config;
    }

    oneOfRule.oneOf.forEach((rule) => {
        if (!Array.isArray(rule.use)) {
            return;
        }

        rule.use.forEach((useEntry) => {
            if (!useEntry || typeof useEntry !== "object" || !String(useEntry.loader).includes("sass-loader")) {
                return;
            }

            const existingSassOptions = useEntry.options?.sassOptions || {};
            const existingIncludePaths = existingSassOptions.includePaths || [];

            useEntry.options = {
                ...useEntry.options,
                sassOptions: {
                    ...existingSassOptions,
                    includePaths: Array.from(
                        new Set([
                            ...existingIncludePaths,
                            path.resolve(__dirname, "node_modules"),
                            path.resolve(__dirname, "src/assets"),
                        ])
                    ),
                },
            };
        });
    });

    return config;
}

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

    config = configureSassIncludePaths(config);

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
