const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack-stream");
const browserSync = require("browser-sync").create();

gulp.task("css", () => {
  return gulp
    .src(["source/sass/style.scss"])
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer]))
    .pipe(gulp.dest("source/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", () => {
  return gulp
    .src(["source/es6/main.js"])
    .pipe(
      webpack({
        mode: "development",
        output: {
          filename: "script.js"
        },
        watch: false,
        devtool: "source-map",
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        debug: true,
                        corejs: 3,
                        useBuiltIns: "usage"
                      }
                    ]
                  ]
                }
              }
            }
          ]
        }
      })
    )
    .pipe(gulp.dest("source/js"))
    .on("end", browserSync.reload);
});

gulp.task("serve", () => {
  browserSync.init({
    server: "./source",
    notify: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/es6/**/*.js", gulp.series("js"));
  gulp.watch("source/*.html").on("change", browserSync.reload);
});

gulp.task("start", gulp.series("css", "js", "serve"));
