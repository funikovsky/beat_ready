const {src, dest, task, series, watch, parallel} = require("gulp");

const rm = require("gulp-rm");
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const { stream } = require("browser-sync");
const browserSync = require('browser-sync').create();
const reload = browserSync.reload
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;



task("clean", () => {
    console.log(env)
    return src("dist/**/*", { read: false }).pipe( rm());
});

task("copy:html", () => {
    return src("src/*.html")
    .pipe(dest('dist'))
    .pipe(reload({stream: true}));

});
task("copy:png", () => {
    return src("src/img/*.*")
    .pipe(dest('dist/img'))
    

});


const styles = [
    "node_modules/normalize.css/normalize.css",
    "./src/css/main.scss"
]

task("styles", () => {
    return src(styles)
        .pipe(gulpif(env == "dev", sourcemaps.init()))
        .pipe(concat("main.scss"))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        //.pipe(px2rem())
        .pipe(gulpif(env == "dev",
            autoprefixer({
            
                cascade: false
    
            })

            )
            
        )
        //.pipe(gcmq())
        .pipe(gulpif(env == "prod", cleanCSS()))
        
        .pipe(gulpif(env == "dev", sourcemaps.write()))
        .pipe(dest('dist'))
        .pipe(reload({stream: true}));
        

});

task("scripts", () => {
    return src("src/js/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest("dist"))
        .pipe(reload({stream: true}));
})

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});

task("watch", () => {
    watch("./src/css/**/*.scss", series("styles"));
    watch("./src/*.html", series("copy:html"));
    watch(".src/js/*.js", series("scripts"));
});



task(
    "default",
    series(
         "clean",
         parallel("copy:html", "styles","scripts","copy:png"),
         parallel("watch", "server")
    )
);
task(
    "build",
    series(
         "clean",
         parallel("copy:html", "styles","scripts","copy:png")
    )
);