
// // const API_BASE = "https://script.google.com/macros/s/AKfycbwP5jaMrpfFviL8K9lWtMijLN4FMqkNHqQOWWrTqDCl_oFgl3jMTXfdRRLPkpDtIWO3Iw/exec";
// // const BATCH_SIZE = 100;
// // const MAX_BATCHES = 3;
// // const STORAGE_KEYs = "memeQueue"; // sessionStorage key

// // /* ================= LOADER ================= */
// // function createLoader(container) {
// //   if (container.querySelector(".meme-loader")) return;
// //   const loader = document.createElement("div");
// //   loader.className = "meme-loader";
// //   loader.innerHTML = `
// //     <div class="spinner"></div>
// //     <p>Loading memes...</p>
// //   `;
// //   container.appendChild(loader);
// // }

// // function removeLoader(container) {
// //   const loader = container.querySelector(".meme-loader");
// //   if (!loader) return;
// //   loader.style.opacity = "0";
// //   setTimeout(() => loader.remove(), 300);
// // }

// // /* ================= FETCH BATCH ================= */
// // async function fetchMemeBatch(page) {
// //   console.log(`📦 Fetching batch ${page}`);
  
// //   const res = await fetch(`${API_BASE}?limit=${BATCH_SIZE}&page=${page}`);
// //   const json = await res.json();

// //   const memes = json.data
// //     .filter(m => m.url && m.nsfw === false)
// //     .map(m => ({ url: m.url, title: m.title || "meme" }));

// //   console.log(`Batch ${page} fetched: ${memes.length} memes`);

// //   // ✅ Log each meme title
// //   memes.forEach((meme, index) => {
// //     console.log(`Batch ${page} meme ${index + 1}: ${meme.title}`);
// //   });
  
// //   return memes;
// // }



// // /* ================= IMAGE PRELOAD ================= */
// // function preloadImages(memes) {
// //   return Promise.allSettled(
// //     memes.map(meme => new Promise(resolve => {
// //       const img = new Image();
// //       img.src = meme.url;
// //       img.onload = () => resolve({ ...meme, img });
// //       img.onerror = () => resolve(null);
// //     }))
// //   ).then(results => results.filter(r => r.status==="fulfilled" && r.value).map(r => r.value));
// // }

// // /* ================= RENDER ================= */
// // let currentIndexs = 0;
// // function renderMemes(memes) {
// //   const memeBox = document.querySelector(".memeBox");
// //   memeBox.innerHTML = "";
// //   currentIndexs = 0;

// //   memes.forEach((meme, i) => {
// //     const card = document.createElement("div");
// //     card.className = "meme-card";
// //     card.style.zIndex = memes.length - i;
// //     if (i === 0) card.classList.add("active");
// //     meme.img.alt = meme.title;
// //     card.appendChild(meme.img);
// //     memeBox.appendChild(card);
// //   });

// //   enableSwipe(); // your swipe logic here
// // }

// // /* ================= SESSION STORAGE ================= */
// // function getStoredMemes() {
// //   return JSON.parse(sessionStorage.getItem(STORAGE_KEYs) || "[]");
// // }

// // function setStoredMemes(memes) {
// //   sessionStorage.setItem(STORAGE_KEYs, JSON.stringify(memes));
// // }

// // /* ================= INIT BATCHES ================= */
// // async function initBatches() {
// //   const memeBox = document.querySelector(".memeBox");
// //   createLoader(memeBox);

// //   let storedMemes = getStoredMemes();

// //   if (storedMemes.length === 0) {
// //     // BATCH 1 → immediate
// //     const batch1 = await fetchMemeBatch(1);
// //     storedMemes = [...batch1];
// //     setStoredMemes(storedMemes);

// //     const loaded1 = await preloadImages(batch1);
// //     renderMemes(loaded1);

// //     console.log("✅ Batch 1 loaded");

// //     // BATCH 2 → after 4 seconds
// //     setTimeout(async () => {
// //       const batch2 = await fetchMemeBatch(2);
// //       storedMemes = [...getStoredMemes(), ...batch2];
// //       setStoredMemes(storedMemes);
// //       console.log("✅ Batch 2 stored in sessionStorage");
// //     }, 1 * 60 * 1000);

