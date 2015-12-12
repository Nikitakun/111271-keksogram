/* global Photo: true, Gallery: true*/

'use strict';

(function() {
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

  var picturesToChange = [];
  var filteredPictures = [];
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
      showPictures(filteredPictures, ++currentPage);
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
          var pictureMonth = new Date(dateString.date).getMonth();
          return pictureMonth >= thirdMonth;
        });
        filteredPictures = filteredPictures.sort(function(a, b) {
          return (b.date) - (a.date);
        });
        break;
      case 'filter-discussed':
        filteredPictures = filteredPictures.sort(function(a, b) {
          return b.comments - a.comments;
        });
        break;
    }
    currentPage = 0;
    showPictures(filteredPictures, currentPage, true);
    imageDraw();
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
      var shownPictures = picturesBlock.querySelectorAll('.picture');
      [].forEach.call(shownPictures, function(element) {
        picturesBlock.removeChild(element);
      });
    }
    var docFragment = document.createDocumentFragment();

    var from = pageNumber * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    var pagePictures = pictures.slice(from, to);

    pagePictures.forEach(function(pictureData) {
      var pictureToAppend = new Photo(pictureData);
      pictureToAppend.render();
      docFragment.appendChild(pictureToAppend.container);

      pictureToAppend.container.addEventListener('click', _onClick);
    });
    picturesBlock.appendChild(docFragment);
  }

  /**
  * Показывает галерею при клике на фотографию
  * @param {Event} evt
  */
  function _onClick(evt) {
    evt.preventDefault();
    gallery.show();
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
      picturesToChange = pictureArray;

      picturesBlock.classList.remove('pictures-loading');

      setFilter('filter-popular');
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
})();
