function storeUser(credentials: { email: string; token: string }) {
  localStorage.setItem('credentials', JSON.stringify(credentials));
}

function getUser(): { email: string; token: string } | null {
  const credentials = localStorage.getItem('credentials');
  if (credentials) {
    return JSON.parse(credentials);
  }
  return null;
}

export { storeUser, getUser };
