const BASE_URL = "http://192.168.73.1:8081"; 
// const BASE_URL="https://alica-uncrumpled-undangerously.ngrok-free.dev"
// change to your backend IP when needed

const API = {
  // ================= USER =================
  getProfile: (username) =>
    `${BASE_URL}/profile/${username}`,

  updateUser: () =>
    `${BASE_URL}/update`,

  registerUser: () =>
    `${BASE_URL}/Register-User`,

  loginUser: () =>
    `${BASE_URL}/Login-User`,

  getAllUsers: () =>
    `${BASE_URL}/All-User`,

  // ================= FRIENDS =================
  addFriend: () =>
    `${BASE_URL}/add-friends`,

  checkFriendship: (username1, username2) =>
    `${BASE_URL}/friends/check?username1=${username1}&username2=${username2}`,

  getFriendsList: (username) =>
    `${BASE_URL}/view_friends/${username}`,

  //===========pfp========================
  uploadPFP: () =>
    `${BASE_URL}/profile-pic`,

  getPFP: (username) =>
    `${BASE_URL}/Get-profile-pic`,

   sendOtp: (email) =>
    `${BASE_URL}/send?email=${encodeURIComponent(email)}`,

  verifyOtp: (email, otp) =>
    `${BASE_URL}/verify?email=${encodeURIComponent(email)}&otp=${otp}`,
  updatePassword: () =>
    `${BASE_URL}/update-password`,

  updateUsername: () =>
    `${BASE_URL}/update-username`,
};

// expose globally
window.API = API;
