const path = {
  home: '/',
  forbidden: '/forbidden',
  something_went_wrong: '/something-went-wrong',
  login: '/login',
  dashboard: '/dashboard',
} as const;

export type Paths = typeof path[keyof typeof path];

export default path;
