
  const searchInput = document.querySelector(".primary input");
  const profileOverlay = document.getElementById("profileOverlay");

  // ENTER key (keyboard + mobile)
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();

      const value = searchInput.value.trim();
      if (!value) return;

      // SHOW POPUP
      profileOverlay.style.display = "flex";
    }
  });

  function closePopup() {
    profileOverlay.style.display = "none";
  }

  function addFriend(el) {
    el.classList.toggle("added");
    el.textContent = el.classList.contains("added")
      ? "Added ✓"
      : "Add Friend";
  }
