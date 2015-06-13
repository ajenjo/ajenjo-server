/**
 * gulpstack hook
 */

var gulp  = require("gulp");
var stack = require("gulpstack");

module.exports = function (sails) {


  return {

    initialize: function (next) {
      // sails.log.info("Star de compilation of Gulpstack");

      // sails.log.info("the pash base PWD is ", process.cwd());

      stack(gulp, {

        src:  sails.config.gulpstack.pathAssets || "assets/",
        dest: sails.config.gulpstack.pathPublic || ".tmp/public/",

        // Disable the task jade.
        tasks: {
          jade: false,
          connect: false,
        },

        scripts: sails.config.gulpstack.concatScript || [],
        styles:  sails.config.gulpstack.concatstyles || [],

      });


      try {
        gulp.task("runNext", function () {
          next();
        });

        tasksToRun = [];

        if (sails.config.environment === "development") {
          tasksToRun = [
            "init",
            "debug",
            "watch",
          ];
        } else {
          tasksToRun = [
            "init",
            "debug",
          ];
        }

        gulp.run(tasksToRun);
      } catch (err) {
        sails.log.error("Error to run GULP: ", err);
      }

      return next();
    }
  };
};
