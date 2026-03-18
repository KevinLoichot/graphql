function renderUserInfo(user) {
  const section = document.getElementById('user-info');
  section.innerHTML = `
    <h2>User Info</h2>
    <p>ID: ${user.id}</p>
    <p>Login: ${user.login}</p>
  `;
}

function renderXP(transactions) {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  const section = document.getElementById('xp');
  section.innerHTML = `
    <h2>XP</h2>
    <p>Total XP: ${total}</p>
  `;
}
