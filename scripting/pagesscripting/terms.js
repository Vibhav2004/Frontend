

  function openTerms() {
  document.getElementById("termsPopup").style.display = "flex";
}

function closeTerms() {
  document.getElementById("termsPopup").style.display = "none";
}

// function toggleTermsButton() {
//   const checkbox = document.getElementById("acceptTerms");
//   const button = document.getElementById("acceptBtn");
//   button.disabled = !checkbox.checked;
// }
function toggleTermsButton() {
  const checkbox = document.getElementById("acceptTerms");
  const button = document.getElementById("acceptBtn");

  if (checkbox.checked) {
    button.disabled = false;
    button.classList.add("enabled");   // 👈 THIS WAS MISSING
  } else {
    button.disabled = true;
    button.classList.remove("enabled"); // 👈 THIS WAS MISSING
  }
}

/* ⭐ IMPORTANT — enable register when accepted */
function acceptTerms() {
  const checkbox = document.getElementById("acceptTerms");
  if (!checkbox.checked) return;

  document.getElementById("registered").disabled = false;
  document.getElementById("termsPopup").style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("termsPopup").style.display = "flex";
});