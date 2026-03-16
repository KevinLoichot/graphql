const SIGNIN_URL = 'https://zone01normandie.org/api/auth/signin';

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const identifier = document.getElementById('identifier').value.trim();
  const password = document.getElementById('password').value;

  clearError();
});
