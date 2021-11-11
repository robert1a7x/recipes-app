import React, { useEffect, useState } from 'react';
import fetchAPI from '../helpers/fetchAPI';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import { useAppContext } from '../context/Provider';
import ButtonCategory from '../components/ButtonCategory';

export default function DrinksMainPage() {
  const [all, setAll] = useState(0);
  const { data, setData } = useAppContext();
  const TWELVE_ITEMS = 12;

  const fetchDrinks = async () => {
    setData(await fetchAPI('drinks', 'name', ''));
  };

  useEffect(() => {
    fetchDrinks();
  }, [all]);

  return (
    <div>
      <Header title="Tela de Bebidas" searchButton />
      <ButtonCategory setAll={ setAll } all={ all } fetchRecipes={ fetchDrinks } />
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
