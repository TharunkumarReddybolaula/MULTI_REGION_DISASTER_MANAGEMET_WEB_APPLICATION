// Handle registration form submission
document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const email = document.getElementById('registerEmail').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email }),
        });

        const result = await response.text();
        alert(result);
    } catch (error) {
        alert('Error registering user: ' + error.message);
    }
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.text();
        alert(result);
    } catch (error) {
        alert('Error logging in: ' + error.message);
    }
});

// Handle password reset form submission
document.getElementById('resetPasswordForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('resetEmail').value;

    try {
        const response = await fetch('/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const result = await response.text();
        alert(result);
    } catch (error) {
        alert('Error sending reset email: ' + error.message);
    }
});
