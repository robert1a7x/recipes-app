import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import fetchAPI from '../helpers/fetchAPI';
import { useAppContext } from '../context/Provider';
import Recommendations from '../components/Recommendations';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import '../style/Detail.css';

export default function DrinkDetail() {
  const { loading, setLoading } = useAppContext();
  const { id } = useParams();
  const { pathname } = useLocation();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [clicked, setClicked] = useState(false);
  const [favorite, setFavorite] = useState();
  const [foodRecomendations, setFoodRecomendations] = useState([]);
  const [updatedFavorites, setUpdatedFavorites] = useState([]);

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const isDone = doneRecipes ? doneRecipes
    .filter((obj) => obj.id === id)
    : localStorage.setItem('doneRecipes', JSON.stringify([]));
  const isInProgress = inProgressRecipes ? Object.keys(inProgressRecipes.cocktails)
    .some((item) => item === id)
    : localStorage
      .setItem('inProgressRecipes', JSON.stringify({ cocktails: {}, meals: {} }));
  const isFavorite = favoriteRecipes ? favoriteRecipes
    .some((obj) => obj.id === id)
    : localStorage.setItem('favoriteRecipes', JSON.stringify([]));

  const ingredients = Object.entries(recipeDetails)
    .filter((p) => p[0].includes('strIngredient') && p[1])
    .map((arr) => arr[1]);
  const measures = Object.entries(recipeDetails)
    .filter((p) => p[0].includes('strMeasure') && p[1])
    .map((arr) => arr[1]);

  useEffect(() => {
    async function getRecipe() {
      const MAX_RECOMENDATIONS = 6;
      setLoading(true);
      const recipe = await fetchAPI('drinks', 'details', Number(id));
      const foodsResponse = await fetchAPI('meals', 'recomendations');
      const recommendedFoods = await foodsResponse
        .filter((_elem, index) => index < MAX_RECOMENDATIONS);
      setRecipeDetails(recipe[0]);
      setFoodRecomendations(recommendedFoods);
      setLoading(false);
      setFavorite(isFavorite);
    }
    getRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveFavorite() {
    const newFavoriteDrink = [
      ...favoriteRecipes,
      {
        id: recipeDetails.idDrink,
        type: 'bebida',
        area: '',
        category: recipeDetails.strCategory ? recipeDetails.strCategory : '',
        alcoholicOrNot: recipeDetails.strAlcoholic,
        name: recipeDetails.strDrink,
        image: recipeDetails.strDrinkThumb,
      },
    ];

    if (!favorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteDrink));
      setUpdatedFavorites(newFavoriteDrink);
    } else {
      const filterRecipe = updatedFavorites.filter((r) => r.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterRecipe));
      setUpdatedFavorites(filterRecipe);
    }

    setFavorite(!favorite);
  }

  function saveInProgressRecipe() {
    const newInProgressDrink = {
      ...inProgressRecipes,
      cocktails: {
        ...inProgressRecipes.cocktails,
        [id]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressDrink));
  }

  if (loading) {
    return (
      <section className="parente-loading">
        <div className="loading" />
      </section>);
  }
  return (
    <section className="parent-details">
      <h1
        data-testid="recipe-title"
        className="title-detail"
      >
        { recipeDetails.strDrink }

      </h1>
      <section className="container-details">
        <div className="item-details">
          <img
            className="recipe-photo"
            data-testid="recipe-photo"
            src={ recipeDetails.strDrinkThumb }
            alt="Receita"
          />

          <p data-testid="recipe-category">
            { recipeDetails.strAlcoholic ? 'Alcoholic' : recipeDetails.strCategory }
          </p>
          <br />
          <button
            className="icons"
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              copy(`http://localhost:3000${pathname}`);
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
        </div>

        <ul className="item-details">
          { ingredients && ingredients.map((ingredient, index) => (
            <li key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
              { `${ingredients[index]} - ${measures[index]}` }
            </li>
          ))}
        </ul>

        <p
          data-testid="instructions"
          className="item-details"
        >
          {recipeDetails.strInstructions }

        </p>
      </section>

      <Recommendations items={ foodRecomendations } />
      { isDone && (
        <Link to={ `/bebidas/${recipeDetails.idDrink}/in-progress` }>
          <button
            className="btn-action"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => saveInProgressRecipe() }
          >
            { isInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
          </button>
        </Link>)}
    </section>
  );
}
