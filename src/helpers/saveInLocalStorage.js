export function saveIngredient(inProgressRecipes, selectedItems, key, id) {
  if (inProgressRecipes) {
    const newSelectedItems = {
      ...inProgressRecipes,
      [key]: {
        ...inProgressRecipes[key],
        [id]: [...selectedItems],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newSelectedItems));
  }
}

export const getIngredients = (recipeInfo) => {
  const ingredients = Object.entries(recipeInfo)
    .filter((p) => p[0].includes('strIngredient') && p[1])
    .map((arr) => arr[1]);

  return ingredients;
};

export const getMeasures = (recipeInfo) => {
  const measures = Object.entries(recipeInfo)
    .filter((p) => p[0].includes('strMeasure') && p[1])
    .map((arr) => arr[1]);

  return measures;
};
