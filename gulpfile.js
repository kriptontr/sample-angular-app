/**
 * Created by kript on 14/10/2016.
 */
var gulp = require('gulp');
var inject = require('gulp-inject');

var jsonServer = require("./tasks/json-server");
var pathsObj = require("./tasks/compile");

gulp.task("start",['app','vendor','html','inject-dist','json-server'],function () {
 //   gulp.run('inject-dist')
})


gulp.task('index', function () {
    var target = gulp.src('./src/index.html');
    console.log("Should check inject order ar index.html module bundler/loader is necessary")
    var sources = gulp.src( pathsObj.vendor.concat(pathsObj.appfiles), {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./src'));
});