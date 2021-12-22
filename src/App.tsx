import { Provider } from 'react-redux';

import ErrorBoundary from 'components/ErrorBundery';
import store from 'state/store';
import AppRoutes from 'Routes';

const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
