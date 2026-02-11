
document.addEventListener("DOMContentLoaded", loadProfile);

function loadProfile() {
  const username = localStorage.getItem("username");
  if (!username) {
    console.error("No session username found");
    return;
  }

  fetch(API.getProfile(username))
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch profile");
      return res.json();
    })
    .then(data => updateUI(data))
    .catch(err => console.error(err));
}

function updateUI(user) {
  // PROFILE INFO
  document.getElementById("usernameText").textContent = `@${user.username}`;
  document.getElementById("profilePic").src = `/assests/pfp/${user.pfp || '2.png'}`;

  // MAIN STATS
  document.getElementById("scoreBox").innerHTML =
    `${user.score ||0}<br>Score`;

  document.getElementById("rankBox").innerHTML =
    `${user.swipes ||0}<br>Swipes`;

  document.getElementById("streakBox").innerHTML =
    `${user.streak ||0}🔥<br>Streak`;

  // SECONDARY STATS
  document.getElementById("friendsBox").innerHTML =
    `${user.friends ||0}<br>Friends`;

  document.getElementById("memeBox").innerHTML =
    `${user.memes || 0}<br>Memes`;
}

// function goToEdit() {
//   window.location.href = "/edit-profile.html";
// }
