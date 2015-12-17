'use strict';

(function() {
  /**
  * @constructor
  */
  var PhotoData = function(data) {
    this._mediaInfo = data;
    this._liked = false;
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

  window.PhotoData = PhotoData;
})();
