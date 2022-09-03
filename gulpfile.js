const { src, dest, watch, series, parallel } = require("gulp");

// CSS - SASS
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");

// Imagenes

const squoosh = require("gulp-libsquoosh");

function css(done) {
  // Identificar archivo - Compilar - Guardar el .css
  src("src/scss/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css"));

  done();
}

function imagenes() {
  return src("src/img/**/*").pipe(squoosh()).pipe(dest("build/img"));
}

function wpa() {
  return src("src/img/**/*.{png}")
    .pipe(
      squoosh({
        webp: {},
        avif: {},
      })
    )
    .pipe(dest("build/img"));
}

function dev() {
  watch("src/scss/**/*.scss", css);
  watch("src/img/**/*", imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.wpa = wpa;
exports.default = series(imagenes, wpa, css, dev);

// series - one then other
// parallel - at the same time
