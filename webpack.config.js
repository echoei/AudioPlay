const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        'index': `./src/index.tsx`,
    },

    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[hash:10].js'
    },

    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
    },

    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: {
                                declaration: false
                            }
                        }
                    }
                ],
            },
            {
                test: /\.html?$/,
                loader: 'html-loader',
                options: {
                    attrs: ['img:src', 'link:href'],
                    removeComments: true
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')(),
                                require('cssnano')(),
                            ],
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html",
            inject: true
        })
    ]
}