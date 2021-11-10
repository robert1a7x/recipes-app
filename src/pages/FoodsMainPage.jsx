import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchAPI from '../helpers/fetchAPI';
import { useAppContext } from '../context/Provider';
import ButtonCategory from '../components/ButtonCategory';

import RecipeCard from '../components/RecipeCard';

export default function FoodMainPage() {
  const [all, setAll] = useState(0);
  const { data, setData } = useAppContext();
  const TWELVE_ITEMS = 12;

  useEffect(() => {
    const fetchMeals = async () => {
      setData(await fetchAPI('meals', 'name', ''));
    };
    fetchMeals();
  }, [all]);

  return (
    <div>
      <Header title="Tela de Comidas" searchButton />
      <ButtonCategory setAll={ setAll } all={ all } />
      <div>
        { data.map((recipe, index) => (
          (index < TWELVE_ITEMS)
          && <RecipeCard key={ index } recipe={ recipe } index={ index } />
        )) }
      </div>
      <Footer />
    </div>
  );
}
