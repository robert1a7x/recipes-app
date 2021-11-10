import React from 'react';
import { useHistory } from 'react-router';
import { useAppContext } from '../context/Provider';
import fetchAPI from '../helpers/fetchAPI';

export default function SearchBar() {
  const history = useHistory();

  const {
    searchType,
    setData,
    setSearchType,
    setSearchInput,
    searchInput,
    pathname, // /comidas ou /bebidas
  } = useAppContext();

  async function filterSearch() {
    if (searchType === 'firstletter' && searchInput.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    const results = await (pathname.includes('comidas'))
      ? await fetchAPI('meals', searchType, searchInput)
      : await fetchAPI('drinks', searchType, searchInput);
    if (results) setData(results);

    if (!results) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }

    if (results && results.length === 1) {
      return history.push(pathname.includes('comidas')
        ? `${pathname}/${results[0].idMeal}`
        : `${pathname}/${results[0].idDrink}`);
    }
  }

  return (
    <form>
      <input
        data-testid="search-input"
        placeholder="Digite sua pesquisa"
        value={ searchInput }
        onChange={ (e) => setSearchInput(e.target.value) }
      />

      <label htmlFor="ingredient">
        <input
          type="radio"
          name="filter"
          id="ingredient"
          data-testid="ingredient-search-radio"
          onClick={ (e) => setSearchType(e.target.id) }
        />
        Ingredientes
      </label>

      <label htmlFor="name">
        <input
          type="radio"
          id="name"
          name="filter"
          data-testid="name-search-radio"
          onClick={ (e) => setSearchType(e.target.id) }
        />
        Nome
      </label>

      <label htmlFor="firstletter">
        <input
          type="radio"
          id="firstletter"
          name="filter"
          data-testid="first-letter-search-radio"
          onClick={ (e) => setSearchType(e.target.id) }
        />
        Primeira letra
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => filterSearch() }
      >
        Buscar
      </button>
    </form>

  );
}
