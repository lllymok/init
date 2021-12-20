import logo from './logo.svg';
import { useTranslation } from 'react-i18next';

import ErrorBoundary from 'components/ErrorBundery';
import SwitchLanguages from './components/SwitchLanguges';

import './App.css';

const App = () => {
  const { t } = useTranslation(['common', 'login']);
  return (
    <ErrorBoundary>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <h2>{t('common:welcome')}</h2>
          <h2>{t('login:login')}</h2>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <SwitchLanguages />
        </header>
      </div>
    </ErrorBoundary>
  );
};

export default App;
