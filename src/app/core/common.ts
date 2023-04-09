const token = 'token';

export const authToken = {
  setToken: (key: string) => sessionStorage.setItem(token, key),
  getToken: () => sessionStorage.getItem(token),
  getTokenOrError: () => {
    const val = sessionStorage.getItem(token);
    if (!val) console.error('No value for Token');
    return val as string;
  },
  hasToken: () => !!sessionStorage.getItem(token),
  deleteToken: () => sessionStorage.removeItem(token),
};
