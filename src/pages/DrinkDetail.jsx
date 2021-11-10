import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import fetchAPI from '../helpers/fetchAPI';
import { useAppContext } from '../context/Provider';

export default function DrinkDetail() {
  const { loading, setLoading } = useAppContext();
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});

  useEffect(() => {
    async function getRecipe() {
      setLoading(true);
      const recipe = await fetchAPI('drinks', 'details', Number(id));
      setRecipeDetails(recipe);
      setLoading(false);
    }
    getRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1 data-testid="recipe-title">Detalhes da Receita</h1>
      <img
        data-testid="recipe-photo"
        // src={ /* */ }
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
      <span data-testid="recipe-category">{}</span>
      <ul>
        { /* */}
      </ul>
      <p data-testid="instructions">{}</p>
      <div>
        <span>Receitas Recomendadas</span>
        <ul>
          {/* {} data-testid="${index}-recomendation-card";  */}
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
