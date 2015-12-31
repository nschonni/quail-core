/**
 *  Returns text contents for nodes depending on their semantics
 */
const DOM = require('DOM');
const getTextContentsComponent = function ($element) {
  if (DOM.is($element, 'p, pre, blockquote, ol, ul, li, dl, dt, dd, figure, figcaption')) {
    return $element.text();
  }
  // Loop through all text nodes to get everything around children.
  var text = '';
  var children = $element[0].childNodes;
  for (var i = 0, il = children.length; i < il; i += 1) {
    // Only text nodes.
    if (children[i].nodeType === 3) {
      text += children[i].nodeValue;
    }
  }
  return text;
}

module.exports = getTextContentsComponent;
