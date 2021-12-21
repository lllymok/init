const authorizationHeaders = {
  bearer: (accessToken: string) => `Bearer ${accessToken}`,
};

export default authorizationHeaders;
