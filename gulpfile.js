const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const minifycss = require('gulp-minify-css');
const rename = require("gulp-rename");
const autoprefix = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

const config = {

   	server: {

       baseDir: "./build"

   	},

   	tunnel: false,

   	host: 'localhost',

   	port: 8080

};

function htmlBuild() {

	return gulp.src('src/html/pages/*.pug')
		.pipe(pug({pretty: true}))
		.pipe(gulp.dest('build/'));

}

function jsBuild() {
	return gulp.src(['src/js/bootstrap.bundle.min.js', 'src/js/owl.carousel.min.js', 'src/js/dropzone.min.js', 'src/js/scripts.js'])
        .pipe(concat('all-scripts.js'))
           .pipe(gulp.dest('build/js/'));
}

function imgBuild() {
	return gulp.src('src/img/*')

		   .pipe(imagemin([
               imagemin.mozjpeg({quality: 80, progressive: true})
		   ]))

           .pipe(gulp.dest('build/img/'));
}

function fontsBuild() {
  return gulp.src('src/fonts/*')

           .pipe(gulp.dest('build/fonts/'));
}

gulp.task('css', function() {

    return gulp.src('src/scss/*.scss')

        .pipe(sourcemaps.init())

       .pipe(sass().on('error', sass.logError))

       .pipe(autoprefix({

         cascade: false

       }))

       .pipe(minifycss({processImport: false}))

		.pipe(sourcemaps.write())

       .pipe(rename({suffix: '.min'}))

       .pipe(gulp.dest('build/css/'))

       .pipe(browserSync.stream());

});

gulp.task('clearBuild', function() {

	return del(['build/*'])

});

gulp.task('watch', function() {

	browserSync.init(config);

	gulp.watch('src/scss/**/*.scss', gulp.series('css'));

	gulp.watch('src/scss/*.scss', gulp.series('css'));

	gulp.watch('src/js/*.js', gulp.parallel(jsBuild));

  gulp.watch('src/html/components/*.pug',  gulp.parallel(htmlBuild, imgBuild)).on('change', browserSync.reload);

	gulp.watch('src/html/pages/*.pug',  gulp.parallel(htmlBuild, imgBuild)).on('change', browserSync.reload);

});

gulp.task('build', 

	gulp.series(
		'clearBuild',
		gulp.parallel(htmlBuild, imgBuild, fontsBuild, jsBuild, 'css')
	)

);

gulp.task('default', gulp.series('build', 'watch'));