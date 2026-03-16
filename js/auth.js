const SIGNIN_URL = 'https://zone01normandie.org/api/auth/signin';

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const identifier = document.getElementById('identifier').value.trim();
  const password = document.getElementById('password').value;

  clearError();

  const credentials = btoa(`${identifier}:${password}`);

  try {
    const response = await fetch(SIGNIN_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
      },
    });

    if (!response.ok) {
      showError('Invalid credentials. Please try again.');
      return;
    }

    const token = await response.json();
    localStorage.setItem('jwt', token);
    window.location.href = 'profile.html';
  } catch (err) {
    showError('Connection error. Please try again.');
  }
});

function showError(message) {
  const errorEl = document.getElementById('error-message');
  errorEl.textContent = message;
  errorEl.classList.remove('hidden');
}

function clearError() {
  const errorEl = document.getElementById('error-message');
  errorEl.textContent = '';
  errorEl.classList.add('hidden');
}
