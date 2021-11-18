import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import copy from 'clipboard-copy';
import { useAppContext } from '../context/Provider';
import {
  saveIngredient,
  getIngredients,
  getMeasures,
} from '../helpers/saveInLocalStorage';

import '../Detail.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import fetchAPI from '../helpers/fetchAPI';

export default function FoodInProgress() {
  const { id } = useParams();
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const newIngredient = { cocktails: {}, meals: { [id]: [] } };

  const [recipeInfo, setRecipeInfo] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [favorite, setFavorite] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const { loading, setLoading } = useAppContext();

  // const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const isFavorite = favoriteRecipes ? favoriteRecipes
    .some((obj) => obj.id === id)
    : localStorage.setItem('favoriteRecipes', JSON.stringify([]));

  const ingredients = getIngredients(recipeInfo);
  const measures = getMeasures(recipeInfo);

  useEffect(() => {
    async function getRecipe() {
      setLoading(true);
      const recipe = await fetchAPI('meals', 'details', Number(id));
      const usedIngredients = await inProgressRecipes
        ? inProgressRecipes.meals[id]
        : localStorage.setItem('inProgressRecipes', JSON.stringify(newIngredient));
      setRecipeInfo(recipe[0]);
      setFavorite(isFavorite);
      if (usedIngredients) setSelectedItems(usedIngredients);
      setLoading(false);
    }
    getRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveIngredient(inProgressRecipes, selectedItems, 'meals', id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);

  function saveFavorite() {
    const newFavoriteMeal = [
      ...favoriteRecipes,
      {
        id: recipeInfo.idMeal,
        type: 'comida',
        area: recipeInfo.strArea,
        category: recipeInfo.strCategory,
        alcoholicOrNot: '',
        name: recipeInfo.strMeal,
        image: recipeInfo.strMealThumb,
      },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteMeal));
    setFavorite(!favorite);
  }

  function handleChange(value) {
    return (selectedItems.includes(value))
      ? setSelectedItems(selectedItems.filter((item) => item !== value))
      : setSelectedItems([...selectedItems, value]);
  }

  return (
    <div>
      { loading ? <div>Carregando...</div>
        : (
          <div>
            <h1 data-testid="recipe-title">{ recipeInfo.strMeal }</h1>
            <img
              data-testid="recipe-photo"
              src={ recipeInfo.strMealThumb }
              alt={ `${recipeInfo.strMeal} Recipe` }
              width={ 200 }
            />
            <div>
              <button
                type="button"
                data-testid="share-btn"
                onClick={ () => {
                  copy(`http://localhost:3000/comidas/${id}`);
                  setClicked(true);
                } }
              >
                { clicked ? 'Link copiado!' : <img src={ shareIcon } alt="Share icon" /> }
              </button>
              <button
                type="button"
                onClick={ () => saveFavorite() }
              >
                <img
                  data-testid="favorite-btn"
                  src={ favorite ? blackHeartIcon : whiteHeartIcon }
                  alt="favorite icon"
                />
              </button>
            </div>
            <h2 data-testid="recipe-category">{ recipeInfo.strCategory }</h2>
            <ul>
              { ingredients && ingredients.map((ingredient, index) => (
                <li key={ ingredient } data-testid={ `${index}-ingredient-step` }>
                  <input
                    className="checkbox"
                    type="checkbox"
                    value={ ingredient }
                    onChange={ (e) => handleChange(e.target.value) }
                    checked={
                      selectedItems.includes(ingredient)
                    }
                  />
                  { `${ingredients[index]}  ${measures[index]}` }
                </li>
              ))}
            </ul>
            <p data-testid="instructions">{ recipeInfo.strInstructions }</p>
            <button
              type="button"
              data-testid="finish-recipe-btn"
            >
              Finalizar Receita
            </button>
          </div>) }
    </div>
  );
}
// function checkedIngredient(ingredientName) {
//   const newIngredients = ingredients.map(({ name, measure, checked }) => {
//     if (name === ingredientName) {
//       return { name, measure, checked: !checked };
//     }
//     return { name, measure, checked };
//   });
//   setIngredients(newIngredients);
//   setLocalStorage(newIngredients);
// }
