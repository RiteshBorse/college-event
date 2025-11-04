// Auth utility functions
export const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return getUser() !== null;
};

export const getUserRole = () => {
  const user = getUser();
  return user ? user.role : null;
};

export const getUserId = () => {
  const user = getUser();
  return user ? user._id : null;
};
