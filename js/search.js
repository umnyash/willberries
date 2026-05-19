(function () {
  const searchInputElement = document.querySelector('.search-block input');
  const searchButtonElement = document.querySelector('.search-block button');

  function renderGoods(goods) {
    const goodListElement = document.querySelector('.long-goods-list');
    goodListElement.innerHTML = '';

    goods.forEach((good) => {
      const goodListItemElement = document.createElement('div');
      goodListItemElement.classList.add('col-lg-3');
      goodListItemElement.classList.add('col-sm-6');

      const { id, name, label, img, description, price } = good;

      goodListItemElement.innerHTML = `
        <div class="goods-card">
          <span class="label ${label ? null : 'd-none'}">${label}</span>
          <img src="db/${img}" alt="image: ${name}" class="goods-image">
          <h3 class="goods-title">${name}</h3>
          <p class="goods-description">${description}</p>
          <button class="button goods-card-btn add-to-cart" data-id="${id}">
            <span class="button-price">$${price}</span>
          </button>
        </div>
      `;

      goodListElement.append(goodListItemElement)
    });
  }

  function getData(searchQuery) {
    fetch('https://willberries-c4ae1-default-rtdb.firebaseio.com/db.json')
      .then((response) => response.json())
      .then((data) => {
        const foundGoods = data.filter((good) =>
          good.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        localStorage.setItem('goods', JSON.stringify(foundGoods))

        if (window.location.pathname !== '/goods.html') {
          window.location.href = '/goods.html';
        } else {
          renderGoods(foundGoods);
        }
      });
  }

  searchButtonElement.addEventListener('click', () => {
    getData(searchInputElement.value);
  });
})();
