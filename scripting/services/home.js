const userType = sessionStorage.getItem("userType");
const usernames = sessionStorage.getItem("username");

if (userType !== "guest" && usernames) {
  // ✅ Logged-in user
 alert(`Welcome back, ${usernames}!`);
 sessionStorage.removeItem("userType");

}
else if (userType === "guest") {

  alert("You are logged in as Guest");
  sessionStorage.setItem("username",userType)
    
}
else {

  window.location.href = "/pages/login.html";
}
