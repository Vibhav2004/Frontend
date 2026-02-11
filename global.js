let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault(); // stop auto prompt
  deferredPrompt = e;

  // show your custom UI
  showInstallPopup();
});
