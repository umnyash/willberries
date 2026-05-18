(function () {
  const cartButtonElement = document.querySelector('.button-cart');
  const cartModalElement = document.querySelector('#modal-cart');
  const cartModalCloseButtonElement = cartModalElement.querySelector('.modal-close');

  cartButtonElement.addEventListener('click', () => {
    cartModalElement.style.display = 'flex';
  });

  cartModalCloseButtonElement.addEventListener('click', () => {
    cartModalElement.style.display = '';
  });
})();
