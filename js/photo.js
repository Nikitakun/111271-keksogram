/* global define: true */

'use strict';

define([
  'photo-base',
  'inherit'
], function(PhotoBase, inherit) {
  /**
  * Конструктор для создания списка фотографий
  * @constructor
  * @extends {PhotoBase}
  */
  var Photo = function() {
    this._onClick = this._onClick.bind(this);
  };

  inherit(Photo, PhotoBase);

/**
* Создает список фотографий по шаблону
* @override
*/
  Photo.prototype.show = function() {
    var template = document.querySelector('#picture-template');
    this.container = template.content.children[0].cloneNode(true);

    this.container.querySelector('.picture-comments').textContent = this.getData().getCommentsInfo();
    this.container.querySelector('.picture-likes').textContent = this.getData().getLikesInfo();

    var image = new Image(182, 182);

    image.onload = function() {
      this.container.replaceChild(image, this.container.querySelector('img'));
    }.bind(this);

    image.onerror = function() {
      this.container.classList.add('picture-load-failure');
    }.bind(this);

    if (this.getData().getPreviewInfo()) {
      image.src = this.getData().getPreviewInfo();
    } else {
      image.src = this.getData().getSourceInfo();
    }

    this.container.addEventListener('click', this._onClick);
  };

  /**
  * Удаляет обработчик события (нужно при клике на фильтр)
  * @override
  */
  Photo.prototype.hide = function() {
    this.container.removeEventListener('click', this._onClick);
  };

  /**
  * @override
  */
  Photo.prototype._onClick = function(evt) {
    evt.preventDefault();
    if (evt.target.tagName === 'IMG' && !this.container.classList.contains('picture-load-failure')) {
      if (typeof this.onClick === 'function') {
        this.onClick();
      }
    }
  };

  return Photo;
});
