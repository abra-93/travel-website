const browserSync = require("browser-sync");
const { src } = require("gulp");

const project = "./dist";
const source = "./src";

const path = {
  build: {
    html: project + "/",
    css: project + "/css/",
    js: project + "/js/",
    img: project + "/img/",
    fonts: project + "/fonts/",
  },
  src: {
    html: [source + "/*.html", "!" + source + "/_*.html"],
    css: source + "/style/style.scss",
    js: source + "/js/script.js",
    img: source + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source + "/fonts/*.ttf",
  },
  watch: {
    html: source + "/**/*.html",
    css: source + "/style/**/*.scss",
    js: source + "/js/**/*.js",
    img: source + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
  },
  clean: project,
};

const gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  fileinclude = require("gulp-file-include"),
  del = require("del"),
  scss = require("gulp-sass")(require("sass")),
  autoprefixer = require("gulp-autoprefixer"),
  gcmq = require("gulp-group-css-media-queries"),
  cssnano = require("gulp-cssnano"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify-es").default,
  ttf2woff = require("gulp-ttf2woff"),
  ttf2woff2 = require("gulp-ttf2woff2"),
  imgmin = require("gulp-imagemin");

function localServer() {
  browsersync.init({
    server: {
      baseDir: project + "/",
    },
    post: 5000,
    notify: false,
  });
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(gulp.dest(path.build.html))
    .pipe(browsersync.stream());
}
function css() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: "expanded",
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 version"],
        cascade: true,
      })
    )
    .pipe(gcmq())
    .pipe(cssnano())
    .pipe(gulp.dest(path.build.css))
    .pipe(browsersync.stream());
}

function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(browsersync.stream());
}
function fonts() {
  src(path.src.fonts).pipe(ttf2woff()).pipe(gulp.dest(path.build.fonts));
  return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(gulp.dest(path.build.fonts));
}
function image() {
  return src(path.src.img).pipe(imgmin()).pipe(gulp.dest(path.build.img));
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
}

function clean() {
  return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(image, js, css, html, fonts));
let watch = gulp.parallel(build, watchFiles, localServer);

exports.fonts = fonts;
exports.image = image;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
