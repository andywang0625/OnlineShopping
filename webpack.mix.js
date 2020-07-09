/*
 * @Author: Kanade
 * @Date: 2020-06-08 23:05:32
 * @LastEditTime: 2020-07-09 01:48:03
 * @Description:
 */
const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

mix.react('resources/js/App.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .webpackConfig({
       module:{
           rules:[
               {
                   test: /\.tsx?$/,
                   loader: "ts-loader",
                   include: [
                       path.resolve(__dirname, "resources/js"),
                   ],
                   exclude: [
                    /admin-dashboard/,
                    /node_modules/,
                   ],
               },
           ]
       },
       resolve:{
            extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
       },
       plugins: [
           //new BundleAnalyzerPlugin(),
       ]
   });
