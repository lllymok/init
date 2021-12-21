import { combineReducers } from '@reduxjs/toolkit';
import loginReducer, { signOut } from 'pages/login/loginSlice';

const appReducer = combineReducers({
  login: loginReducer,
});

const rootReducer = (state, action) => {
  if (action.type === signOut.type) {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
