import { Suspense } from 'react';
import logo from './logo.svg';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from 'components/ErrorBundery';

import './App.css';

const App = () => {
  const { t } = useTranslation();
  return (
    <Suspense fallback="Loading...">
      <ErrorBoundary>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <h2>{t('key')}</h2>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;
