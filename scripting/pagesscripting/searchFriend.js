const searchInputs = document.querySelector(".primary input");
const profileOverlays = document.getElementById("profileOverlay");


/* ===============================
   SEARCH USER PROFILE
================================ */

searchInputs.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    const searchedUser = searchInputs.value.trim();
    if (!searchedUser) return;
     if(searchedUser != sessionStorage.getItem("username")){
      // alert("You cannot search yourself");
      fetchUserProfile(searchedUser);
      // return;
     }else{
      return;
     }
    
  }
});

function fetchUserProfile(username) {
  fetch(API.getProfile(username))
    .then(res => {
      if (!res.ok) throw new Error("User not found");
      return res.json();
    })
    .then(data => {
      document.getElementById("usernameTexts").textContent = `@${data.username}`;
  // document.getElementById("profilePics").src = "/assests/pfp/3.png";
  console.log(data);
  
   document.getElementById("profilePics").src = `/assests/pfp/${data.pfp || '2.png'}`;


  // MAIN STATS
  document.getElementById("scoreBoxs").innerHTML =
    `${data.score ||0}<br>Score`;

  document.getElementById("rankBoxs").innerHTML =
    `${data.swipes ||0}<br>Swipes`;

  document.getElementById("streakBoxs").innerHTML =
    `${data.streak ||0}🔥<br>Streak`;

  // SECONDARY STATS
  document.getElementById("friendsBoxs").innerHTML =
    `${data.friends ||0}<br>Friends`;

  document.getElementById("memeBoxs").innerHTML =
    `${data.memes || 0}<br>Memes`;
      profileOverlays.style.display = "flex"; // show popup
    })
    .catch(err => {
      console.error(err);
      alert("User not found");
    });
}

/* ===============================
   UI HELPERS
================================ */

function closePopup() {
  profileOverlay.style.display = "none";
}

