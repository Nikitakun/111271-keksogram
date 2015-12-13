/* global pictures: true */

'use strict';

(function() {
  var filterBlock = document.querySelector('.filters');

  function hideFilters() {
    if (!filterBlock.classList.contains('hidden')) {
      filterBlock.classList.add('hidden');
    }
  }
  hideFilters();

  function processTemplate(data) {
    var template = document.querySelector('#picture-template');
    var container = template.content.children[0].cloneNode(true);

    container.querySelector('.picture-comments').textContent = data.comments;
    container.querySelector('.picture-likes').textContent = data.likes;

    var image = new Image(182, 182);

    image.onload = function() {
      container.replaceChild(image, container.querySelector('img'));
    };

    image.onerror = function() {
      container.classList.add('picture-load-failure');
    };

    image.src = data.url;

    return container;
  }

  pictures.forEach(function(pictureData) {
    var elementToAppend = processTemplate(pictureData);
    document.querySelector('.pictures').appendChild(elementToAppend);
  });

  function showFilters() {
    if (filterBlock.classList.contains('hidden')) {
      filterBlock.classList.remove('hidden');
    }
  }
  showFilters();
})();
