var fs = require('fs');
var mkdirp = require('mkdirp');
var browserify = require('browserify');
var babelify = require('babelify');
var path = require('path');
var glob = require('glob');
var quailLibFilesPath = __dirname + '/../src/core/**/*.js';
var quailComponentFilesPath = __dirname + '/../src/js/**/*.js';
var quailAssessmentFilesPath = __dirname + '/../src/assessments/**/*.js';
// Gather the spec files and add them to the Mocha run.
glob(quailLibFilesPath, function (error, coreFiles) {
  if (error) {
    process.exit(1);
  }
  glob(quailComponentFilesPath, function (error, componentFiles) {
    if (error) {
      process.exit(1);
    }
    glob(quailAssessmentFilesPath, function (error, assessmentFiles) {
      if (error) {
        process.exit(1);
      }
      mkdirp('dist', function (err) {
        if (err) {
          console.log(err);
        }
        else {
          browserify({
            entries: []
              .concat(coreFiles)
              .concat(componentFiles)
              .concat(assessmentFiles),
            paths: [
              './config/',
              './src/core/',
              './src/core/lib',
              './src/js/',
              './src/js/components/',
              './src/js/strings/',
              './src/assessments/',
              './vendor/',
            ],
            options: {
              debug: false
            }
          })
            .add('./config/AllTests.js')
            .transform(babelify)
            .bundle()
            .on('error', function (err) {
              console.log('Error : ' + err.message);
            })
            .pipe(fs.createWriteStream('dist/bundle.js'));
        }
      });
    });
  });
});
