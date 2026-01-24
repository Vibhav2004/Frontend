
  function fetchUserProfile(username) {
  fetch(API.getProfile(username))
    .then(res => {
      if (!res.ok) throw new Error("User not found");
      return res.json();
    })
    .then(data => { 
      document.getElementById("profilePics").src = `/assests/pfp/${data.pfp || '2.png'}`;
      document.getElementById("usernameTexts").textContent = `@${data.username}`;
      document.getElementById("scoreBoxs").innerHTML = `${data.score}<br>Score`;
      document.getElementById("rankBoxs").innerHTML = `${data.swipes}<br>Swipes`;
      document.getElementById("streakBoxs").innerHTML = `${data.streak}🔥<br>Streak`;
      document.getElementById("friendsBoxs").innerHTML = `${data.friends ||0}<br>Friends`;
      document.getElementById("memeBoxs").innerHTML = `${data.memes || 0}<br>Memes`;

      // ✅ Check if already friends
      const myUsername = sessionStorage.getItem("username");
      if (username === myUsername) {
        // Searching yourself → hide button
        document.querySelector(".add-friend").style.display = "none";
      } else {
        document.querySelector(".add-friend").style.display = "flex";
        checkFriendshipStatus(myUsername, username);
      }

      profileOverlay.style.display = "flex"; // show popup
    })
    .catch(err => {
      console.error(err);
      alert("User not found");
    });
}
function checkFriendshipStatus(myUsername, otherUsername) {
  fetch(API.checkFriendship(myUsername, otherUsername))
    .then(res => res.json())
    .then(isFriend => {
      const addBtn = document.querySelector(".add-friend");
      if (isFriend) {
        addBtn.classList.add("added");
        addBtn.textContent = "Friends";
      } else {
        addBtn.classList.remove("added");
        addBtn.textContent = "Add Friend";
      }
    })
    .catch(err => console.error("Error checking friendship:", err));
}

