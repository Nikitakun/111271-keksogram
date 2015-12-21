/* global requirejs: true, define: true */

'use strict';

requirejs.config({
  baseUrl: 'js'
});

define([
  'photo',
  'gallery',
  'photo-data',
  'upload'
], function(Photo, Gallery, PhotoData) {
  var filterBlock = document.querySelector('.filters');

/**
* Прячет переключатели фильтров при загрузке страницы
*/
  function hideFilters() {
    if (!filterBlock.classList.contains('hidden')) {
      filterBlock.classList.add('hidden');
    }
  }
  hideFilters();

  getPictures();

  var activeFilter = localStorage.getItem('activeFilter') || 'filter-popular';
  var picturesToChange = [];
  var filteredPictures = [];
  var shownPictures = [];
  var currentPage = 0;
  var gallery = new Gallery();

/**
* Переключает фильтр при клике
* @param {Event} evt
*/
  filterBlock.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('filters-radio')) {
      setFilter(evt.target.id);
    }
  });

/**
* Заполняет доступное пространство фотографиями
*/
  function imageDraw() {
    var windowSize = window.innerHeight;
    var lastImage = document.querySelector('.picture:last-child').getBoundingClientRect();

    if (lastImage.bottom - windowSize <= lastImage.height) {
      if (currentPage < Math.ceil(filteredPictures.length / PAGE_SIZE)) {
        showPictures(filteredPictures, ++currentPage);
      }
    }
  }

  /**
  * Вызывает дорисовку фотографий при прокрутке
  */
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    var scrollTimeout = setTimeout(imageDraw(), 100);
  });

  /**
  * Проверяет id выбранного фильтра и отрисосывает новую страницу фотографий
  * @param {string} id
  */
  function setFilter(id) {
    filteredPictures = picturesToChange.slice(0);

    switch (id) {
      case 'filter-popular':
        filteredPictures = picturesToChange.slice(0);
        break;
      case 'filter-new':
        filteredPictures = filteredPictures.filter(function(dateString) {
          var now = new Date().getMonth();
          var thirdMonth = now - 3;
          var pictureMonth = new Date(dateString.getDateInfo()).getMonth();
          return pictureMonth >= thirdMonth;
        });
        filteredPictures = filteredPictures.sort(function(a, b) {
          return (b.getDateInfo()) - (a.getDateInfo());
        });
        break;
      case 'filter-discussed':
        filteredPictures = filteredPictures.sort(function(a, b) {
          return b.getCommentsInfo() - a.getCommentsInfo();
        });
        break;
    }
    currentPage = 0;
    showPictures(filteredPictures, currentPage, true);
    gallery.setPictures(filteredPictures);
    imageDraw();

    localStorage.setItem('activeFilter', id);
  }

  var picturesBlock = document.querySelector('.pictures');

  /**
  * @const {number}
  */
  var PAGE_SIZE = 12;

  /**
  * Основная функция отрисовки фотографий
  * @param {Object} pictures
  * @param {number} pageNumber
  * @param {boolean} replace
  */
  function showPictures(pictures, pageNumber, replace) {
    if (replace) {
      var firstElement;
      while ((firstElement = shownPictures.shift())) {
        picturesBlock.removeChild(firstElement.container);
        firstElement._onClick = null;
        firstElement.hide();
      }
    }
    var docFragment = document.createDocumentFragment();

    var from = pageNumber * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    var pagePictures = pictures.slice(from, to);

    shownPictures = shownPictures.concat(pagePictures.map(function(pictureData) {
      var pictureToAppend = new Photo();
      pictureToAppend.setData(pictureData);

      pictureToAppend.show();
      docFragment.appendChild(pictureToAppend.container);

      pictureToAppend.onClick = function() {
        gallery._changeHash(pictureToAppend.getData().getSourceInfo());
      };

      return pictureToAppend;
    }));
    picturesBlock.appendChild(docFragment);
  }

  /**
  * Получает фотографии по AJAX и вставляет их в дефолтный фильтр
  */
  function getPictures() {
    document.querySelector('.pictures').classList.add('pictures-loading');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/pictures.json');

    xhr.onload = function(evt) {
      var serverData = evt.target.response;
      var pictureArray = JSON.parse(serverData);
      picturesToChange = pictureArray.map(function(photo) {
        return new PhotoData(photo);
      });

      picturesBlock.classList.remove('pictures-loading');

      filterBlock.querySelector('#' + activeFilter).checked = true;

      setFilter(activeFilter);
    };

    xhr.onerror = function() {
      document.querySelector('.pictures').classList.remove('pictures-loading');
      document.querySelector('.pictures').classList.add('pictures-failure');
    };

    xhr.send();
  }

  /**
  * Показывает переключатели фильтров
  */
  function showFilters() {
    if (filterBlock.classList.contains('hidden')) {
      filterBlock.classList.remove('hidden');
    }
  }
  showFilters();
});
