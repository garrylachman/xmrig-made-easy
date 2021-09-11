import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Header } from './components/header';

import './App.global.scss';
import { Sidebar } from './components/sidebar';
import Routes from './core/Routes';
import { FixedCenteredSpinner } from './components/core/Spinner';
import { XMRigContextProvider } from './xmrig-config';
import { UIContextProvider } from './core/UI';
import { Breadcrumbs } from './components/core/Breadcrumbs';

export default function App() {
  return (
    <UIContextProvider>
      <XMRigContextProvider>
        <React.Suspense fallback={<FixedCenteredSpinner />}>
          <Router>
            <div className="p-5 bg-base-200">
              <Header />
              <div className="flex flex-no-wrap py-5">
                <Sidebar />
                <div className="container mx-auto w-9/12 pl-5">
                  <Breadcrumbs />
                  <Routes />
                </div>
              </div>
            </div>
          </Router>
        </React.Suspense>
      </XMRigContextProvider>
    </UIContextProvider>
  );
}
