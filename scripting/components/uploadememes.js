let nsfwModel;
const fileInput = document.getElementById("file");
const imagePreview = document.getElementById("imagePreview");
const uploadBtn = document.getElementById("uploadBtn");

// Load NSFW model
window.addEventListener("DOMContentLoaded", async () => {
  document.querySelector(".spinner").style.display = "block"; // show spinner
  nsfwModel = await nsfwjs.load();
  console.log("NSFW model loaded");
  document.querySelector(".spinner").style.display = "none"; // hide spinner
});

// Image preview
fileInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Only image files are allowed!");
    fileInput.value = "";
    imagePreview.style.display = "none";
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    imagePreview.src = e.target.result;
    imagePreview.style.display = "block";
  };
  reader.readAsDataURL(file);
});

// NSFW check
async function checkNSFW(file) {
  return new Promise((resolve) => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      const predictions = await nsfwModel.classify(img);
      console.log("NSFW Predictions:", predictions);
      const nsfwThreshold = 0.5;
      const isNSFW = predictions.some(p =>
        (p.className === "Porn" || p.className === "Hentai") && p.probability > nsfwThreshold
      );
      resolve(!isNSFW); // true if safe
    };
  });
}

// Upload handler
uploadBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const file = fileInput.files[0];
  if (!file) return alert("Select an image first!");

  // Check NSFW
  const safe = await checkNSFW(file);
  if (!safe) {
    alert("NSFW content detected. Upload blocked!");
    fileInput.value = "";
    imagePreview.style.display = "none";
    return;
  }

  const caption = document.getElementById("usernameInput").value;
  console.log("Uploading meme:", file, "Caption:", caption);

  // TODO: Replace this alert with your actual upload API call
  alert("Meme uploaded successfully!");
});
