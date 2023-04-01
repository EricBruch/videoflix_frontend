export const baseUrl = 'http://127.0.0.1:8000' as const;

export const authToken = {
  setToken: (key: string) => sessionStorage.setItem('token', key),
  getToken: () => sessionStorage.getItem('token'),
  getTokenOrError: () => {
    const val = sessionStorage.getItem('token');
    if (!val) console.error('No value for Token');
    return val as string;
  },
};
