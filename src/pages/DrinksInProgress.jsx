import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import copy from 'clipboard-copy';
import { useAppContext } from '../context/Provider';
import {
  saveIngredient,
  getIngredients,
  getMeasures,
} from '../helpers/saveInLocalStorage';

import '../style/Detail.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import fetchAPI from '../helpers/fetchAPI';

export default function DrinksInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const [clicked, setClicked] = useState(false);
  const [favorite, setFavorite] = useState();
  const { loading, setLoading } = useAppContext();
  const [selectedItems, setSelectedItems] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState([]);

  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const newIngredient = { cocktails: { [id]: [] }, meals: {} };

  // const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  // const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const isFavorite = favoriteRecipes ? favoriteRecipes
    .some((obj) => obj.id === id)
    : localStorage.setItem('favoriteRecipes', JSON.stringify([]));

  const ingredients = getIngredients(recipeInfo);
  const measures = getMeasures(recipeInfo);

  useEffect(() => {
    async function getRecipe() {
      setLoading(true);
      const recipe = await fetchAPI('drinks', 'details', Number(id));
      const usedIngredients = await inProgressRecipes
        ? inProgressRecipes.cocktails[id]
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
    saveIngredient(inProgressRecipes, selectedItems, 'cocktails', id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);

  function saveFavorite() {
    const newFavoriteMeal = [
      ...favoriteRecipes,
      {
        id: recipeInfo.idDrink,
        type: 'bebida',
        area: '',
        category: recipeInfo.strCategory,
        alcoholicOrNot: recipeInfo.strAlcoholic,
        name: recipeInfo.strDrink,
        image: recipeInfo.strDrinkThumb,
      },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteMeal));
    setFavorite(!favorite);
  }

  function handleChange(value) {
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter((item) => item !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  }

  if (loading) {
    return (
      <section className="parente-loading">
        <div className="loading" />
      </section>);
  }
  return (
    <div className="parent-details">
      <h1 data-testid="recipe-title" className="title-detail">{ recipeInfo.strDrink }</h1>
      <section className="container-details">
        <div className="item-details">
          <img
            className="recipe-photo"
            data-testid="recipe-photo"
            src={ recipeInfo.strDrinkThumb }
            alt={ `${recipeInfo.strDrink} Recipe` }
            width={ 200 }
          />
          <button
            className="icons"
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              copy(`http://localhost:3000/bebidas/${id}`);
              setClicked(true);
            } }
          >
            { clicked ? 'Link copiado!' : <img src={ shareIcon } alt="Share icon" /> }
          </button>
          <button
            className="icons"
            type="button"
            onClick={ () => saveFavorite() }
          >
            <img
              data-testid="favorite-btn"
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
              alt="favorite icon"
            />
          </button>
          <h2 data-testid="recipe-category">{ recipeInfo.strCategory }</h2>
        </div>
        <div className="item-details">
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
        </div>
        <div className="item-details">
          <p data-testid="instructions">{ recipeInfo.strInstructions }</p>
        </div>
      </section>
      <button
        className="btn-action"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ (selectedItems.length !== ingredients.length) }
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar Receita
      </button>
    </div>
  );
}
