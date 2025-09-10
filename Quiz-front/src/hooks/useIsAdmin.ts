import Cookies from 'universal-cookie';
export const useIsAdmin = () => {
  const cookies = new Cookies();
  return cookies.get('is-admin');
};
