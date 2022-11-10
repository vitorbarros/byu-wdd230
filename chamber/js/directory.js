const prophetsFetch = async () => {
  const url = 'resources/data.json';

  const result = await fetch(url);
  return result.json();
}

const renderProphets = (prophet) => {
  let card = document.createElement('section');
  let h2 = document.createElement('h2');
  let h3 = document.createElement('h3');
  let portrait = document.createElement('img');

  h2.textContent = `${prophet.name}`;
  h3.textContent = `${prophet.since}`;

  portrait.setAttribute('src', prophet.imageurl);
  portrait.setAttribute('alt', `Portait of ${prophet.name}`);
  portrait.setAttribute('loading', 'lazy');

  card.appendChild(h2);
  card.appendChild(h3);
  card.appendChild(portrait);

  document.querySelector('div.cards').appendChild(card);
}


(async () => {
 const prophets =  await prophetsFetch();
 console.log(JSON.stringify(prophets, null, 2));
  prophets.forEach(renderProphets);
})();
