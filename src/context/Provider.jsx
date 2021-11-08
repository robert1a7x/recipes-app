import React from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext();

export default function Provider({ children }) {
  return (
    <AppContext.Provider>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
