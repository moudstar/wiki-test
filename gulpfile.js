var gulp = require( 'gulp' ),
  // Requires the gulp-sass plugin
  sass = require( 'gulp-sass' ),
  // Allows globbing
  sassGlob = require('gulp-sass-glob'),
  // requires gulp-useref for css & js concatenates
  useref = require( 'gulp-useref' ),
  // requires gulp-uglify for minifying
  uglify = require( 'gulp-uglify' ),
  // requires gulp-cssnano to minify css
  cssnano = require( 'gulp-cssnano' ),
  // require gulpIf to conditionally
  gulpIf = require( 'gulp-if' ),
  // require gulp-connect for web server
  connect = require( 'gulp-connect' ),
  // better error displaying
  util = require( 'gulp-util' );

gulp.task( 'sass', function() {
  return gulp.src( './app/scss/**/*.scss' )
    .pipe(sassGlob())
    .pipe( sass() ) // Using gulp-sass
    .pipe( gulp.dest ( 'app/css' ) )
    .on('error', util.log);
});

gulp.task( 'useref', function(){
  return gulp.src( 'app/*.html' )
    .pipe( useref() )
    .pipe( gulpIf( '*.js', uglify() ))
    // Minifies only if it's a CSS file
    .pipe( gulpIf ( '*.css', cssnano() ))
    .pipe( gulp.dest ( 'dist' ))
    .on('error', util.log);
});

gulp.task( 'webserver', function () {
  connect.server();
});

gulp.task( 'watch', function () {
  gulp.watch( 'app/scss/**/*.scss', ['sass'] );
  // Other watchers
});

gulp.task( 'build', [`sass`, `useref`], function () {
});

gulp.task( 'default', [ 'webserver', 'watch', 'build' ] );
