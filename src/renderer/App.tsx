import React from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';

// Theme Provider
import { ThemeProvider } from '@material-ui/core/styles';
import globalTheme from './styles/globalStyle';

// Components
import Home from './pages/home';

import MetadataProvider from './context/MetadataContext';
import SearchMetadataProvider from './context/SearchMetadataContext';

export default function App() {
  return (
    <MetadataProvider>
      <SearchMetadataProvider>
        <ThemeProvider theme={globalTheme}>
          <Router>
            <Switch>
              <Route path="/" exact component={Home} />
            </Switch>
          </Router>
        </ThemeProvider>
      </SearchMetadataProvider>
    </MetadataProvider>
  );
}
