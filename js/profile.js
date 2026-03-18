// Render user id and login into the user-info section
function renderUserInfo(user) {
  const section = document.getElementById('user-info');
  section.innerHTML = `
    <h2>User Info</h2>
    <p>ID: ${user.id}</p>
    <p>Login: ${user.login}</p>
  `;
}

// Compute total XP from transactions and render it into the xp section
function renderXP(transactions) {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  const section = document.getElementById('xp');
  section.innerHTML = `
    <h2>XP</h2>
    <p>Total XP: ${total}</p>
  `;
}

// Render audit ratio, total done and total received into the audits section
function renderAudits(user) {
  const section = document.getElementById('audits');
  section.innerHTML = `
    <h2>Audits</h2>
    <p>Audit ratio: ${user.auditRatio.toFixed(2)}</p>
    <p>Done: ${user.totalUp}</p>
    <p>Received: ${user.totalDown}</p>
  `;
}

/*
  Entry point for the profile page.
  Redirects to login if no JWT is found.
  Fetches user data and XP, then renders all sections.
*/
async function init() {
  if (!localStorage.getItem('jwt')) {
    window.location.href = 'index.html';
    return;
  }

  const userData = await getUser();
  const user = userData.user[0];
  renderUserInfo(user);
  renderAudits(user);

  const xpData = await getXP();
  renderXP(xpData.transaction);
}

init();
