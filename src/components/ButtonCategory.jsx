import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchAPI from '../helpers/fetchAPI';
import { useAppContext } from '../context/Provider';

export default function ButtonCategory({ setAll, all, fetchRecipes }) {
  const { pathname, setData } = useAppContext();
  const [categories, setCategories] = useState([]);
  const [stateButton, setStateButton] = useState('');

  const CINCO = 5;
  useEffect(() => {
    const fetchCategories = async () => (
      (pathname.includes('comidas'))
        ? setCategories(await fetchAPI('meals', 'list', 'list'))
        : setCategories(await fetchAPI('drinks', 'list', 'list'))
    );
    fetchCategories();
  }, []);

  // const verify = (elem) => {
  // };

  const fetchByCategory = async (value) => {
    if (value === stateButton) {
      console.log(value);
      fetchRecipes();
      return setStateButton('');
    }
    setStateButton(value);
    return (pathname.includes('comidas'))
      ? setData(await fetchAPI('meals', 'category', value))
      : setData(await fetchAPI('drinks', 'category', value));
  };

  const fetchAllCategories = () => {
    setAll(all + 1);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => fetchAllCategories() }
      >
        All
      </button>
      {categories.length && categories.map((category, index) => (
        index < CINCO && (
          <button
            type="button"
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ (e) => fetchByCategory(e.target.innerText) }
          >
            {category.strCategory}
          </button>
        )))}
    </div>
  );
}

ButtonCategory.propTypes = {
  all: PropTypes.number.isRequired,
  setAll: PropTypes.func.isRequired,
  fetchRecipes: PropTypes.func.isRequired,
};
