const endpoint = {
  meals: 'themealdb',
  drinks: 'thecocktaildb',
};

const filter = {
  ingredient: 'filter.php?i=',
  name: 'search.php?s=',
  firstletter: 'search.php?f=',
  list: 'list.php?c=',
  category: 'filter.php?c=',
  details: 'lookup.php?i=',
  recomendations: 'search.php?s=',
  random: 'random.php',
};

export default async function fetchAPI(API, type, value = '') {
  try {
    const responseRaw = await fetch(`https://www.${endpoint[API]}.com/api/json/v1/1/${filter[type]}${value}`);
    const responseJSON = await responseRaw.json();
    console.log(responseJSON[API]);
    return responseJSON[API];
  } catch (error) {
    console.error(error);
  }
}

console.log(fetchAPI('drinks', 'details', Number('178319')));
