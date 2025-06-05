const form = document.getElementById('registrationForm');
const tableBody = document.getElementById('userTable');

function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    tableBody.innerHTML = '';
    users.forEach(user => {
        const row = `<tr>
    <td class="p-2 border">${user.name}</td>
    <td class="p-2 border">${user.email}</td>
    <td class="p-2 border">${user.password}</td>
    <td class="p-2 border">${user.dob}</td>
    <td class="p-2 border">${user.termsAccepted}</td>
</tr>`;
        tableBody.innerHTML += row;
    });
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked;

    if (!termsAccepted) {
        alert('You must accept the terms and conditions.');
        return;
    }

    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        alert('Only users between 18 and 55 years old can register.');
        return;
    }

    const newUser = { name, email, password, dob, termsAccepted };
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    form.reset();
    loadUsers();
});

window.onload = loadUsers;
