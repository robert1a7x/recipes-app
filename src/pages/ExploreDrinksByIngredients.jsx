import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import { useAppContext } from '../context/Provider';
import fetchAPI from '../helpers/fetchAPI';

export default function ExploreDrinksByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { loading, setLoading } = useAppContext();
  const MAX_ITEMS = 12;

  useEffect(() => {
    async function getData() {
      const response = await fetchAPI('drinks', 'listIngredients', 'list');
      setIngredients(response);
      setLoading(false);
    }
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <section className="parente-loading">
        <div className="loading" />
      </section>);
  }
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div className="ingredients-container">
        { ingredients && ingredients.map((ingredient, index) => (
          (index < MAX_ITEMS)
          && <IngredientCard ingredient={ ingredient } index={ index } key={ index } />
        ))}
      </div>
      <Footer />
    </div>
  );
}
