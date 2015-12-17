/* global PhotoPreview: true, inherit: true */

'use strict';

(function() {
  /**
  * Конструктор для создания галереи
  * @constructor
  * @extends {PhotoPreview}
  */
  var Gallery = function() {
    this._galleryContainer = document.querySelector('.gallery-overlay');
    this._image = this._galleryContainer.querySelector('.gallery-overlay-image');
    this._video = document.createElement('video');
    this._likes = this._galleryContainer.querySelector('.likes-count');
    this._comment = this._galleryContainer.querySelector('.comments-count');
    this._likesButton = this._galleryContainer.querySelector('.gallery-overlay-controls-like');
    this._closeButton = this._galleryContainer.querySelector('.gallery-overlay-close');

    this._currentPicture = 0;
    this._liked = false;

    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    this._onPhotoClick = this._onPhotoClick.bind(this);
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onLikeClick = this._onLikeClick.bind(this);
    this._onVideoClick = this._onVideoClick.bind(this);
  };

  inherit(Gallery, PhotoPreview);

  /**
  * Записывает массив данных в переменную
  * @param {Array} data
  */
  Gallery.prototype.setPictures = function(pictures) {
    this._data = pictures;
  };

  /**
  * @private
  * @override
  */
  Gallery.prototype._onPhotoClick = function() {
    if (this._currentPicture <= this._data.length - 2) {
      this.setCurrentPicture(++this._currentPicture);
      if (!this._data[this._currentPicture].liked && this._likes.classList.contains('likes-count-liked')) {
        this._likes.classList.remove('likes-count-liked');
      }
    } else {
      this.hide();
    }
  };

  /**
  * @private
  * @override
  */
  Gallery.prototype._onVideoClick = function() {
    if (!this._video.paused) {
      this._video.pause();
    } else {
      this._video.play();
    }
  };

  /**
  * Замещает видео-элемент фотографией
  * @override
  */
  Gallery.prototype.removeVideo = function() {
    if (this._galleryContainer.querySelector('video')) {
      this._galleryContainer.querySelector('.gallery-overlay-preview').replaceChild(this._image, this._video);
    }
  };

  /**
  * @private
  * @override
  */
  Gallery.prototype._onLikeClick = function() {
    if (this._data[this._currentPicture].liked) {
      this._data[this._currentPicture].liked = false;
      this._likes.textContent = this._likes.textContent - 1 + '';
      this._data[this._currentPicture].setLikes(this._likes.textContent);
      this._likes.classList.remove('likes-count-liked');
    } else {
      this._data[this._currentPicture].liked = true;
      this._likes.textContent = +this._likes.textContent + 1 + '';
      this._likes.classList.add('likes-count-liked');
      this._data[this._currentPicture].setLikes(this._likes.textContent);
    }
  };

  /**
  * Исчезновение галереи при нажатии на escape, либо переключение фотографий/видео при нажатии на стрелочки
  * @private
  * @override
  */
  Gallery.prototype._onDocumentKeyDown = function(evt) {
    if (evt.keyCode === 27) {
      this.hide();
    }
    if (evt.keyCode === 37 && this._currentPicture > 0) {
      this.removeVideo();
      this.setCurrentPicture(--this._currentPicture);
      if (!this._data[this._currentPicture].liked && this._likes.classList.contains('likes-count-liked')) {
        this._likes.classList.remove('likes-count-liked');
      }
    } else if (evt.keyCode === 37 && this._currentPicture === 0) {
      this.hide();
    }
    if (evt.keyCode === 39 && this._currentPicture <= this._data.length - 2) {
      this.removeVideo();
      this.setCurrentPicture(++this._currentPicture);
      if (!this._data[this._currentPicture].liked && this._likes.classList.contains('likes-count-liked')) {
        this._likes.classList.remove('likes-count-liked');
      }
    } else if (evt.keyCode === 39 && this._currentPicture > this._data.length - 2) {
      this.hide();
    }
  };

/**
* @override
*/
  Gallery.prototype._onCloseClick = function() {
    this.hide();
  };

  /**
  * Заполняет галерею либо фотографиями, либо видео
  * @param {Number} i
  */
  Gallery.prototype.setCurrentPicture = function(i) {
    this._currentPicture = i;

    if (this._data[i].getPreviewInfo()) {
      this._video.src = this._data[i].getSourceInfo();
      this._galleryContainer.querySelector('.gallery-overlay-preview').replaceChild(this._video, this._image);
      this._video.autoplay = true;
    } else {
      this._image.src = this._data[i].getSourceInfo();
    }

    this._likes.textContent = this._data[i].getLikesInfo();
    this._comment.textContent = this._data[i].getCommentsInfo();

    if (this._data[this._currentPicture].liked) {
      this._likes.classList.add('likes-count-liked');
    }
  };

  window.Gallery = Gallery;
})();
