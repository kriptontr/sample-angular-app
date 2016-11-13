/**
 * Created by kript on 26/10/2016.
 */
var gulp = require('gulp');
var jsonServer = require("gulp-json-srv");

var server = jsonServer.create({
    port: 25000,
    id:   'id',
    // baseUrl: '/api',

    debug:true,
    // rewriteRules: {
    //     '/': '/api/',
    //     '/blog/:resource/:id/show': '/api/:resource/:id'
    // },

    static: './dist'
    // cumulative: true,
    // cumulativeSession: false
});

gulp.task("json-server", function(){
    return gulp.src("./db.json")
        .pipe(server.pipe());
});

