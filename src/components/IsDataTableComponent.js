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
  var numberRows = DOM.scry('tr:has(td)', table).length;
  // Check for odd cell spanning
  var spanCells = DOM.scry('td[rowspan], td[colspan]', table);
  var isDataTable = true;
  if (spanCells.length) {
    var spanIndex = {};
    spanCells.each(function () {
      if (typeof spanIndex[$(this).index()] === 'undefined') {
        spanIndex[$(this).index()] = 0;
      }
      spanIndex[$(this).index()]++;
    });
    spanIndex.forEach(function (count, index) {
      if (count < numberRows) {
        isDataTable = false;
      }
    });
  }
  // If there are sub tables, but not in the same column row after row, this is a layout table
  var subTables = DOM.scry('table', table);
  if (subTables.length) {
    var subTablesIndexes = {};
    subTables.each(function () {
      var parentIndex = $(this).parent('td').index();
      if (parentIndex !== false && typeof subTablesIndexes[parentIndex] === 'undefined') {
        subTablesIndexes[parentIndex] = 0;
      }
      subTablesIndexes[parentIndex]++;
    });
    subTablesIndexes.forEach(function (count, index) {
      if (count < numberRows) {
        isDataTable = false;
      }
    });
  }
  return isDataTable;
};

module.exports = IsDataTableComponent;
