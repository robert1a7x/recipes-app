import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import '../Detail.css';

export default function Recommendations({ items }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <Carousel responsive={ responsive }>
      { items && items.map((item, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recomendation-card` }
        >
          <img
            src={ item.strDrinkThumb || item.strMealThumb }
            alt={ `imagem ${item.strDrink || item.strMeal}` }
            width={ 200 }
          />
          <p
            data-testid={ `${index}-recomendation-title` }
          >
            { item.strMeal || item.strDrink }
          </p>
        </div>
      )) }
    </Carousel>
  );
}

Recommendations.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
