if(sessionStorage.getItem("userType") === "guest"){
    alert("login to see access all features");
    sessionStorage.removeItem("userType");
    window.location.href = "/pages/login.html";
}

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
        const response = await fetch(API.loginUser(), {
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
           sessionStorage.setItem("email", data.email);
           localStorage.setItem("email", data.email);
            window.location.href = "/pages/home.html"; // redirect to login page
        } else {
            alert("Error: " + (data.message || "Failed to register"));
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Unsuccessful to Login");
    }
}