// //     // BATCH 3 → after 5 minutes
// //     setTimeout(async () => {
// //       const batch3 = await fetchMemeBatch(3);
// //       storedMemes = [...getStoredMemes(), ...batch3];
// //       setStoredMemes(storedMemes);
// //       console.log("✅ Batch 3 stored in sessionStorage");
// //     }, 2 * 60 * 1000);

// //   } else {
// //     // Already stored → shuffle and render
// //     console.log("♻️ Memes loaded from sessionStorage");
// //     const shuffled = storedMemes.sort(() => Math.random() - 0.5);
// //     const loaded = await preloadImages(shuffled);
// //     renderMemes(loaded);
// //   }

// //   removeLoader(memeBox);
// // }

// // window.addEventListener("load", initBatches);

// /* ================= CONFIG ================= */
// const API_BASE =
//   "https://script.google.com/macros/s/AKfycbwP5jaMrpfFviL8K9lWtMijLN4FMqkNHqQOWWrTqDCl_oFgl3jMTXfdRRLPkpDtIWO3Iw/exec";

// const DAILY_LIMIT = 300;
// const RENDER_CHUNK_SIZE = 50;
// const STORAGE_KEYs = "dailyMemeData";

// /* ================= GLOBAL STATE ================= */
// let loadedMemes = [];
// let currentIndexs = 0;

// /* ================= DATE HELPERS ================= */
// function getTodayKey() {
//   return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
// }

// /* ================= LOADER ================= */
// function createLoader(container) {
//   if (container.querySelector(".meme-loader")) return;

//   const loader = document.createElement("div");
//   loader.className = "meme-loader";
//   loader.innerHTML = `
//     <div class="spinner"></div>
//     <p>Loading memes...</p>
//   `;
//   container.appendChild(loader);
// }

// function removeLoader(container) {
//   const loader = container.querySelector(".meme-loader");
//   if (!loader) return;
//   loader.style.opacity = "0";
//   setTimeout(() => loader.remove(), 300);
// }

// /* ================= FETCH MEMES ================= */
// async function fetchDailyMemes() {
//   console.log("📦 Fetching daily memes...");

//   const res = await fetch(`${API_BASE}?limit=${DAILY_LIMIT}`);
//   const json = await res.json();

//   const memes = json.data
//     .filter(m => m.url && m.nsfw === false)
//     .slice(0, DAILY_LIMIT)
//     .map(m => ({
//       url: m.url,
//       title: m.title || "meme"
//     }));

//   console.log(`✅ ${memes.length} memes fetched`);
//   return memes;
// }

// /* ================= IMAGE PRELOAD ================= */
// function preloadImages(memes) {
//   return Promise.allSettled(
//     memes.map(meme => new Promise(resolve => {
//       const img = new Image();
//       img.src = meme.url;
//       img.onload = () => resolve({ ...meme, img });
//       img.onerror = () => resolve(null);
//     }))
//   ).then(results =>
//     results
//       .filter(r => r.status === "fulfilled" && r.value)
//       .map(r => r.value)
//   );
// }

// /* ================= STORAGE ================= */
// function getStoredData() {
//   return JSON.parse(localStorage.getItem(STORAGE_KEYs) || "null");
// }

// function setStoredData(data) {
//   localStorage.setItem(STORAGE_KEYs, JSON.stringify(data));
// }



// let midnightTimer;

// function startMidnightCountdown() {
//   const counterEl = document.getElementById("midnightCounter");
//   if (!counterEl) return;

//   // Clear any existing interval
//   if (midnightTimer) clearInterval(midnightTimer);

//   function updateCounter() {
//     const now = new Date();
//     const midnight = new Date();
//     midnight.setHours(24, 0, 0, 0); // next midnight
//     const diff = midnight - now;

//     if (diff <= 0) {
//       counterEl.textContent = "New memes available!";
//       clearInterval(midnightTimer);
//       return;
//     }

