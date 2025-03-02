async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginError = document.getElementById("loginError");

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
        const response = await fetch('login.php', { // Or login.py, login.js, etc.
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                window.location.href = data.redirect; // Redirect to the user's page
            } else {
                loginError.style.display = "block"; // Show the error message
            }
        } else {
            loginError.innerText = "An error occurred. Please try again.";
            loginError.style.display = "block";
        }
    } catch (error) {
        console.error("Login error:", error);
        loginError.innerText = "An error occurred. Please try again.";
        loginError.style.display = "block";
    }
}