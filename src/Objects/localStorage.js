const getDataFromStorage = (() => {
  // Get/set user on a local session
  const setUser = (user = 'Anonymous') => localStorage.setItem('user', user);

  const getUser = () => localStorage.getItem('user');

  return {
    setUser, getUser,
  };
})();

export default getDataFromStorage;