/**
 * Created by kript on 28/10/2016.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var base = require('gulp-base');

var scripts = './src/**/*.js';
var vendor = ["./bower_components/angular/angular.js",
    "./bower_components/angular-resource/angular-resource.js",
    "./bower_components/angular-ui-router/release/angular-ui-router.js",
    "./bower_components/angular-cookies/angular-cookies.js"];

var appfiles = [
    "src/core/core.module.js",
    "src/core/core.services.js",
    "src/user/userEditor/userEditor.module.js",
    "src/user/userEditor/userEditor.config.js",
    "src/user/userEditor/userEditor.controller.js",
    "src/user/userEditor/userEditor.services.js",
    "src/user/userList/userlist.module.js",
    "src/user/userList/userlist.config.js",
    "src/user/userList/userlist.controller.js",
    "src/user/userList/userlist.services.js",
    "src/user/user.module.js",
    "src/user/user.config.js",
    "src/main.module.js",
    "src/main.config.js",
]


gulp.task("app", function () {
    return gulp.src(appfiles)
        .pipe(concat('app.js'))
        .pipe(gulp.dest("dist"))
       .pipe(uglify({mangle:false}))
        .pipe(gulp.dest("dist"))

});


gulp.task("vendor", function () {
    return gulp.src(vendor)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest("dist"))
        .pipe(uglify({mangle:false}))
        .pipe(gulp.dest("dist"))

});

gulp.task("html", function () {
    return gulp.src("./src/**/*.html")
        .pipe(gulp.dest("dist"))
})

gulp.task('inject-dist', function () {

    return gulp.src("./dist/index.html")


    .pipe(inject(gulp.src(['./dist/vendor.js', './dist/app.js']),{ignorePath: 'dist'}))

        .pipe(gulp.dest("./dist/"))
});

module.exports = {vendor:vendor,appfiles:appfiles}