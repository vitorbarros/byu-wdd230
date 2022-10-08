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

const checkCurrentMenuItem = () => {
  const path = window.location.pathname;
  let currentLinkId = '';

  if (path.includes('home')) {
    currentLinkId = 'home-link-wrapper';
  }

  if (path.includes('preston')) {
    currentLinkId = 'preston-link-wrapper';
  }

  if (path.includes('soda-springs')) {
    currentLinkId = 'soda-springs-link-wrapper';
  }

  if (path.includes('fish-haven')) {
    currentLinkId = 'fish-haven-link-wrapper';
  }

  if (path.includes('storm-center')) {
    currentLinkId = 'storm-center-link-wrapper';
  }

  if (path.includes('gallery')) {
    currentLinkId = 'gallery-link-wrapper';
  }

  const element = document.getElementById(currentLinkId);
  if (element) {
    element.setAttribute('class', 'current');
  }
}

const checkBanner = () => {
  const day = new Date().getDay();

  // friday
  if (day === 5) {
    const banner = document.getElementById('banner');
    banner.setAttribute('style', 'display: block')
  }
}

const initObserver = () => {
  const images = document.querySelectorAll('[data-src]');
  const options = {
    threshold: 1,
  };

  const preloadImg = (img) => {
    const src = img.getAttribute('data-src');

    if (!src) {
      return;
    }

    img.src = src;
  }

  const observer = (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      preloadImg(entry.target);
      obs.unobserve(entry.target);
    })
  }

  const imgObserver = new IntersectionObserver(observer, options);

  images.forEach((image) => {
    imgObserver.observe(image);
  });
};

(() => {
  const menu = document.getElementById('menu');
  if (menu) {
    menu.addEventListener('click', toggleClicked);
  }

  checkCurrentMenuItem();
  checkBanner();
  initObserver();
})();
