import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import fetchAPI from '../helpers/fetchAPI';
import { useAppContext } from '../context/Provider';

export default function DrinkDetail() {
  const { loading, setLoading } = useAppContext();
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [foodRecomendations, setFoodRecomendations] = useState([]);
  const ingredients = Object.entries(recipeDetails)
    .filter((p) => p[0].includes('strIngredient') && p[1])
    .map((arr) => arr[1]);
  const measures = Object.entries(recipeDetails)
    .filter((p) => p[0].includes('strMeasure') && p[1])
    .map((arr) => arr[1]);

  useEffect(() => {
    async function getRecipe() {
      setLoading(true);
      const recipe = await fetchAPI('drinks', 'details', Number(id));
      const recommendedFoods = await fetchAPI('meals', 'recomendations');
      setRecipeDetails(recipe[0]);
      setFoodRecomendations(recommendedFoods);
      setLoading(false);
    }
    getRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1 data-testid="recipe-title">{recipeDetails.strDrink }</h1>
      <img
        data-testid="recipe-photo"
        src={ recipeDetails.strDrinkThumb }
        alt="Receita"
      />
      <button type="button" data-testid="share-btn">
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar receita
      </button>
      <span data-testid="recipe-category">
        { recipeDetails.strAlcoholic ? 'Alcoholic' : recipeDetails.strCategory }
      </span>
      <ul>
        { ingredients && ingredients.map((ingredient, index) => (
          <li key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
            { ingredients[index] + measures[index] }
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{recipeDetails.strInstructions }</p>
      <div>
        <span>Receitas Recomendadas</span>
        <ul>
          { ingredients.map((something, index) => ( // QUAL A CHAVE NO OBJETO DA API???????? (Ñ É INGREDIENTS)
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
