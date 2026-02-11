const userType = localStorage.getItem("userType");
const usernames = localStorage.getItem("username");

if (userType !== "guest" && usernames) {
  // ✅ Logged-in user
 
 localStorage.removeItem("userType");

}
else if (userType === "guest") {

  alert("You are logged in as Guest");
  localStorage.setItem("username",userType)
    
}
else {

  window.location.href = "/pages/login.html";
}
