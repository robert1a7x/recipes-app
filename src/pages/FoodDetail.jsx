import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import fetchAPI from '../helpers/fetchAPI';
import { useAppContext } from '../context/Provider';

export default function FoodDetail() {
  const { loading, setLoading } = useAppContext();
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});

  useEffect(() => {
    async function getRecipe() {
      setLoading(true);
      const recipe = await fetchAPI('meals', 'details', Number(id));
      setRecipeDetails(recipe);
      setLoading(false);
    }
    getRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(recipeDetails);
  }, [recipeDetails]);

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
      {/* <iframe src={} data-testid="video"/> */}
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
