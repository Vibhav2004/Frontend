
function openAddPopup() {
  document.getElementById("addPopup").style.display = "flex";
}

function closeAddPopup() {
  document.getElementById("addPopup").style.display = "none";
}

function addFriendFromPopup() {
  const input = document.getElementById("addFriendInput");
  const username = input.value.trim();

  

  // reuse your existing logic
  postUserData({
    value: username
  });

  input.value = "";
  closeAddPopup();
}
