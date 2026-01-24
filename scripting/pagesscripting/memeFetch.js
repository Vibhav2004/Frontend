const API_URL =
  "https://script.google.com/macros/s/AKfycbwP5jaMrpfFviL8K9lWtMijLN4FMqkNHqQOWWrTqDCl_oFgl3jMTXfdRRLPkpDtIWO3Iw/exec?limit=100&page=1";



  function createLoader(container) {
  // Prevent duplicate loader
  if (container.querySelector(".meme-loader")) return;

  const loader = document.createElement("div");
  loader.className = "meme-loader";

  loader.innerHTML = `
    <div class="spinner"></div>
    <p style="margin-top:10px;font-size:14px;">Loading memes...</p>
  `;

  container.appendChild(loader);
}




async function fetchMemes() {
  const memeBox = document.querySelector(".memeBox");

  // ✅ Create loader dynamically
  createLoader(memeBox);
  const loader = memeBox.querySelector(".meme-loader");

  try {
    const res = await fetch(API_URL);
    const json = await res.json();

    const memes = json.data
      .filter(m => m.url && m.nsfw === false)
      .slice(0, 100);

    const loadedImages = await preloadImages(memes);

    // ✅ Hide loader AFTER everything is ready
    if (loader) {
  loader.style.opacity = "0";
  setTimeout(() => loader.remove(), 300);
}


    renderMemes(loadedImages);

  } catch (err) {
    console.error("Meme fetch failed:", err);
    if (loader) loader.querySelector("p").textContent = "Failed to load memes 😢";
  }
}


function preloadImages(memes) {
  return Promise.allSettled(
    memes.map(meme => {
      return new Promise(resolve => {
        const img = new Image();
        img.src = meme.url;
        img.decoding = "async";

        img.onload = () => resolve({ ...meme, img });
        img.onerror = () => resolve(null); // skip broken image
      });
    })
  ).then(results =>
    results
      .filter(r => r.status === "fulfilled" && r.value)
      .map(r => r.value)
  );
}


function renderMemes(memes) {
  const memeBox = document.querySelector(".memeBox");
  memeBox.innerHTML = "";
  currentIndex = 0;

  memes.forEach((meme, index) => {
    const card = document.createElement("div");
    card.className = "meme-card";
    card.style.zIndex = memes.length - index;

    if (index === 0) card.classList.add("active");

    meme.img.alt = meme.title || "meme";
    card.appendChild(meme.img);

    memeBox.appendChild(card);
  });

  enableSwipe();
}

fetchMemes();
