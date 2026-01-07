const routeToRegister =() =>{
     window.location.href = "/pages/registeration.html"; 
    
}
const routeToLogin = () => {
  document.querySelectorAll("input").forEach(input => {
    input.value = "";
  });

  window.location.href = "/pages/login.html";
};
const goToEdit=() => {
  document.querySelectorAll("input").forEach(input => {
    input.value = "";
  });

  window.location.href = "/pages/edit.html";
};

const goToactualEdit=() => {
  document.querySelectorAll("input").forEach(input => {
    input.value = "";
  });

  window.location.href = "/pages/actualedit.html";
};

const goToMeme=() => {
  document.querySelectorAll("input").forEach(input => {
    input.value = "";
  });

  window.location.href = "/pages/uplodememe.html";
};

const gotoProfile=() => {
  document.querySelectorAll("input").forEach(input => {
    input.value = "";
  });

  window.location.href = "/pages/profile.html";
};
const routeToOTP = () => {
  document.querySelectorAll("input").forEach(input => {
    input.value = "";
  });

  window.location.href = "/pages/otp.html";
};


const verifyOTP = () => {
    const loader = document.getElementById("loader");
    const button = document.getElementById("registered");

    // Show loader
    loader.classList.remove("hidden");

    // Disable button to avoid multiple clicks
    button.disabled = true;
    button.innerText = "VERIFYING...";

    // Simulate OTP verification delay
    setTimeout(() => {
      window.location.href = "/pages/home.html";
      loader.classList.add("hidden");
    }, 5000); // 5 seconds
  };


 function setActiveNav(item) {
  const navItems = document.querySelectorAll(".nav-item");

  // Remove active class from all items
  navItems.forEach(i => i.classList.remove("active"));

  // Add active to the clicked item
  item.classList.add("active");

  // Get the value from the SVG inside this nav-item
  const svg = item.querySelector("svg");
  if (!svg) return; // safety check

  const value = svg.getAttribute("value");
  if (!value) return;

  console.log("Redirecting to:", value);
  window.location.href = `/pages/${value}.html`;
}


   function handleUpload(event) {
    const spinner = document.querySelector(".spinner");
    const uploadBtn = event.target;

    // hide upload button
    uploadBtn.style.display = "none";

    // show spinner
    spinner.style.display = "block";

    // simulate upload delay (5 seconds)
    setTimeout(() => {
      spinner.style.display = "none";

      // redirect to profile page
      gotoProfile();
    }, 5000);
  }