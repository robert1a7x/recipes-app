import React, { useEffect } from 'react';
import { useAppContext } from '../context/Provider';
import fetchAPI from '../helpers/fetchAPI';

export default function SearchBar() {
  const {
    data,
    searchType,
    setData,
    setSearchType,
    setSearchInput,
    searchInput,
    pathname, // /comidas ou /bebidas
  } = useAppContext();

  useEffect(() => {
    console.log(data);
    console.log(pathname);
  }, [data]);

  async function filterSearch() {
    const results = await (pathname.includes('comidas'))
      ? await fetchAPI('meals', searchType, searchInput)
      : await fetchAPI('drinks', searchType, searchInput);
    setData(results);
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
