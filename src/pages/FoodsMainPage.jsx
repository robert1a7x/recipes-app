import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchAPI from '../helpers/fetchAPI';
import { useAppContext } from '../context/Provider';
import ButtonCategory from '../components/ButtonCategory';
import RecipeCard from '../components/RecipeCard';

import '../style/MainPages.css';

export default function FoodMainPage() {
  const [all, setAll] = useState(0);
  const { data, setData } = useAppContext();
  const TWELVE_ITEMS = 12;

  const fetchMeals = async () => {
    setData(await fetchAPI('meals', 'name', ''));
  };

  useEffect(() => {
    if (data) return setAll(0);
    setAll(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (all > 0) fetchMeals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all]);

  return (
    <div>
      <Header title="Tela de Comidas" searchButton />
      <div className="btn-categories">
        <ButtonCategory setAll={ setAll } all={ all } fetchRecipes={ fetchMeals } />
      </div>
      <div>
        { data && data.map((recipe, index) => (
          (index < TWELVE_ITEMS)
          && <RecipeCard key={ index } recipe={ recipe } index={ index } />
        )) }
      </div>
      <Footer />
    </div>
  );
}
