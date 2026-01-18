async function loginUser() {
    // Get form values
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    

    // Basic validation
    if (!email || !password) {
        alert("Email and Password are required!");
        return;
    }

    // Prepare payload
    const payload = {
       
        email: email,
        password: password,
        
    };

    try {
        const response = await fetch('http://localhost:8080/Login-User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json(); // parse JSON regardless of status

        if (response.ok) {
            alert("Successfully Logged in");
            console.log(data.username);
            
           sessionStorage.setItem("username", data.username);

            window.location.href = "/pages/home.html"; // redirect to login page
        } else {
            alert("Error: " + (data.message || "Failed to register"));
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Unsuccessful to Login");
    }
}