//     const hrs = Math.floor(diff / (1000 * 60 * 60));
//     const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     const secs = Math.floor((diff % (1000 * 60)) / 1000);

//     counterEl.textContent = `Next memes in: ${hrs}h ${mins}m ${secs}s`;
//   }

//   updateCounter(); // initial call
//   midnightTimer = setInterval(updateCounter, 1000);
// }


// /* ================= RENDER ================= */
// function renderQuotaCard() {
//   const memeBox = document.querySelector(".memeBox");
//   memeBox.innerHTML = "";

//   const card = document.createElement("div");
//   card.className = "meme-card quota-card active";
//   card.innerHTML = `
//     <h2>🎉 Daily Quota Completed</h2>
//     <p>Come back tomorrow for fresh memes</p>
//     <p id="midnightCounter" style="font-weight:bold; font-size:1.1rem;"></p>
//   `;
//   memeBox.appendChild(card);
// startMidnightCountdown();
//   disableSwipe(); // prevent swipes on quota card
  
// }


// function renderNextChunk() {
//   const memeBox = document.querySelector(".memeBox");

//   if (currentIndexs >= loadedMemes.length) {
//     renderQuotaCard();
     
//     return;
//   }

//   const start = currentIndexs;
//   const end = Math.min(start + RENDER_CHUNK_SIZE, loadedMemes.length);

//   loadedMemes.slice(start, end).forEach((meme, i) => {
//     const card = document.createElement("div");
//     card.className = "meme-card";
//     card.style.zIndex = loadedMemes.length - (start + i);

//     if (start === currentIndexs && i === 0) {
//       card.classList.add("active");
//     }

//     meme.img.alt = meme.title;
//     card.appendChild(meme.img);
//     memeBox.appendChild(card);
//   });

//   enableSwipe();
// }

// function renderInitial() {
//   const memeBox = document.querySelector(".memeBox");
//   memeBox.innerHTML = "";

//   if (currentIndexs >= loadedMemes.length) {
//     renderQuotaCard();
//     return;
//   }

//   renderNextChunk();
// }

// /* ================= SWIPE PROGRESS ================= */
// /* CALL THIS ON EVERY LEFT OR RIGHT SWIPE */
// function onMemeSwiped() {
//   const data = getStoredData();
//   if (!data) return;

//   data.index += 1;
//   setStoredData(data);

//   currentIndexs = data.index;

//   // Daily quota finished
//   if (currentIndexs >= loadedMemes.length) {
//     renderQuotaCard();
//     return;
//   }

//   // Load next chunk when needed
//   if (currentIndexs % RENDER_CHUNK_SIZE === 0) {
//     renderNextChunk();
//   }
// }

// /* ================= INIT ================= */
// async function initDailyMemes() {
//   const memeBox = document.querySelector(".memeBox");
//   createLoader(memeBox);

//   const today = getTodayKey();
//   let storedData = getStoredData();

//   // 🆕 New day or no cache
//   if (!storedData || storedData.date !== today) {
//     console.log("🆕 New day → fetching memes");

//     const memes = await fetchDailyMemes();
//     loadedMemes = await preloadImages(memes);

//     storedData = {
//       date: today,
//       memes: loadedMemes.map(m => ({
//         url: m.url,
//         title: m.title
//       })),
//       index: 0
//     };

//     setStoredData(storedData);
//     currentIndexs = 0;
//   } else {
//     console.log("♻️ Loading memes from localStorage");

//     currentIndexs = storedData.index;
//     loadedMemes = await preloadImages(storedData.memes);
//   }

//   renderInitial();
//   removeLoader(memeBox);
// }

// window.addEventListener("load", initDailyMemes);




/* ================= CONFIG ================= */
const API_BASE =
  "https://script.google.com/macros/s/AKfycbwP5jaMrpfFviL8K9lWtMijLN4FMqkNHqQOWWrTqDCl_oFgl3jMTXfdRRLPkpDtIWO3Iw/exec";

const DAILY_LIMIT = 300;
const RENDER_CHUNK_SIZE = 50;
const STORAGE_KEYs = "dailyMemeData"; // ✅ now in sessionStorage
const USED_MEMES_KEY = "usedMemeUrls";

