var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var merge = require('merge2');
var htmlFiles = ["./test.html"];
var destPath = "dist";

function buildStuff(partName) {
    var project = ts.createProject("./src-" + partName + "/tsconfig.json");
    var tsResult = project.src()
        .pipe(sourcemaps.init())
        .pipe(project());

    var lessResult = gulp.src("./src-" + partName + "/" + partName + ".less")
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(destPath));

    return merge(
        tsResult.dts.pipe(gulp.dest(destPath)),
        tsResult
        .js
        .pipe(sourcemaps.mapSources(function(sourcePath, file) {
            return "../src-" + partName + "/" + sourcePath;
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(destPath)),
        lessResult
    );
}

gulp.task("jsonView", function() {
    return buildStuff("jsonview");
});

gulp.task("pgrid", ["jsonView"], function() {
    return buildStuff("pgrid");
});

gulp.task("default", ["jsonView", "pgrid"], function () {
    return gulp.src(htmlFiles)
        .pipe(gulp.dest(destPath));
});