const gulp = require("gulp");

gulp.task("copy-html",function(){
  return gulp
  .src("*.html")
  .pipe(gulp.dest("dist/"))
  .pipe(connect.reload());

})
gulp.task("copy-js",function(){
  return gulp
  .src(["*.js","!gulpfile.js"])
  .pipe(gulp.dest("dist/js"))
  .pipe(connect.reload());

})

gulp.task("images",function(){
  return gulp
  .src("images/**/*")
  .pipe(gulp.dest("dist/images"))
  .pipe(connect.reload());

})

gulp.task("data",function(){
  return gulp
  .src("json/*.json")
  .pipe(gulp.dest("dist/data"))
  .pipe(connect.reload());

})

gulp.task("javascript",function(){
return gulp
.src(["javascript/*.js", "!gulpfile.js"])
.pipe(gulp.dest("dist/js"))
.pipe(connect.reload());

})

gulp.task("build",["images","data",],function(){
  console.log("运行结束")
})
 
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const rename = require("gulp-rename");
const minifyCSS = require("gulp-minify-css");
 
gulp.task("sass",function(){
  return gulp
    .src("./scss/Homepage.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("Homepage.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("sass1",function(){
  return gulp
    .src("./scss/goodsdetails.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("goodsdetails.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("sass2",function(){
  return gulp
    .src("./scss/login.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("login.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("sass3",function(){
  return gulp
    .src("./scss/register.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("register.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("sass4",function(){
  return gulp
    .src("./scss/order.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("order.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
 
//监听
gulp.task("watch", function () {
  gulp.watch("*.html", ["copy-html"]);
  gulp.watch("images/**/*", ["images"]);
  gulp.watch("json/*.json", ["data"]);
  gulp.watch("./scss/Homepage.scss", ["sass"]);
  gulp.watch("./scss/goodsdetails.scss", ["sass1"]);
  gulp.watch("./scss/login.scss", ["sass2"]);
  gulp.watch("./scss/register.scss", ["sass3"]);
  gulp.watch("./scss/order.scss", ["sass4"]);
  gulp.watch(["javascript/*.js", "!gulpfile.js"], ["javascript"]);
  gulp.watch(["*.js","!gulpfile.js"],["copy-js"])
});

//服务器
const connect = require("gulp-connect");
gulp.task("server", function () {
  connect.server({
    root: "dist",
    port: 4487,
    livereload: true, //实时更新
  });
});

//最后同时启动服务和监听  对默认任务来说，可以直接通过 gulp来启动
gulp.task("default", ["watch", "server"]);

//热更新。