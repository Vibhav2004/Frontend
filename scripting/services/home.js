  if (!username) {
        // ❌ Not logged in → redirect
        window.location.href = "/pages/login.html";
    } else {
        // ✅ Logged in
        document.getElementById("user").innerText = "Welcome " + username;
    }