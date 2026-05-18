function getGoods() {
  const linkElements = document.querySelectorAll('.navigation-link');

  function getData() {
    fetch('https://willberries-c4ae1-default-rtdb.firebaseio.com/db.json')
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('goods', JSON.stringify(data))
      });
  }

  linkElements.forEach((linkElement) => {
    linkElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      getData();
    });
  });

  const goods = JSON.parse(localStorage.getItem('goods'))
  console.log(goods);
}

getGoods();
