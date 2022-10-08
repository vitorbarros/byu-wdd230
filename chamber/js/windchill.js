(() => {
  const windSpeed = parseInt(document.getElementById('wind-speed').innerText, 10);
  const windChill = parseInt(document.getElementById('wind-chill').innerText, 10);

  const f = (5.74 + 0.6215) * windChill - 35.75 * windSpeed^0.16 + 0.4275 * windChill * windSpeed^0.16;
  document.getElementById('wind-chill-factor').innerText = f.toString();
})();
