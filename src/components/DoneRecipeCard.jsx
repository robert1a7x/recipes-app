import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipeCard({ recipe, index }) {
  const [clicked, setClicked] = useState(false);

  const {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
    doneDate,
    tags,
  } = recipe;

  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <img
          style={ { width: '200px' } }
          src={ `${image}` }
          data-testid={ `${index}-horizontal-image` }
          alt={ `Imagem de ${type}` }
        />
      </Link>
      <Link to={ `/${type}s/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      </Link>
      { (type === 'comida') ? (
        <div>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { `${area} - ${category}` }
          </p>
          <ol>
            {tags.map((tag, i) => (
              <li
                key={ i }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                { tag }
              </li>
            ))}
          </ol>
        </div>)
        : (
          <p data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</p>) }
      <p data-testid={ `${index}-horizontal-done-date` }>
        Feita em:
        { doneDate }
      </p>
      <button
        type="button"
        src={ shareIcon }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => {
          copy(`http://localhost:3000/${type}s/${id}`);
          setClicked(true);
        } }
      >
        { clicked ? 'Link copiado!' : <img src={ shareIcon } alt="Share icon" /> }
      </button>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.shape({
      map: PropTypes.func,
    }),
    type: PropTypes.string,
  }).isRequired,
};

// [
//   {
//     id: '52771',
//     type: 'comida',
//     area: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//     doneDate: '23/06/2020',
//     tags: ['Pasta', 'Curry'],
//   },
//   {
//     id: '178319',
//     type: 'bebida',
//     area: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Aquamarine',
//     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//     doneDate: '23/06/2020',
//     tags: [],
//   },
// ]

//   <ol>
//   {
//     recipe.tags.map((element, index) => (
//       <li
//         key={ index }
//         data-testid={ `${index}-${element}-horizontal-tag` }
//       >
//         { element }
//       </li>
//     ))
//   }
// </ol>
