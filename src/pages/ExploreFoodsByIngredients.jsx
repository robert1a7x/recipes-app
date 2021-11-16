import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import { useAppContext } from '../context/Provider';
import fetchAPI from '../helpers/fetchAPI';

export default function ExploreFoodsByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { loading, setLoading } = useAppContext();
  const MAX_ITEMS = 12;

  useEffect(() => {
    async function getData() {
      const response = await fetchAPI('meals', 'listIngredients', 'list');
      setIngredients(response);
      setLoading(false);
    }
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      { ingredients.map((ingredient, index) => (
        (index < MAX_ITEMS)
        && <IngredientCard ingredient={ ingredient } index={ index } key={ ingredient } />
      ))}
      <Footer />
    </div>
  );
}
