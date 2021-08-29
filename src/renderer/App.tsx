import React from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';

// Theme Provider
import { ThemeProvider } from '@material-ui/core/styles';
import globalTheme from './styles/globalStyle';

// Components
import Home from './pages/home';
import SearchMetadataResultsPage from './pages/searchMetadataResults';

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
              <Route
                path="/searchMetadataResults"
                exact
                component={SearchMetadataResultsPage}
              />
            </Switch>
          </Router>
        </ThemeProvider>
      </SearchMetadataProvider>
    </MetadataProvider>
  );
}
