
  // function openTerms() {
  //   document.getElementById("termsPopup").style.display = "flex";
  // }

  // function closeTerms() {
  //   document.getElementById("termsPopup").style.display = "none";
  //   document.getElementById("acceptTerms").checked = false;
  //   document.getElementById("acceptBtn").disabled = true;
  // }

  // function toggleTermsButton() {
  //   const checkbox = document.getElementById("acceptTerms");
  //   const button = document.getElementById("acceptBtn");
  //   button.disabled = !checkbox.checked;
  // }

  function openTerms() {
  document.getElementById("termsPopup").style.display = "flex";
}

function closeTerms() {
  document.getElementById("termsPopup").style.display = "none";
}

function toggleTermsButton() {
  const checkbox = document.getElementById("acceptTerms");
  const button = document.getElementById("acceptBtn");
  button.disabled = !checkbox.checked;
}

/* ⭐ IMPORTANT — enable register when accepted */
function acceptTerms() {
  const checkbox = document.getElementById("acceptTerms");
  if (!checkbox.checked) return;

  document.getElementById("registered").disabled = false;
  document.getElementById("termsPopup").style.display = "none";
}