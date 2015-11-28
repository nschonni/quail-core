const Case = require('Case');
var HeadingLevelComponent = function (test, options) {
  var priorLevel = false;
  test.get('$scope').find(':header').each(function () {
    var level = parseInt($(this).get(0).tagName.substr(-1, 1), 10);
    if (priorLevel === options.headingLevel && level > priorLevel + 1) {
      test.add(Case({
        element: this,
        status: 'failed'
      }));
    }
    else {
      test.add(Case({
        element: this,
        status: 'passed'
      }));
    }
    priorLevel = level;
  });
};
module.exports = HeadingLevelComponent;
