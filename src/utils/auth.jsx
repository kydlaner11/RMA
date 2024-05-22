import Cookies from 'js-cookie';

export const isAuthenticated = () => {
  // Check if the authentication token exists in cookies
  return !!Cookies.get('access_token'); // Example logic
};
