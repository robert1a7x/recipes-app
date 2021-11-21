import React, { useEffect, useState } from 'react';
import fetchAPI from '../helpers/fetchAPI';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import { useAppContext } from '../context/Provider';
import ButtonCategory from '../components/ButtonCategory';
import '../style/MainPages.css';

export default function DrinksMainPage() {
  const [all, setAll] = useState(0);
  const { data, setData } = useAppContext();
  const TWELVE_ITEMS = 12;

  const fetchDrinks = async () => {
    setData(await fetchAPI('drinks', 'name', ''));
  };

  useEffect(() => {
    if (data) return setAll(0);
    setAll(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (all > 0) fetchDrinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all]);

  return (
    <div>
      <Header title="Tela de Bebidas" searchButton />
      <div className="btn-categories">
        <ButtonCategory setAll={ setAll } all={ all } fetchRecipes={ fetchDrinks } />
      </div>
      <div className="food-cards-section">
        { data && data.map((recipe, index) => (
          (index < TWELVE_ITEMS)
          && <RecipeCard key={ index } recipe={ recipe } index={ index } />
        )) }
      </div>
      <Footer />
    </div>
  );
}
