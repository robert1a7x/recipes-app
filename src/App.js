import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';
import Login from './pages/Login';
import FoodsMainPage from './pages/FoodsMainPage';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import DrinksMainPage from './pages/DrinksMainPage';
import FoodDetail from './pages/FoodDetail';
import DrinkDetail from './pages/DrinkDetail';
import ExploreFoods from './pages/ExploreFoods';
import FoodInProgress from './pages/FoodInProgress';
import DrinksInProgress from './pages/DrinksInProgress';
import ExploreFoodsByIngredients from './pages/ExploreFoodsByIngredients';
import Profile from './pages/Profile';
import CompleteRecipes from './pages/CompleteRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ExploreFoodsByArea from './pages/ExploreFoodsByArea';
import ExploreDrinksByIngredients from './pages/ExploreDrinksByIngredients';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ FoodsMainPage } />
        <Route exact path="/bebidas" component={ DrinksMainPage } />
        <Route exact path="/comidas/:id" component={ FoodDetail } />
        <Route exact path="/bebidas/:id" component={ DrinkDetail } />
        <Route
          exact
          path="/comidas/:id/in-progress"
          component={ FoodInProgress }
        />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          component={ DrinksInProgress }
        />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreFoods } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodsByIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinksByIngredients }
        />
        <Route exact path="/explorar/comidas/area" component={ ExploreFoodsByArea } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ CompleteRecipes } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route component={ NotFound } />
      </Switch>
    </Provider>
  );
}
