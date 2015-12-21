/* global define: true */

'use strict';

define(function() {
  /**
  * @constructor
  */
  var PhotoBase = function() {};

  PhotoBase.prototype._data = null;

  PhotoBase.prototype.show = function() {};

  PhotoBase.prototype.hide = function() {};

  /**
  * @param {Object} data
  */
  PhotoBase.prototype.setData = function(data) {
    this._data = data;
  };

  /**
  * @return {Object}
  */
  PhotoBase.prototype.getData = function() {
    return this._data;
  };

  return PhotoBase;
});
