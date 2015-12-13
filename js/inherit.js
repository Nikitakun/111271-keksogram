'use strict';

(function() {
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
  console.log(inherit); // Использование переменной, чтоб не ругался ESLint
})();
