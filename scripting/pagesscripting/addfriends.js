
function postUserData(el) {
  const searchInput = document.querySelector(".primary input");
  const data = {
      friend1: sessionStorage.getItem("username"),
      friend2: searchInput.value.trim()
  };

  fetch(API.addFriend(), {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
  })
  .then(res => {
      if (!res.ok) throw new Error("Request failed");
      return res.json();
  })
  .then(response => {
      console.log("Server response:", response);
      el.classList.add("added");
      el.textContent = "Friends";
  })
  .catch(err => {
      console.error("POST error:", err);
      alert("Failed to add friend");
  });
}

