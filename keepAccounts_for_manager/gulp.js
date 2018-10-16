var gulp = require('gulp');   // gulp
var rename = require('gulp-rename'); //重命名  
var concat = require('gulp-concat'); //合并文件
var babel = require('gulp-babel');  // gulp babel 转码
var uglify = require('gulp-uglify'); // js 压缩
var sass = require('gulp-sass');  // sass
var minifycss = require('gulp-clean-css'); // css压缩
var autoprefixer = require('gulp-autoprefixer'); //css自动添加兼容前缀
var htmlminify = require('gulp-html-minify'); // html压缩
var imagemin = require('gulp-imagemin'); //图片压缩
var webserver = require('gulp-webserver'); //开启服务

// js的操作
gulp.task('pcJs', function() {
    gulp.src('./src/pc/js/*.js')
    .pipe(babel({  
        presets: ['env']  
    }))             //es6转es5
    .pipe(concat('main.js'))        // 合并    
    .pipe(uglify())                 // 压缩
    .pipe(rename({suffix:'.min'}))  //重命名
    .pipe(gulp.dest('./dist/pc'))   // 写入到指定目录
    .pipe(gulp.dest('./src/pc'));  // 写入到指定目录
});

// css的操作
gulp.task('pcCss', function() {
    gulp.src('./src/pc/scss/*.scss')
    .pipe(sass())                      //转化sass
    .pipe(concat('main.css'))        // 合并    
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],     // 浏览器版本
        cascade:true,                      // 美化属性，默认true
        add: true,                         // 是否添加前缀，默认true
        remove: true,                      // 删除过时前缀，默认true
        flexbox: true,                     // 为flexbox属性添加前缀，默认true
    }))
    .pipe(minifycss())                 // 压缩
    .pipe(rename({suffix:'.min'}))  //重命名
    .pipe(gulp.dest('./dist/pc'))  // 写入到指定目录
    .pipe(gulp.dest('./src/pc'));  // 写入到指定目录
});

// html的操作
gulp.task('pcHtml', function() {
    gulp.src('./src/pc/*.html')
    .pipe(htmlminify())           //压缩HTML
    .pipe(gulp.dest('./dist/pc'));  // 写入到指定目录
});

// img的操作
gulp.task('pcImg', function () {
    gulp.src('./src/pc/img/*.{png,jpg,gif}')
    .pipe(imagemin({
        optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('./dist/pc/img'));
});

//拷贝静态文件到输出目录
gulp.task('pcStatic',  function() {
    gulp.src('./src/pc/static/**/*')
    .pipe(gulp.dest('./dist/pc/static'))
});



// js的操作
gulp.task('mobJs', function() {
    gulp.src('./src/mobile/js/*.js')
    .pipe(babel({  
        presets: ['env']  
    }))             //es6转es5
    .pipe(concat('main.js'))        // 合并    
    .pipe(uglify())                 // 压缩
    .pipe(rename({suffix:'.min'}))  //重命名
    .pipe(gulp.dest('./dist/mobile'))   // 写入到指定目录
    .pipe(gulp.dest('./src/mobile'));  // 写入到指定目录
});

// css的操作
gulp.task('mobCss', function() {
    gulp.src('./src/mobile/scss/*.scss')
    .pipe(sass())                      //转化sass
    .pipe(concat('main.css'))        // 合并    
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],     // 浏览器版本
        cascade:true,                      // 美化属性，默认true
        add: true,                         // 是否添加前缀，默认true
        remove: true,                      // 删除过时前缀，默认true
        flexbox: true,                     // 为flexbox属性添加前缀，默认true
    }))
    .pipe(minifycss())                 // 压缩
    .pipe(rename({suffix:'.min'}))  //重命名
    .pipe(gulp.dest('./dist/mobile'))  // 写入到指定目录
    .pipe(gulp.dest('./src/mobile'));  // 写入到指定目录
});

// html的操作
gulp.task('mobHtml', function() {
    gulp.src('./src/mobile/*.html')
    .pipe(htmlminify())           //压缩HTML
    .pipe(gulp.dest('./dist/mobile'));  // 写入到指定目录
});

// img的操作
gulp.task('mobImg', function () {
    gulp.src('./src/mobile/img/*.{png,jpg,gif}')
    .pipe(imagemin({
        optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('./dist/mobile/img'));
});

//拷贝静态文件到输出目录
gulp.task('mobStatic',  function() {
    gulp.src('./src/mobile/static/**/*')
    .pipe(gulp.dest('./dist/mobile/static'))
});

/*开启服务*/
gulp.task('webserver', function () {
  gulp.src('./')
    .pipe(webserver({
      host: '0.0.0.0', //ip地址
      port: 8000,  //端口
      livereload: true,  //f5刷新
      open: './src/pc/index.html', //启动打开文件
      directoryListing: {          //访问的路径是否显示
        enable: true,
        path: './'
      },
      proxies: [
        {
            source: '/api',
            target: 'http://192.168.20.104:8888'
        }
      ]
    }))
});



//执行任务
gulp.task('pcDef', ['pcJs','pcCss','pcHtml','pcImg','pcStatic']);
//执行任务
gulp.task('mobDef', ['mobJs','mobCss','mobHtml','mobImg','mobStatic']);

// 监听变化时执行的任务
gulp.task('watch',function(){
    gulp.watch('./src/pc/scss/*.scss',['pcCss']);    //监听sass变化并自动执行css任务
    gulp.watch('./src/pc/js/*.js',['pcJs']);     //监听js变化并自动执行script任务
    gulp.watch('./src/mobile/scss/*.scss',['mobCss']);    //监听sass变化并自动执行css任务
    gulp.watch('./src/mobile/js/*.js',['mobJs']);     //监听js变化并自动执行script任务
})

//启动服务
gulp.task('start',['webserver','watch'])

/*打包所有任务*/
gulp.task('default',['pcJs','pcCss','pcHtml','pcImg','pcStatic','mobJs','mobCss','mobHtml','mobImg','mobStatic']);
