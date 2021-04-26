const production = ( process.env.NODE_ENV == 'production' );
const var_dump = require('var_dump');
const debug = require('gulp-debug');
//base part
let {src, dest, parallel, series, watch} = require('gulp'),
    rename  = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload');

//css part
let sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer');

const babel = require('gulp-babel'),
    uglify = require('gulp-terser'),
    include = require("gulp-include");

var removeEmptyLines = require('gulp-remove-empty-lines');

var gulp = require('gulp');
var responsive = require('gulp-responsive');

let pathFiles = {
    build: {
        css: './assets/css/',
        js: './assets/js/'
    },
    src: {
        css: './assets/scss/**/*.scss',
        js: './assets/js/src/**/*.js'
    }
};

function swallowError(error){
    console.log(error.toString());
    this.emit('end');
}

function styles() {
    return src('./assets/scss/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .on('error', swallowError)
        .pipe(autoprefixer())
        .pipe(cleanCSS({level: {1: {specialComments: false}}}))
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(pathFiles.build.css))
        .pipe(livereload());
}

function scripts() {
    return src('./assets/js/src/script.js')
        .pipe(include())
        .pipe(rename('script.min.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .on('error', swallowError)
        .pipe(sourcemaps.init())
        // .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(dest(pathFiles.build.js))
        .pipe(livereload());
        
}
// var html_path = ['./templates/*.html', './templates/modules/*.html'];
function html(){
    return src(['./templates/*.html','./templates/*.svg'], {removeBOM:true})
        .pipe(include({ hardFail: true }))
        .pipe(removeEmptyLines())
        .pipe(dest('./'))
        .pipe(livereload());
}

function contentImages(path, stats){
    return gulp
    .src(['./src-images/16:9/*.{png,jpg,jpeg}'])
    .pipe(debug({title: 'unicorn:'}))
    .pipe(
        responsive(
            {
                '*.{png,jpg,jpeg}': [
                    {
                        width: 1920,
                        height: 1080,
                        format: 'webp',
                        rename: { suffix: '-1920x1080' }
                    },
                    {
                        width: 960,
                        height: 540,
                        format: 'webp',
                        rename: { suffix: '-960x540' }
                    },
                    {
                        width: 1920,
                        height: 1080,
                        format: 'jpg',
                        rename: { suffix: '-1920x1080' }
                    },
                    {
                        width: 960,
                        height: 540,
                        format: 'jpg',
                        rename: { suffix: '-960x540' }
                    },
                ]
            },
            {
                quality: 50,
            }
        )
      )
      .pipe(gulp.dest('./dest-images/'))
}


// var imgWatcher = watch( ['./src-images/16:9/*.{png,jpg,jpeg}'] );
// imgWatcher.on([ 'add','change','unlink' ], function(path, stats) {
//     var_dump(`File ${path} was changed`);
//   }); 



function gulpWatch(done) {
    livereload.listen();
    watch(pathFiles.src.css, styles);
    watch(pathFiles.src.js, scripts);
    watch(['./templates/*.html','./templates/modules/*.html'], html);
    watch( ['./src-images/16:9/*.{png,jpg,jpeg}'], contentImages );
    done();
}


exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.contentImages = contentImages;
exports.gulpWatch = gulpWatch;

// exports.build = series(styles, scripts, html);
// exports.default = series(styles, scripts, gulpWatch);

exports.build = series(styles, scripts, html, contentImages);
exports.default = series(styles, scripts, html, contentImages, gulpWatch);