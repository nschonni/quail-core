var ContainsReadableTextComponent = require('ContainsReadableTextComponent');
var $ = require('jquery/dist/jquery');
var LabelComponent = function (test, options) {
  var $scope = test.get('$scope');
  $scope.each(function () {
    var $local = $(this);
    $local.find(options.selector).each(function () {
      if ((!$(this).parent('label').length ||
        !$local.find('label[for=' + $(this).attr('id') + ']').length ||
          !ContainsReadableTextComponent($(this).parent('label'))) &&
          (!ContainsReadableTextComponent($local.find('label[for=' + $(this).attr('id') + ']')))) {
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
    });
  });
};
module.exports = LabelComponent;
