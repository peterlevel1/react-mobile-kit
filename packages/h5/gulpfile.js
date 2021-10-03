const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');
const postcss = require('gulp-postcss');
const babel = require('gulp-babel');
const del = require('del');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const through = require('through2');

function clean() {
  return del('./lib/**');
}

function buildStyle() {
  return gulp
    .src(['./src/**/*.less'], {
      base: './src/',
      ignore: ['**/demos/**/*', '**/tests/**/*'],
    })
    .pipe(
      less({
        paths: [path.join(__dirname, 'src')],
        relativeUrls: true,
      })
    )
    .pipe(gulp.dest('./lib/es'))
    .pipe(gulp.dest('./lib/cjs'));
}

function copyAssets() {
  return gulp
    .src('./src/assets/**/*')
    .pipe(gulp.dest('lib/assets'))
    .pipe(gulp.dest('lib/es/assets'))
    .pipe(gulp.dest('lib/cjs/assets'));
}

function buildCJS() {
  return gulp
    .src(['lib/es/**/*.js'])
    .pipe(
      babel({
        'plugins': ['@babel/plugin-transform-modules-commonjs'],
      })
    )
    .pipe(gulp.dest('lib/cjs/'));
}

function buildES() {
  return gulp
    .src(['src/**/*.{js,jsx}'], {
      ignore: ['**/demos/**/*', '**/tests/**/*'],
    })
    .pipe(babel())
    .pipe(gulp.dest('lib/es/'));
}

function umdWebpack() {
  return gulp
    .src('lib/es/index.js')
    .pipe(
      webpackStream(
        {
          output: {
            filename: 'react-mobile-kit.js',
            library: {
              type: 'umd',
              name: 'rmk',
            },
          },
          mode: 'production',
          optimization: {
            usedExports: true,
          },
          resolve: {
            extensions: ['.js', '.json'],
          },
          module: {
            rules: [
              {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                type: 'asset/inline',
              },
              {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
              },
            ],
          },
          externals: [
            {
              react: 'React',
            },
          ],
        },
        webpack
      )
    )
    .pipe(gulp.dest('lib/umd/'));
}

function copyMetaFiles() {
  return gulp.src(['./README.md', './LICENSE.txt']).pipe(gulp.dest('./lib/'));
}

function generatePackageJSON() {
  return gulp
    .src('./package.json')
    .pipe(
      through.obj((file, enc, cb) => {
        const rawJSON = file.contents.toString()
        const parsed = JSON.parse(rawJSON)
        delete parsed.scripts
        delete parsed.devDependencies
        delete parsed.publishConfig
        const stringified = JSON.stringify(parsed, null, 2)
        file.contents = Buffer.from(stringified)
        cb(null, file)
      })
    )
    .pipe(gulp.dest('./lib/'));
}

exports.umdWebpack = umdWebpack;

exports.default = gulp.series(
  clean,
  buildES,
  gulp.parallel(buildCJS, buildStyle),
  copyAssets,
  copyMetaFiles,
  generatePackageJSON,
  gulp.parallel(umdWebpack)
);
