const fs = require('fs');
const chalk = require('chalk');
const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');
const postcss = require('gulp-postcss');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const through = require('through2');
const cloneDeep = require('lodash.clonedeep');

const root = process.cwd();
const PATH_MAP = {
  root,
  //
  src: path.join(root, 'src'),
  //
  assets: path.join(root, 'src/assets'),
  //
  components: path.join(root, 'src/components'),
  //
  lib: path.join(root, 'lib'),
  //
  tsConfig: path.join(root, 'tsconfig.json'),
  //
  babelRcJson: path.join(root, '.babelrc.json'),
};

const isBabelRcJsonExisted = fs.existsSync(PATH_MAP.babelRcJson);
const babelRcJson = isBabelRcJsonExisted ? require(PATH_MAP.babelRcJson) : require('../utils/.babelrc.json');
babelRcJson.push(path.join(__dirname, '../utils/babel-transform-less-to-css'))

const clonedBabelRcJson = cloneDeep(babelRcJson);
clonedBabelRcJson.plugins.push('@babel/plugin-transform-modules-commonjs');

const isTsProject = fs.existsSync(PATH_MAP.tsConfig);
const tsconfig = isTsProject ? require(PATH_MAP.tsConfig) : null;

function clean() {
  console.log('=== task clean ===');
  return del(`${PATH_MAP.lib}/**`)
}

function buildStyle() {
  return gulp
    .src([`${PATH_MAP.src}/**/*.less`], {
      base: PATH_MAP.src,
      ignore: ['**/demos/**/*', '**/tests/**/*'],
    })
    .pipe(
      less({
        paths: [PATH_MAP.src],
        relativeUrls: true,
      })
    )
    .pipe(gulp.dest(`${PATH_MAP.lib}/es`))
    .pipe(gulp.dest(`${PATH_MAP.lib}/cjs`));
}

function copyAssets() {
  return gulp
    .src(`${PATH_MAP.assets}/**/*`)
    .pipe(gulp.dest(`${PATH_MAP.lib}/assets`))
    .pipe(gulp.dest(`${PATH_MAP.lib}/es/assets`))
    .pipe(gulp.dest(`${PATH_MAP.lib}/cjs/assets`));
}

function buildCJS() {
  return gulp
    .src([`${PATH_MAP.lib}/es/**/*.js`])
    .pipe(
      babel(clonedBabelRcJson)
    )
    .pipe(gulp.dest(`${PATH_MAP.lib}/cjs/`));
}

function buildES() {
  console.log('buildES');
  if (isTsProject) {
    return gulp
      .src([`${PATH_MAP.src}/**/*.{ts,tsx}`], {
        ignore: ['**/demos/**/*', '**/tests/**/*'],
      })
      .pipe(
        ts({
          ...tsconfig.compilerOptions,
          module: 'ESNext',
        })
      )
      .pipe(babel(babelRcJson))
      .pipe(gulp.dest(`${PATH_MAP.lib}/es/`));
  }

  return gulp
    .src([`${PATH_MAP.src}/**/*.{js,jsx}`], {
      ignore: ['**/demos/**/*', '**/tests/**/*'],
    })
    .pipe(babel(babelRcJson))
    .pipe(gulp.dest(`${PATH_MAP.lib}/es/`));
}

function buildDeclaration() {
  return gulp
    .src([`${PATH_MAP.src}/**/*.{ts,tsx}`], {
      ignore: ['**/demos/**/*', '**/tests/**/*'],
    })
    .pipe(
      ts({
        ...tsconfig.compilerOptions,
        module: 'ESNext',
        declaration: true,
        emitDeclarationOnly: true,
      })
    )
    .pipe(gulp.dest(`${PATH_MAP.lib}/es/`))
    .pipe(gulp.dest(`${PATH_MAP.lib}/cjs/`));
}

function umdWebpack() {
  return gulp
    .src(`${PATH_MAP.lib}/es/index.js`)
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
              'react-dom': 'ReactDOM',
            },
          ],
        },
        webpack
      )
    )
    .pipe(gulp.dest('lib/umd/'))
}

function copyMetaFiles() {
  return gulp.src([`${PATH_MAP.root}/README.md`, `${PATH_MAP.root}/LICENSE`]).pipe(gulp.dest(`${PATH_MAP.lib}/`));
}

function generatePackageJSON() {
  return gulp
    .src(`${PATH_MAP.root}/package.json`)
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
    .pipe(gulp.dest(`${PATH_MAP.lib}/`))
}

exports.umdWebpack = umdWebpack;

module.exports = function (options, cmd) {
  console.log('=== task build 2 ===');
  // node ./bin/rmk-cli.js build --watch
  // { watch: true }
  // console.log('options', options);
  // console.log('cmd', cmd);
  // console.log(chalk.cyan('PATH_MAP'), PATH_MAP);
  // console.log(chalk.cyan('src'), `${PATH_MAP.components}/**/*.js`);

  const retGulp = gulp.series(
    clean,
    buildES,
    gulp.parallel(...[buildCJS, isTsProject ? buildDeclaration : null, buildStyle].filter(Boolean)),
    copyAssets,
    copyMetaFiles,
    generatePackageJSON,
    gulp.parallel(umdWebpack)
  )();

  console.log(chalk.cyan('=== running gulp task 2 ==='));
}
