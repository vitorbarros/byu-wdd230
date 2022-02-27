const getCurrentYear = () => new Date().getFullYear().toString();

(() => {
  document.getElementById('footer-year').innerText = getCurrentYear();
  document.getElementById('last-modified').innerText = document.lastModified;
})()
