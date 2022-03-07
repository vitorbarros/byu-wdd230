const toggleClicked = () => {
  const element = document.getElementById('menu-list-taggable');
  const style = element.getAttribute('style');

  if (!style) {
    element.setAttribute('style', 'display: block');
  }

  const regex  = /display: block/g;
  if (regex.test(style)) {
    element.setAttribute('style', '');
  }
}

(() => {
  const menu = document.getElementById('menu');
  if (menu) {
    menu.addEventListener('click', toggleClicked);
  }
})();
