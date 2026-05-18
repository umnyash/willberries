(function () {
  const searchInputElement = document.querySelector('.search-block input');
  const searchButtonElement = document.querySelector('.search-block button');

  searchButtonElement.addEventListener('click', () => {
    console.log(searchInputElement.value);
  });
})();
