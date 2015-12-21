/* global define: true */

'use strict';

define([
  'photo-base',
  'inherit'
], function(PhotoBase, inherit) {
  /**
  * @constructor
  * @extends {PhotoBase}
  */
  var PhotoPreview = function() {};

  inherit(PhotoPreview, PhotoBase);

  PhotoPreview.prototype._galleryContainer = null;

  PhotoPreview.prototype._image = null;

  PhotoPreview.prototype._closeButton = null;

  PhotoPreview.prototype._likesButton = null;

  PhotoPreview.prototype._video = null;

  PhotoPreview.prototype._onVideoClick = function() {};

  PhotoPreview.prototype.removeVideo = function() {};

  PhotoPreview.prototype._onDocumentKeyDown = function() {};

  PhotoPreview.prototype._onPhotoClick = function() {};

  PhotoPreview.prototype._onCloseClick = function() {};


  /**
  * Действия, производимые при показе галереи
  */
  PhotoPreview.prototype.show = function() {
    this._galleryContainer.classList.remove('invisible');
    document.addEventListener('keydown', this._onDocumentKeyDown);
    this._image.addEventListener('click', this._onPhotoClick);
    this._closeButton.addEventListener('click', this._onCloseClick);
    this._likesButton.addEventListener('click', this._onLikeClick);
    this._video.addEventListener('click', this._onVideoClick);
  };

  /**
  * Действия, производимые при исчезновении галереи
  */
  PhotoPreview.prototype.hide = function() {
    location.hash = '';
    this._galleryContainer.classList.add('invisible');
    document.removeEventListener('keydown', this._onDocumentKeyDown);
    this._image.removeEventListener('click', this._onPhotoClick);
    this._closeButton.removeEventListener('click', this._onCloseClick);
    this._likesButton.removeEventListener('click', this._onLikeClick);
    this._likes.classList.remove('likes-count-liked');
    this._video.removeEventListener('click', this._onVideoClick);
    this.removeVideo();
  };

  return PhotoPreview;
});
