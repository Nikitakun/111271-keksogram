/* global define: true */

'use strict';

define(function() {
  /**
  * Записывает свойства родителя в дочерний конструктор
  * @param {Constructor} child
  * @param {Constructor} parent
  */
  function inherit(child, parent) {
    var EmptyConstructor = function() {};
    EmptyConstructor.prototype = parent.prototype;
    child.prototype = new EmptyConstructor();
  }

  return inherit;
});
