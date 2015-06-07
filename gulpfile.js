var gulp  = require('gulp');
var stack = require('gulpstack');



// gulp.task("default", function () {
//   console.log("Run Gulp ok");
// });

stack(gulp,{
  src: "assets/",
  dest: ".tmp/public/",
  tasks: {
    jade: false,
  },
  scripts: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/materialize/dist/js/materialize.js',
    ],
  styles: [
    ],
  });


gulp.task('default', ['watch']);

if (!module.parent) {
  gulp.run();
};
