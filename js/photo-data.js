/* global define: true */

'use strict';

define(function() {
  /**
  * @constructor
  */
  var PhotoData = function(data) {
    this._mediaInfo = data;
  };

  /**
  * @return {*}
  */
  PhotoData.prototype.getSourceInfo = function() {
    return this._mediaInfo.url;
  };

  /**
  * @return {String}
  */
  PhotoData.prototype.getLikesInfo = function() {
    return this._mediaInfo.likes;
  };

  /**
  * Записывает новое кол-во лайков в PhotoData
  * @param {String} like
  */
  PhotoData.prototype.setLikes = function(like) {
    this._mediaInfo.likes = like;
  };

  PhotoData.prototype.addLiked = function() {
    this._mediaInfo._liked = true;
  };

  PhotoData.prototype.removeLiked = function() {
    this._mediaInfo._liked = false;
  };

  PhotoData.prototype.checkIfLiked = function() {
    return this._mediaInfo._liked;
  };

  /**
  * @return {String}
  */
  PhotoData.prototype.getCommentsInfo = function() {
    return this._mediaInfo.comments;
  };

  /**
  * @return {String}
  */
  PhotoData.prototype.getDateInfo = function() {
    return this._mediaInfo.date;
  };

  /**
  * @return {String}
  */
  PhotoData.prototype.getPreviewInfo = function() {
    return this._mediaInfo.preview;
  };

  return PhotoData;
});
