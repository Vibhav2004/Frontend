if(localStorage.getItem("userType") === "guest"){
    alert("login to see access all features");
    localStorage.removeItem("userType");
    window.location.href = "/pages/login.html";
}

async function loginUser() {
    // Get form values
       
        const btn = document.getElementById("registered");
    const text = document.getElementById("registerText");
    const loader = document.getElementById("registerLoader");

    // 🔹 Start loading
  
    text.textContent = "Logging in...";
    loader.style.display = "inline-block";


    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    

    // Basic validation
    if (!email || !password) {
        alert("Email and Password are required!");
       
        text.textContent = "Login";
        loader.style.display = "none";
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
            // console.log(data.username);
            localStorage.setItem("isLoggedIn", "true");

// After successful login or registration
localStorage.setItem('showHomeConfetti', 'true');
           localStorage.setItem("username", data.username);
           localStorage.setItem("email", data.email);
           localStorage.setItem("pfp", data.pfp);
           localStorage.setItem("email", data.email);
            window.location.href = "/pages/home.html"; // redirect to login page
        } else {
            alert("Error: " + (data.message || "Failed to register"));
              
        text.textContent = "Login";
        loader.style.display = "none";
        }
    } catch (error) {
        // window.location.href="/pages/error.html"; 
        console.error("Network error:", error);
        alert("Unsuccessful to Login");
     
        text.textContent = "Login";
        loader.style.display = "none";
    }
}
