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
      showPictures(filteredPictures, ++currentPage);
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

  function processTemplate(data) {
    var template = document.querySelector('#picture-template');
    var container = template.content.children[0].cloneNode(true);

    container.querySelector('.picture-comments').textContent = data.comments;
    container.querySelector('.picture-likes').textContent = data.likes;

    var image = new Image(182, 182);

    image.onload = function() {
      container.replaceChild(image, container.querySelector('img'));
    };

    image.onerror = function() {
      container.classList.add('picture-load-failure');
    };

    image.src = data.url;

    return container;
  }

  var picturesBlock = document.querySelector('.pictures');

  var PAGE_SIZE = 12;

  function showPictures(pictures, pageNumber, replace) {
    if (replace) {
      picturesBlock.innerHTML = '';
    }
    var docFragment = document.createDocumentFragment();

    var from = pageNumber * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    var pagePictures = pictures.slice(from, to);

    pagePictures.forEach(function(pictureData) {
      var elementToAppend = processTemplate(pictureData);
      docFragment.appendChild(elementToAppend);
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
