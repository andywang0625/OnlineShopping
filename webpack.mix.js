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
var LiveReloadPlugin = require('webpack-livereload-plugin');

mix.react('resources/js/App.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .webpackConfig({
       module:{
           rules:[
               {
                   test: /\.tsx?$/,
                   loader: "ts-loader",
               }
           ]
       },
       resolve:{
            extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
       },
       plugins: [
           new LiveReloadPlugin()
       ]
   });
