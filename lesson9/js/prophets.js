const prophetsFetch = async () => {
  const url = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';

  const result = await fetch(url);
  const { prophets } = await result.json();

  return prophets;
}

const renderProphets = (prophet) => {
  let card = document.createElement('section');
  let h2 = document.createElement('h2');
  let h3 = document.createElement('h3');
  let portrait = document.createElement('img');

  h2.textContent = `${prophet.name} ${prophet.lastname}`;
  h3.textContent = `${prophet.birthdate} - ${prophet.birthplace}`;

  portrait.setAttribute('src', prophet.imageurl);
  portrait.setAttribute('alt', `Portait of ${prophet.name} ${prophet.lastname} prophet number ${prophet.order}`);
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
