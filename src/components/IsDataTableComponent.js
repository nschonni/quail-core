/**
 * Read more about this function here: https://github.com/quailjs/quail/wiki/Layout-versus-data-tables
 */
const DOM = require('DOM');
const IsDataTableComponent = function (table) {
  // If there are less than three rows, why do a table?
  if (DOM.scry('tr', table).length < 3) {
    return false;
  }
  // If you are scoping a table, it's probably not being used for layout
  if (DOM.scry('th[scope]', table).length) {
    return true;
  }
  var index;
  var numberRows = DOM.scry('tr', table)
    .filter(
      (element) => DOM.scry('td', element).length > 0
    ).length;
  // Check for odd cell spanning
  var spanCells = DOM.scry('td[rowspan], td[colspan]', table);
  var isDataTable = true;
  if (spanCells.length) {
    var spanIndex = {};
    spanCells.forEach(function (cell) {
      index = DOM.index(cell);
      if (typeof spanIndex[index] === 'undefined') {
        spanIndex[index] = 0;
      }
      spanIndex[index]++;
    });
    for (let ii in spanIndex) {
      if (spanIndex.hasOwnProperty(ii)) {
        let count = spanIndex[ii];
        if (count < numberRows) {
          isDataTable = false;
        }
      }
    }
  }
  // If there are sub tables, but not in the same column row after row, this is a layout table
  var subTables = DOM.scry('table', table);
  if (subTables.length) {
    var subTablesIndexes = {};
    subTables.forEach(function (table) {
      var td = DOM.parent(table, 'td')
      var parentIndex = DOM.index(td);
      if (parentIndex !== false && typeof subTablesIndexes[parentIndex] === 'undefined') {
        subTablesIndexes[parentIndex] = 0;
      }
      subTablesIndexes[parentIndex]++;
    });
    for (let sii in subTablesIndexes) {
      if (subTablesIndexes.hasOwnProperty(sii)) {
        let count = subTablesIndexes[sii];
        if (count < numberRows) {
          isDataTable = false;
        }
      }
    }
  }
  return isDataTable;
};

module.exports = IsDataTableComponent;
