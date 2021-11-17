const endpoint = {
  meals: 'themealdb',
  drinks: 'thecocktaildb',
};

const filter = {
  ingredient: 'filter.php?i=',
  name: 'search.php?s=',
  firstletter: 'search.php?f=',
  list: 'list.php?c=',
  listArea: 'list.php?a=',
  category: 'filter.php?c=',
  area: 'filter.php?a=',
  details: 'lookup.php?i=',
  recomendations: 'search.php?s=',
  random: 'random.php',
  listIngredients: 'list.php?i=',
};

export default async function fetchAPI(API, type, value = '') {
  try {
    const responseRaw = await fetch(`https://www.${endpoint[API]}.com/api/json/v1/1/${filter[type]}${value}`);
    const responseJSON = await responseRaw.json();
    return responseJSON[API];
  } catch (error) {
    console.error(error);
  }
}
