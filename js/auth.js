// Signin endpoint
const SIGNIN_URL = 'https://zone01normandie.org/api/auth/signin';

/*
  Handle login form submission.
  Encodes credentials in base64, sends a POST request with Basic auth.
  Stores the JWT in localStorage and redirects to the profile page on success.
*/
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const identifier = document.getElementById('identifier').value.trim();
  const password = document.getElementById('password').value;

  clearError();

  // Encode credentials as base64 for Basic auth
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

    // Store JWT and redirect to profile
    const token = await response.json();
    localStorage.setItem('jwt', token);
    window.location.href = 'profile.html';
  } catch (err) {
    showError('Connection error. Please try again.');
  }
});

// Display an error message in the error element
function showError(message) {
  const errorEl = document.getElementById('error-message');
  errorEl.textContent = message;
  errorEl.classList.remove('hidden');
}

// Hide and reset the error element
function clearError() {
  const errorEl = document.getElementById('error-message');
  errorEl.textContent = '';
  errorEl.classList.add('hidden');
}

// Remove JWT from localStorage and redirect to login page
function logout() {
  localStorage.removeItem('jwt');
  window.location.href = 'index.html';
}
