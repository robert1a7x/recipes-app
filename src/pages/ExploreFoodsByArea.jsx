import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

import fetchAPI from '../helpers/fetchAPI';
import { useAppContext } from '../context/Provider';

export default function ExploreFoodsByArea() {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const { loading, setLoading } = useAppContext();
  const MAX_ITEMS = 12;

  useEffect(() => {
    async function getCategories() {
      const response = await fetchAPI('meals', 'listArea', 'list');
      setCategories(response);
      setSelectedCategory(response[0].strArea);
      setLoading(false);
    }
    getCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getData() {
      const response = selectedCategory === 'All'
        ? await fetchAPI('meals', 'name', '')
        : await fetchAPI('meals', 'area', selectedCategory);
      setRecipes(response);
    }
    getData();
  }, [selectedCategory]);

  if (loading) {
    return (
      <section className="parente-loading">
        <div className="loading" />
      </section>);
  }

  return (
    <div>
      <Header title="Explorar Origem" searchButton />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ (e) => setSelectedCategory(e.target.value) }
      >
        <option value="All" data-testid="All-option">All</option>
        {categories.map(({ strArea }) => (
          <option value={ strArea } data-testid={ `${strArea}-option` } key={ strArea }>
            { strArea }
          </option>
        ))}
      </select>
      { recipes && recipes.map((recipe, index) => (
        (index < MAX_ITEMS)
        && <RecipeCard recipe={ recipe } index={ index } key={ recipe } />
      ))}
      <Footer />
    </div>
  );
}
