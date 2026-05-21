(function () {
  const goodListElement = document.querySelector('.long-goods-list');
  const cartButtonElement = document.querySelector('.button-cart');
  const cartModalElement = document.querySelector('#modal-cart');
  const cartModalCloseButtonElement = cartModalElement.querySelector('.modal-close');
  const cartFormElement = cartModalElement.querySelector('.modal-form');
  const cartTableElement = cartModalElement.querySelector('.cart-table');
  const cartTableBodyElement = cartTableElement.querySelector('.cart-table__goods');
  const cartTotalPriceElement = cartTableElement.querySelector('.cart-table__total');

  function addToCart(goodId) {
    const good = JSON
      .parse(localStorage.getItem('goods'))
      .find(({ id }) => id === goodId);

    const cartGoods = JSON.parse(localStorage.getItem('cart') ?? "[]");
    const goodInCart = cartGoods.find((good) => good.id === goodId);

    if (goodInCart) {
      goodInCart.count++;
    } else {
      good.count = 1;
      cartGoods.push(good);
    }

    localStorage.setItem('cart', JSON.stringify(cartGoods));
  }

  function increaseCount(goodId) {
    const cartGoods = JSON.parse(localStorage.getItem('cart'));
    const good = cartGoods.find((good) => good.id === goodId);
    good.count++;
    localStorage.setItem('cart', JSON.stringify(cartGoods));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  }

  function decreaseCount(goodId) {
    const cartGoods = JSON.parse(localStorage.getItem('cart'));
    const good = cartGoods.find((good) => good.id === goodId);

    if (good.count) {
      good.count--;
    }

    localStorage.setItem('cart', JSON.stringify(cartGoods));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  }

  function deleteFromCart(goodId) {
    const cartGoods = JSON.parse(localStorage.getItem('cart'));
    const goodIndex = cartGoods.findIndex((good) => good.id === goodId);
    cartGoods.splice(goodIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cartGoods));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  }

  function renderCartGoods(goods) {
    cartTableBodyElement.innerHTML = '';
    let totalPrice = 0;
    cartTotalPriceElement.textContent = totalPrice;

    goods.forEach((good) => {
      const trElement = document.createElement('tr');
      const { id, name, label, img, description, price, count } = good;
      const goodTotalPrice = price * count;
      totalPrice += goodTotalPrice;

      trElement.innerHTML = `
        <td>${name}</td>
        <td>${price}$</td>
        <td><button class="cart-btn-minus"">-</button></td>
        <td>${count}</td>
        <td><button class=" cart-btn-plus"">+</button></td>
        <td>${goodTotalPrice}$</td>
        <td><button class="cart-btn-delete"">x</button></td>
      `;

      trElement.addEventListener('click', ({ target: { classList } }) => {
        switch (true) {
          case classList.contains('cart-btn-minus'):
            decreaseCount(good.id)
            break;
          case classList.contains('cart-btn-plus'):
            increaseCount(good.id)
            break;
          case classList.contains('cart-btn-delete'):
            deleteFromCart(good.id)
            break;
        }
      });

      cartTableBodyElement.append(trElement);
    });

    cartTotalPriceElement.textContent = totalPrice;
  }

  function sendForm() {
    const cartGoods = JSON.parse(localStorage.getItem('cart') ?? "[]");

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        goods: cartGoods,
        name: cartFormElement.nameCustomer.value,
        phone: cartFormElement.phoneCustomer.value,
      })
    }).then(() => {
      closeCartModal();
      localStorage.removeItem('cart');
      cartFormElement.reset();
    });
  }

  function openCartModal() {
    cartModalElement.style.display = 'flex';
  }

  function closeCartModal() {
    cartModalElement.style.display = '';
  }

  cartButtonElement.addEventListener('click', () => {
    const cartGoods = JSON.parse(localStorage.getItem('cart') ?? "[]");
    renderCartGoods(cartGoods);
    openCartModal();
  });

  cartFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendForm();
  });

  cartModalCloseButtonElement.addEventListener('click', () => {
    closeCartModal();
  });

  cartModalElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('overlay')) {
      closeCartModal();
    }
  })

  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeCartModal();
    }
  });

  goodListElement?.addEventListener('click', (evt) => {
    const cartButtonElement = evt.target.closest('.add-to-cart');

    if (!cartButtonElement) {
      return;
    }

    const goodId = cartButtonElement.dataset.id;
    addToCart(goodId)
  });
})();
