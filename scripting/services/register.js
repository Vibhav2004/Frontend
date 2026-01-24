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
if(sessionStorage.getItem("userType") === "guest"){
    alert("login to see access all features");
    sessionStorage.removeItem("userType");
    window.location.href = "/pages/register.html";
}
    // Prepare payload
    const payload = {
        username: username,
        email: email,
        password: password,
        country: country || null // if empty, send null
    };

    try {
        const response = await fetch(API.registerUser(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json(); // parse JSON regardless of status

        if (response.ok) {
            alert("User registered successfully!");
            // sessionStorage.removeItem("userType");
            
            sessionStorage.setItem("username", username);
             window.location.href = "/pages/home.html"; // redirect to login page
        } else {
            alert("Error: " + (data.message || "Failed to register"));
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("User already Registered");
    }
}
