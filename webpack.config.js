import * as path from 'path';
import * as url from 'url';
import * as autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';

const dirname = path.join(url.fileURLToPath(import.meta.url), '..');

// eslint-disable-next-line no-console
console.log(path.join(dirname, 'dist'));

export default {
    entry: {
        index: './src/jsx/index.jsx',
        // sass: './src/scss/style.scss',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(dirname, 'dist'),
    },
    plugins: [
        new MiniCssExtractPlugin(),
        /* new HtmlWebpackPlugin({
          title: 'TinyMCE Webpack Demo',
          meta: {viewport: 'width=device-width, initial-scale=1'}
        }), */
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                // test: /\.(jpe?g|png|gif|svg)$/i,
                test: /\.(jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    mimetype: 'image/jpg',
                    limit: 10 * 1024,
                },
            }, /*
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    mimetype: 'image/jpg',
                    limit: 10 * 1024,
                },
            }, */
            {
                test: /\.(scss)$/,
                use: [
                    {
                        // inject CSS to page
                        loader: 'style-loader',
                    },
                    {
                        // translates CSS into CommonJS modules
                        loader: 'css-loader',
                        options: {
                            url: true,
                        },
                    },
                    {
                        // Run postcss actions
                        loader: 'postcss-loader',
                        options: {
                            // `postcssOptions` is needed for postcss 8.x;
                            // if you use postcss 7.x skip the key
                            postcssOptions: {
                                // postcss plugins, can be exported to postcss.config.js
                                plugins() {
                                    return [
                                        autoprefixer,
                                    ];
                                },
                            },
                        },
                    },
                    {
                        // compiles Sass to CSS
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /skin\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /content\.css$/i,
                loader: 'css-loader',
                options: {
                    esModule: false,
                },
            },
        ],
    }, /*
    optimization: {
        minimizer: [
            '...',
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ['gifsicle', { interlaced: true }],
                            ['jpegtran', { progressive: true }],
                            ['optipng', { optimizationLevel: 5 }],
                        ],
                    },
                },
            }),
        ],
    }, */
};
