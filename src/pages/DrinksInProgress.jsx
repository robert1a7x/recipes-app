import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useAppContext } from '../context/Provider';
import {
  saveIngredient,
  getIngredients,
  getMeasures,
} from '../helpers/saveInLocalStorage';

import '../style/Detail.css';
import fetchAPI from '../helpers/fetchAPI';

export default function DrinksInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const { loading, setLoading } = useAppContext();
  const [selectedItems, setSelectedItems] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState([]);

  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const newIngredient = { cocktails: { [id]: [] }, meals: {} };

  const ingredients = getIngredients(recipeInfo);
  const measures = getMeasures(recipeInfo);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    async function getRecipe() {
      setLoading(true);
      const recipe = await fetchAPI('drinks', 'details', Number(id));
      const usedIngredients = await inProgressRecipes
        ? inProgressRecipes.cocktails[id]
        : localStorage.setItem('inProgressRecipes', JSON.stringify(newIngredient));
      setRecipeInfo(recipe[0]);
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

  function handleChange(value) {
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter((item) => item !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  }

  function completeRecipe() {
    const today = new Date();
    let date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    if (!localStorage.doneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    } else {
      const newCompletedRecipe = [
        ...doneRecipes,
        {
          id: recipeInfo.idDrink,
          type: 'bebida',
          area: '',
          category: recipeInfo.strCategory ? recipeInfo.strCategory : '',
          alcoholicOrNot: recipeInfo.strAlcoholic,
          name: recipeInfo.strDrink,
          image: recipeInfo.strDrinkThumb,
          doneDate: date,
          tags: recipeInfo.strTags ? recipeInfo.strTags.split(',') : [],
        },
      ];

      localStorage.setItem('doneRecipes', JSON.stringify(newCompletedRecipe));
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
          <h2 data-testid="recipe-category">Categoria: { recipeInfo.strCategory }</h2>
        </div>
        <div className="item-details">
          <ul style={ { listStyle: 'none' } }>
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
                { `${ingredients[index]} - ${measures[index]}` }
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
        onClick={ () => {
          completeRecipe();
          history.push('/receitas-feitas');
        }  }
      >
        Finalizar Receita
      </button>
    </div>
  );
}
