/* global Photo: true */

'use strict';

(function() {
  var filterBlock = document.querySelector('.filters');

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

  filterBlock.addEventListener('click', function(e) {
    if (e.target.classList.contains('filters-radio')) {
      setFilter(e.target.id);
    }
  });

  function imageDraw() {
    var windowSize = window.innerHeight;
    var lastImage = document.querySelector('.picture:last-child').getBoundingClientRect();

    if (lastImage.bottom - windowSize <= lastImage.height) {
      showPictures(filteredPictures, currentPage++);
    }
  }

  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    var scrollTimeout = setTimeout(imageDraw(), 100);
  });

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

  var PAGE_SIZE = 12;

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
    });
    picturesBlock.appendChild(docFragment);
  }

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

  function showFilters() {
    if (filterBlock.classList.contains('hidden')) {
      filterBlock.classList.remove('hidden');
    }
  }
  showFilters();
})();
