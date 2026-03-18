function renderUserInfo(user) {
  const section = document.getElementById('user-info');
  section.innerHTML = `
    <h2>User Info</h2>
    <p>ID: ${user.id}</p>
    <p>Login: ${user.login}</p>
  `;
}
