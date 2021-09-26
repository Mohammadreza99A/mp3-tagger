import React, { useEffect } from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';

import { injectStyle } from 'react-toastify/dist/inject-style';
import { ToastContainer, toast } from 'react-toastify';

// Theme Provider
import { ThemeProvider } from '@material-ui/core/styles';
import globalTheme from './styles/globalStyle';

// Components
import Home from './pages/home';
import SearchMetadataResultsPage from './pages/searchMetadataResults';

import MetadataProvider from './context/MetadataContext';
import SearchMetadataProvider from './context/SearchMetadataContext';

import Notification from './types/notification';

export default function App() {
  // CSS style for the notifications
  toast.configure();
  injectStyle();

  const showNotification = (notification: Notification) => {
    if (notification.message === 'Applied the selected metadata.') {
      toast.dismiss();
    }
    toast(notification.message, { type: notification.type });
  };

  useEffect(() => {
    window.electron.ipcRenderer.notify((notification: Notification) => {
      showNotification(notification);
    });
  });

  return (
    <MetadataProvider>
      <SearchMetadataProvider>
        <ThemeProvider theme={globalTheme}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="dark"
          />
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
