async function registerUser() {
    // Get form values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const country = document.getElementById('country').value;
    let swipes=0
    let streak=0
    let score=0
    // Basic validation
    if (!username || !email || !password) {
        alert("Username, Email and Password are required!");
        return;
    }
if(localStorage.getItem("userType") === "guest"){
    alert("login to see access all features");
      swipes=localStorage.getItem("GuestTotalSwipes");
      streak=localStorage.getItem("GuestStreakIncrement");
      score=localStorage.getItem("GuestRightSwipes")*3+localStorage.getItem("GuestStreakIncrement")*5 ;
    localStorage.removeItem("userType");
    
}

  
    // Prepare payload
    const payload = {
        username: username,
        email: email,
        password: password,
        country: country || null, // if empty, send null
        swipes:swipes || 0,
        streak:streak || 0,
        score:score || 0
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
            localStorage.setItem("isLoggedIn", "true");


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