/* ================= GLOBAL STATE ================= */
let loadedMemes = [];
let currentIndexs = 0;
let midnightTimer;

/* ================= DATE HELPERS ================= */
function getTodayKey() {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
}

/* ================= LOADER ================= */
function createLoader(container) {
  if (container.querySelector(".meme-loader")) return;
  const loader = document.createElement("div");
  loader.className = "meme-loader";
  loader.innerHTML = `
    <div class="spinner"></div>
    <p>Loading memes...</p>
    <p>This May take few  Seconds</p>
  `;
  container.appendChild(loader);
}

function removeLoader(container) {
  const loader = container.querySelector(".meme-loader");
  if (!loader) return;
  loader.style.opacity = "0";
  setTimeout(() => loader.remove(), 300);
}

/* ================= FETCH MEMES ================= */
// async function fetchDailyMemes() {
//   console.log("📦 Fetching daily memes...");

//   const res = await fetch(`${API_BASE}?limit=${DAILY_LIMIT}`);
//   const json = await res.json();

//   const memes = json.data
//     .filter(m => m.url && m.nsfw === false)
//     .slice(0, DAILY_LIMIT)
//     .map(m => ({ url: m.url, title: m.title || "meme" }));

//   console.log(`✅ ${memes.length} memes fetched`);
//   return memes;
// }



/* ================= FETCH MEMES (NO REPEAT EVER) ================= */
async function fetchDailyMemes() {
  console.log("📦 Fetching daily memes...");

  const res = await fetch(`${API_BASE}?limit=${DAILY_LIMIT}&t=${Date.now()}`);
  const json = await res.json();

  let memes = json.data
    .filter(m => m.url && m.nsfw === false);

  // 🔥 Load permanently used meme URLs
  const usedUrls = JSON.parse(localStorage.getItem(USED_MEMES_KEY) || "[]");

  // 🔥 Remove already shown memes (across all previous days)
  memes = memes.filter(m => !usedUrls.includes(m.url));

  // Shuffle for randomness
  memes.sort(() => Math.random() - 0.5);

  // Limit to daily limit
  memes = memes.slice(0, DAILY_LIMIT);

  // 🔥 Save newly used URLs permanently
  const MAX_HISTORY = 5000; // prevent unlimited growth

  let updatedUsedUrls = [...usedUrls, ...memes.map(m => m.url)];

  if (updatedUsedUrls.length > MAX_HISTORY) {
    updatedUsedUrls = updatedUsedUrls.slice(-MAX_HISTORY);
  }

  localStorage.setItem(USED_MEMES_KEY, JSON.stringify(updatedUsedUrls));

  console.log(`✅ Fresh memes fetched: ${memes.length}`);

  return memes.map(m => ({
    url: m.url,
    title: m.title || "meme"
  }));
}

/* ================= IMAGE PRELOAD ================= */
function preloadImages(memes) {
  return Promise.allSettled(
    memes.map(meme => new Promise(resolve => {
      const img = new Image();
      img.src = meme.url;
      img.onload = () => resolve({ ...meme, img });
      img.onerror = () => resolve(null);
    }))
  ).then(results => results.filter(r => r.status==="fulfilled" && r.value).map(r => r.value));
}

/* ================= STORAGE ================= */
function getStoredData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYs) || "null");
}

function setStoredData(data) {
  localStorage.setItem(STORAGE_KEYs, JSON.stringify(data));
}

/* ================= MIDNIGHT COUNTDOWN ================= */
function startMidnightCountdown() {
  const counterEl = document.getElementById("midnightCounter");
  if (!counterEl) return;

  if (midnightTimer) clearInterval(midnightTimer);

  function updateCounter() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24,0,0,0);
    const diff = midnight - now;

    if (diff <= 0) {
      counterEl.textContent = "New memes available!";
      clearInterval(midnightTimer);
      return;
    }

    const hrs = Math.floor(diff / (1000*60*60));
    const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
    const secs = Math.floor((diff % (1000*60)) / 1000);

    counterEl.textContent = `Next memes in: ${hrs}h ${mins}m ${secs}s`;
  }

  updateCounter();
  midnightTimer = setInterval(updateCounter, 1000);
}

