'use strict';

(function() {
  var Gallery = function() {
    this._galleryContainer = document.querySelector('.gallery-overlay');
    this._image = this._galleryContainer.querySelector('.gallery-overlay-image');

    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
  };

  Gallery.prototype.show = function() {
    this._galleryContainer.classList.remove('invisible');
    document.addEventListener('keydown', this._onDocumentKeyDown);
    this._image.addEventListener('click', this._onPhotoClick);
  };

  Gallery.prototype.hide = function() {
    this._galleryContainer.classList.add('invisible');
    document.removeEventListener('keydown', this._onDocumentKeyDown);
    this._image.removeEventListener('click', this._onPhotoClick);
  };

  Gallery.prototype._onPhotoClick = function() {
    console.log('works');
  };

  Gallery.prototype._onDocumentKeyDown = function(evt) {
    if (evt.keyCode === 27) {
      this.hide();
    }
  };

  window.Gallery = Gallery;
})();
