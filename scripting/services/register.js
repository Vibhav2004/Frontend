async function registerUser() {
    // Get form values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const country = document.getElementById('country').value;

    // Basic validation
    if (!username || !email || !password) {
        alert("Username, Email and Password are required!");
        return;
    }

    // Prepare payload
    const payload = {
        username: username,
        email: email,
        password: password,
        country: country || null // if empty, send null
    };

    try {
        const response = await fetch('http://localhost:8080/Register-User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json(); // parse JSON regardless of status

        if (response.ok) {
            alert("User registered successfully!");
            localStorage.setItem("username", username);
             window.location.href = "/pages/home.html"; // redirect to login page
        } else {
            alert("Error: " + (data.message || "Failed to register"));
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("User already Registered");
    }
}
