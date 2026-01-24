function viewFriends() {
  const username = sessionStorage.getItem("username");

  fetch(API.getFriendsList(username))
    .then(res => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(data => {
     
      showFriendsPopup(data, username);
    })
    .catch(err => console.error("Error checking friendship:", err));
}

function showFriendsPopup(friends, username) {

  // remove existing popup if any
  const oldPopup = document.getElementById("friends-popup");
  if (oldPopup) oldPopup.remove();

  // overlay
  const overlay = document.createElement("div");
  overlay.id = "friends-popup";
  Object.assign(overlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "1000"
  });

  // popup box
  const popup = document.createElement("div");
  Object.assign(popup.style, {
    width: "320px",
    maxHeight: "450px",
    background: "#111",
    borderRadius: "14px",
    padding: "15px",
    color: "#fff",
    overflowY: "auto",
    fontFamily: "Arial, sans-serif"
  });

  // header
  const title = document.createElement("div");
  title.innerText = "Friends";
  Object.assign(title.style, {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "12px"
  });

  popup.appendChild(title);

  // friends list
  friends.forEach(f => {
    const friendName =
      f.friend1 === username ? f.friend2 : f.friend1;

    const row = document.createElement("div");
    Object.assign(row.style, {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "10px",
      padding: "8px",
      background: "#1c1c1c",
      borderRadius: "10px"
    });

    // left side (pfp + name)
    const left = document.createElement("div");
    Object.assign(left.style, {
      display: "flex",
      alignItems: "center",
      gap: "10px"
    });

    // pfp
    const pfp = document.createElement("img");
pfp.src = `/assests/pfp/${sessionStorage.getItem("pfp") || "2.png"}`; // use default if missing
Object.assign(pfp.style, {
  width: "40px",
  height: "40px",
  borderRadius: "50%"
});


    // username
    const name = document.createElement("span");
    name.innerText = friendName;
    Object.assign(name.style, {
      fontSize: "14px",
      fontWeight: "500"
    });

    left.appendChild(pfp);
    left.appendChild(name);

    // button
    const btn = document.createElement("button");
    btn.innerText = "Friends";
    Object.assign(btn.style, {
      background: "#1db954",
      border: "none",
      color: "#fff",
      padding: "6px 12px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "12px"
    });

    row.appendChild(left);
    row.appendChild(btn);
    popup.appendChild(row);
  });

  // close on outside click
  overlay.onclick = e => {
    if (e.target === overlay) overlay.remove();
  };

  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}
