 setTimeout(() => {
    const loader = document.getElementById("loader");
    const btn = document.getElementById("registerBtn");

    loader.classList.add("hide");

    setTimeout(() => {
      loader.style.display = "none";
      btn.classList.add("show");
    }, 600); // match CSS transition time
  }, 5000);