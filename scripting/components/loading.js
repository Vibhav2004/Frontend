setTimeout(() => {
  const loader = document.getElementById("loader");
  const btnGroup = document.getElementById("buttonGroup");
  const reg = document.getElementById("registerBtn");
   const guest = document.getElementById("GuestBtn");
  // fade loader
  loader.classList.add("hide");

  setTimeout(() => {
    loader.style.display = "none";
    reg.classList.add("show");
    guest.classList.add("show");
    btnGroup.classList.add("show");
  }, 600); // match CSS transition
}, 5000);
