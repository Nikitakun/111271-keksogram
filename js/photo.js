'use strict';

(function() {
  var Photo = function(data) {
    this._data = data;
  };

  Photo.prototype.render = function() {
    var template = document.querySelector('#picture-template');
    this.container = template.content.children[0].cloneNode(true);

    this.container.querySelector('.picture-comments').textContent = this._data.comments;
    this.container.querySelector('.picture-likes').textContent = this._data.likes;

    var image = new Image(182, 182);

    image.onload = function() {
      this.container.replaceChild(image, this.container.querySelector('img'));
    }.bind(this);

    image.onerror = function() {
      this.container.classList.add('picture-load-failure');
    }.bind(this);

    image.src = this._data.url;
  };

  window.Photo = Photo;
})();
