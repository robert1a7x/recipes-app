import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useAppContext } from '../context/Provider';

import RecipeCard from '../components/RecipeCard';

export default function FoodMainPage() {
  const { data } = useAppContext();
  const TWELVE_ITEMS = 12;
  return (
    <div>
      <Header title="Tela de Comidas" searchButton />
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
