var gulp = require('gulp');   // gulp
var rename = require('gulp-rename'); //重命名  
var concat = require('gulp-concat'); //合并文件
var babel = require("gulp-babel");  // gulp babel 转码
var uglify = require('gulp-uglify'); // js 压缩
var sass = require('gulp-sass');  // sass
var minifycss = require('gulp-minify-css'); // css压缩
var imagemin = require('gulp-imagemin'); //图片压缩

// js的操作
gulp.task('script', function() {
    gulp.src('./public/js/*.js')
    .pipe(babel({  
            presets: ['es2015']  
        }))							//es6转es5
    .pipe(concat('main.js'))        // 合并    
    .pipe(uglify())                 // 压缩
    .pipe(rename({suffix:'.min'}))  //重命名
    .pipe(gulp.dest('./public/dist'));  // 写入到指定目录
});


// css的操作
gulp.task('css', function() {
    gulp.src('./public/scss/*.scss')
    .pipe(sass())                      //转化sass
    .pipe(concat('main.css'))        // 合并    
    .pipe(minifycss())                 // 压缩
    .pipe(rename({suffix:'.min'}))  //重命名
    .pipe(gulp.dest('./public/dist'));  // 写入到指定目录
});

// img的操作
gulp.task('image', function () {
    gulp.src('./public/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('./public/dist'));
});


//默认执行的任务
gulp.task('default', ['css','script','image']);

// 监听变化时执行的任务
gulp.task('watch',function(){
    gulp.watch('./public/scss/*.scss',['css']);    //监听sass变化并自动执行css任务
    gulp.watch('./public/js/*.js',['script']);     //监听js变化并自动执行script任务
})