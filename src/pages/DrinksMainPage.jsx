import React from 'react';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import { useAppContext } from '../context/Provider';

export default function DrinksMainPage() {
  const { data } = useAppContext();
  const TWELVE_ITEMS = 12;
  return (
    <div>
      <Header title="Tela de Bebidas" searchButton />
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
