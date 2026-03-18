// Render user id and login into the user-info section
function renderUserInfo(user) {
  const section = document.getElementById('user-info');
  section.innerHTML = `
    <h2>User Info</h2>
    <p><span class='label'>ID</span><span class='value'>${user.id}</span></p>
    <p><span class='label'>Login</span><span class='value'>${user.login}</span></p>
  `;
}

// Compute total XP from transactions and render it into the xp section
function renderXP(transactions) {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  const section = document.getElementById('xp');
  section.innerHTML = `
    <h2>XP</h2>
    <p><span class='label'>Total</span><span class='value'>${total.toLocaleString()} xp</span></p>
  `;
}

// Render audit ratio, total done and total received into the audits section
function renderAudits(user) {
  const section = document.getElementById('audits');
  section.innerHTML = `
    <h2>Audits</h2>
    <p><span class='label'>Ratio</span><span class='value'>${user.auditRatio.toFixed(2)}</span></p>
    <p><span class='label'>Done</span><span class='value'>${user.totalUp.toLocaleString()} xp</span></p>
    <p><span class='label'>Received</span><span class='value'>${user.totalDown.toLocaleString()} xp</span></p>
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
  renderXPOverTime(xpData.transaction);
  renderXPByProject(xpData.transaction);
}

init();
