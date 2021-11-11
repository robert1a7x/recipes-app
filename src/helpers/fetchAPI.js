const endpoint = {
  meals: 'themealdb',
  drinks: 'thecocktaildb',
};

const filter = {
  ingredient: 'filter.php?i=',
  name: 'search.php?s=',
  firstletter: 'search.php?f=',
  random: 'random.php',
};

export default async function fetchAPI(API, type, value = '') {
  try {
    const responseRaw = await fetch(`https://www.${endpoint[API]}.com/api/json/v1/1/${filter[type]}${value}`);
    const responseJSON = await responseRaw.json();
    return responseJSON[API];
  } catch (error) {
    global.alert(error);
  }
}

console.log(fetchAPI('meals', 'ingredient', 'chicken'));
