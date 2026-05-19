function getGoods() {
  const linkElements = document.querySelectorAll('.navigation-link');

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

  function getData(filterProperty, value) {
    fetch('https://willberries-c4ae1-default-rtdb.firebaseio.com/db.json')
      .then((response) => response.json())
      .then((data) => {
        const filteredGoods = filterProperty
          ? data.filter((good) => good[filterProperty] === value)
          : data;

        localStorage.setItem('goods', JSON.stringify(filteredGoods))

        if (window.location.pathname !== '/goods.html') {
          window.location.href = '/goods.html';
        } else {
          renderGoods(filteredGoods);
        }
      });
  }

  linkElements.forEach((linkElement) => {
    linkElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      getData(linkElement.dataset.field, linkElement.textContent);
    });
  });

  document.querySelector('a.more')?.addEventListener('click', (evt) => {
    evt.preventDefault();
    getData();
  });

  if (localStorage.getItem('goods') && window.location.pathname === '/goods.html') {
    renderGoods(JSON.parse(localStorage.getItem('goods')));
  }
}

getGoods();
