
  function openTerms() {
    document.getElementById("termsPopup").style.display = "flex";
  }

  function closeTerms() {
    document.getElementById("termsPopup").style.display = "none";
    document.getElementById("acceptTerms").checked = false;
    document.getElementById("acceptBtn").disabled = true;
  }

  function toggleTermsButton() {
    const checkbox = document.getElementById("acceptTerms");
    const button = document.getElementById("acceptBtn");
    button.disabled = !checkbox.checked;
  }