/* ================= RENDER ================= */
function renderQuotaCard() {
  const memeBox = document.querySelector(".memeBox");
  memeBox.innerHTML = "";

  const card = document.createElement("div");
  card.className = "meme-card quota-card active";
  card.innerHTML = `
    <h2>🎉 Daily Quota Completed</h2>
    <p>Come back tomorrow for fresh memes</p>
    <p id="midnightCounter" style="font-weight:bold; font-size:1.1rem;"></p>
  `;
  memeBox.appendChild(card);

  startMidnightCountdown();
  disableSwipe();
}

function renderNextChunk() {
  const memeBox = document.querySelector(".memeBox");

  if (currentIndexs >= loadedMemes.length) {
    renderQuotaCard();
    return;
  }

  const start = currentIndexs;
  const end = Math.min(start + RENDER_CHUNK_SIZE, loadedMemes.length);

  loadedMemes.slice(start, end).forEach((meme, i) => {
    const card = document.createElement("div");
    card.className = "meme-card";
    card.style.zIndex = loadedMemes.length - (start + i);

    if (start === currentIndexs && i === 0) card.classList.add("active");

    meme.img.alt = meme.title;
    card.appendChild(meme.img);
    memeBox.appendChild(card);
  });

  enableSwipe();
}

function renderInitial() {
  const memeBox = document.querySelector(".memeBox");
  memeBox.innerHTML = "";

  if (currentIndexs >= loadedMemes.length) {
    renderQuotaCard();
    return;
  }

  renderNextChunk();
}

/* ================= SWIPE PROGRESS ================= */
function onMemeSwiped() {
  const data = getStoredData();
  if (!data) return;

  data.index += 1;
  setStoredData(data);

  currentIndexs = data.index;

  if (currentIndexs >= loadedMemes.length) {
    renderQuotaCard();
    return;
  }

  if (currentIndexs % RENDER_CHUNK_SIZE === 0) renderNextChunk();
}

/* ================= INIT ================= */
// async function initDailyMemes() {
//   const memeBox = document.querySelector(".memeBox");
//   createLoader(memeBox);

//   const today = getTodayKey();
//   let storedData = getStoredData();

//   if (!storedData || storedData.date !== today) {
//     console.log("🆕 New day → fetching memes");

//     const memes = await fetchDailyMemes();
//     loadedMemes = await preloadImages(memes);

//     storedData = {
//       date: today,
//       memes: loadedMemes.map(m => ({ url: m.url, title: m.title })),
//       index: 0
//     };

//     setStoredData(storedData);
//     currentIndexs = 0;
//   } else {
//     console.log("♻️ Loading memes from sessionStorage");
//     currentIndexs = storedData.index;
//     loadedMemes = await preloadImages(storedData.memes);
//   }

//   renderInitial();
//   removeLoader(memeBox);
// }



async function initDailyMemes() {
  const memeBox = document.querySelector(".memeBox");

  const today = getTodayKey();
  let storedData = getStoredData();

  if (!storedData || storedData.date !== today) {
    // 🆕 New day → fetch memes
    createLoader(memeBox);

    console.log("🆕 New day → fetching memes");
    const memes = await fetchDailyMemes();
    loadedMemes = await preloadImages(memes);

    storedData = {
      date: today,
      memes: loadedMemes.map(m => ({ url: m.url, title: m.title })),
      index: 0
    };

    setStoredData(storedData);
    currentIndexs = 0;

    renderInitial();
    removeLoader(memeBox);
  } else {
    // ♻️ Already have data in sessionStorage
    console.log("♻️ Loading memes from sessionStorage");

    currentIndexs = storedData.index;

    // Preload only if images are not yet preloaded
    if (!loadedMemes.length) {
      loadedMemes = storedData.memes.map(m => {
        const img = new Image();
        img.src = m.url;
        img.alt = m.title;
        return { ...m, img };
      });
    }

    renderInitial(); // Render immediately without loader
  }
}

window.addEventListener("load", initDailyMemes);
