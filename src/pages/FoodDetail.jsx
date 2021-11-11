import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import fetchAPI from '../helpers/fetchAPI';
import { useAppContext } from '../context/Provider';

export default function FoodDetail() {
  const { loading, setLoading } = useAppContext();
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [drinkRecomendations, setDrinkRecomendations] = useState([]);
  const ingredients = Object.entries(recipeDetails)
    .filter((p) => p[0].includes('strIngredient') && p[1])
    .map((arr) => arr[1]);
  const measures = Object.entries(recipeDetails)
    .filter((p) => p[0].includes('strMeasure') && p[1])
    .map((arr) => arr[1]);

  useEffect(() => {
    async function getRecipe() {
      setLoading(true);
      const recipe = await fetchAPI('meals', 'details', Number(id));
      const recommendedDrinks = await fetchAPI('drinks', 'recomendations');
      setRecipeDetails(recipe[0]);
      setDrinkRecomendations(recommendedDrinks);
      setLoading(false);
    }
    getRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1 data-testid="recipe-title">{ recipeDetails.strMeal }</h1>
      <img
        data-testid="recipe-photo"
        src={ recipeDetails.strMealThumb }
        alt={ `${recipeDetails.strMeal} Recipe` }
      />
      <div>
        <button type="button" data-testid="share-btn">
          Compartilhar
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favoritar receita
        </button>
      </div>
      <h2 data-testid="recipe-category">{ recipeDetails.strCategory }</h2>
      <ul>
        { ingredients && ingredients.map((ingredient, index) => (
          <li key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
            { ingredients[index] + measures[index] }
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ recipeDetails.strInstructions }</p>
      <iframe
        src={ recipeDetails.strYoutube }
        title="video"
        data-testid="video"
      />
      <div>
        <span>Receitas Recomendadas</span>
        <ul>
          { ingredients.map((something, index) => (
            <li
              key={ something }
              data-testid={ `${index}-recomendation-card` }
            >
              { something }
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

/*
  A foto deve possuir o atributo data-testid="recipe-photo";
  O título deve possuir o atributo data-testid="recipe-title";
  O botão de compartilhar deve possuir o atributo data-testid="share-btn";
  O botão de favoritar deve possuir o atributo data-testid="favorite-btn";
  O texto da categoria deve possuir o atributo data-testid="recipe-category";
  Os ingredientes devem possuir o atributo data-testid="${index}-ingredient-name-and-measure";
  O texto de instruções deve possuir o atributo data-testid="instructions";
  O vídeo, presente somente na tela de comidas, deve possuir o atributo data-testid="video";
  O card de receitas recomendadas deve possuir o atributo data-testid="${index}-recomendation-card";
  O botão de iniciar receita deve possuir o atributo data-testid="start-recipe-btn";
*/
