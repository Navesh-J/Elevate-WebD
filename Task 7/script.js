const usersContainer = document.getElementById('users');
const reloadBtn = document.getElementById('reloadBtn');

async function fetchUsers() {
  usersContainer.innerHTML = '<p>Loading users...</p>';
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const users = await res.json();
    displayUsers(users);
  } catch (err) {
    usersContainer.innerHTML = `<div class="error">⚠ ${err.message}</div>`;
  }
}

function displayUsers(users) {
  usersContainer.innerHTML = '';
  users.forEach(user => {
    const div = document.createElement('div');
    div.className = 'user';
    div.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      <p><strong>Company:</strong> ${user.company.name}</p>
    `;
    usersContainer.appendChild(div);
  });
}

reloadBtn.addEventListener('click', fetchUsers);
fetchUsers();
