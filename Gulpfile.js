var gulp = require('gulp');
var derequire = require('gulp-derequire');
var webpackStream = require('webpack-stream');
var babel = require('gulp-babel');
var flatten = require('gulp-flatten');
var rename = require('gulp-rename');
var less = require('gulp-less');
var runSequence = require('run-sequence');
var cleanCSS = require('gulp-clean-css');
var del = require('del');


var buildDist = function(opts) {
    var webpackOpts = require('./webpack.config.js');
    if(opts.filename) {
        webpackOpts.output.filename = opts.filename;
    }

    webpackOpts.plugins.push(new webpackStream.webpack.optimize.OccurenceOrderPlugin());
    webpackOpts.plugins.push(new webpackStream.webpack.optimize.DedupePlugin());

    if (!opts.debug) {
        webpackOpts.plugins.push(
            new webpackStream.webpack.optimize.UglifyJsPlugin({
                compress: {
                    hoist_vars: true,
                    screw_ie8: true,
                    warnings: false
                }
            })
        );
    }
    return webpackStream(webpackOpts, null, function(err, stats) {
        if (err) {
            throw new gulpUtil.PluginError('webpack', err);
        }
        if (stats.compilation.errors.length) {
            gulpUtil.log('webpack', '\n' + stats.toString({colors: true}));
        }
    });
};

String.prototype.toCamelCase = function() {
    var str = this.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
    });
    var f = str.charAt(0)
        .toUpperCase();
    return f + str.substr(1);
};

gulp.task('clean', function() {
  return del(['dist', 'lib']);
});

gulp.task('modules', function() {
    return gulp.src('src/**/*.{js,jsx}')
            .pipe(babel())
            .pipe(rename(function (path) {
                path.basename = path.basename.toCamelCase();
            }))
            .pipe(gulp.dest('lib'));
})

gulp.task('dist', ['modules'], function() {
    var opts = {
        debug: true,
        filename: 'Bundle.js'
    };
    return gulp.src('./lib/Bundle.js')
        .pipe(buildDist(opts))
        .pipe(derequire())
        .pipe(gulp.dest('dist'));
});

gulp.task('dist:min', ['modules'], function() {
  var opts = {
    debug: false,
    filename: 'Bundle.min.js',
  };
  return gulp.src('./lib/Bundle.js')
    .pipe(buildDist(opts))
    .pipe(gulp.dest('dist'));
});

gulp.task('less', function () {
  return gulp.src('./src/less/**/main.less')
    .pipe(less())
    .pipe(gulp.dest('./dist'));
});

gulp.task('less:min', function () {
  return gulp.src('./src/less/**/main.less')
    .pipe(less())
    .pipe(cleanCSS({compatibility: '*'}))
    .pipe(rename(function (path) {
        path.basename = path.basename + ".min";
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', function(cb) {
  runSequence('clean', 'modules', 'less', 'less:min', 'dist', 'dist:min', cb);
});
