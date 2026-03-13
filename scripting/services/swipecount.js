/* =====================================================
   DAILY SWIPE - FULLY FIXED + COMPLETE
   All Features Preserved + Proper Chunk Rendering
===================================================== */

/* ================= CONFIG ================= */
const BACKEND_API = "https://backend2-kpkg.onrender.com/daily-memes";
const STORAGE_KEYs = "dailyMemeData";
const RENDER_CHUNK_SIZE = 4;

/* ================= STATE ================= */
let loadedMemes = [];
let currentIndexs = 0;
let currentIndex = 0;
let swipeEnabled = false;
let currentCard = null;
let keyLocked = false;
let backendUpdating = false;



// /* ================= TOUCH CONFIG ================= */
// const TOUCH_SWIPE_THRESHOLD = 120;   // distance needed to trigger swipe
// const TOUCH_ROTATION_FACTOR = 0.15;  // rotation intensity
// const TOUCH_ANIMATION_SPEED = 0.35;  // lower = faster (0.2 fast, 0.5 slow)


/* ================= PREMIUM TOUCH CONFIG ================= */
const TOUCH_THRESHOLD = 100;        // Distance required
const TOUCH_SPEED = 0.28;           // Animation speed (lower = faster)
const ROTATION_STRENGTH = 20;       // Max rotation deg
const VELOCITY_TRIGGER = 0.6;       // Fast swipe sensitivity

/* ================= USER ================= */
const username = localStorage.getItem("username");

/* ================= STREAK + SCORE ================= */
const RIGHT_STREAK_KEY = "rightSwipesForStreak";
const RIGHT_SWIPE_SCORE_KEY = "rightSwipesForScore";
const API_SWIPE_STORAGE_KEY = "totalSwipesForAPI";

let rightSwipesForStreak = Number(localStorage.getItem(RIGHT_STREAK_KEY)) || 0;
let rightSwipesForScore = Number(localStorage.getItem(RIGHT_SWIPE_SCORE_KEY)) || 0;
let totalSwipesForAPI = Number(localStorage.getItem(API_SWIPE_STORAGE_KEY)) || 0;

const API_SWIPE_TARGET = 50;

/* ================= SWIPE UI COUNTER ================= */
const swipeBox = document.getElementById("swipe");
const STORAGE_KEY = "swipeCount";
let swipeCount = Number(localStorage.getItem(STORAGE_KEY)) || 0;
updateSwipeUI();

function incrementSwipe() {
  swipeCount++;
  if (swipeCount > 300) swipeCount = 0;
  localStorage.setItem(STORAGE_KEY, swipeCount);
  updateSwipeUI();
}

function updateSwipeUI() {
  if (swipeBox) swipeBox.textContent = `Swipes:${swipeCount}`;
}

/* ================= DATE ================= */
function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

/* ================= STORAGE ================= */
function getStoredData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYs) || "null");
}

function setStoredData(data) {
  localStorage.setItem(STORAGE_KEYs, JSON.stringify(data));
}



let preloadIndex = 0;
let isPreloading = false;

function startBackgroundPreload() {
  if (isPreloading) return;
  isPreloading = true;

  preloadIndex = currentIndexs + 3;

  function preloadNextBatch() {

    if (preloadIndex >= loadedMemes.length) {
      isPreloading = false;
      return;
    }

    const meme = loadedMemes[preloadIndex];

    const img = new Image();
    img.src = meme.url;
    img.decoding = "async";

    preloadIndex++;

    setTimeout(preloadNextBatch, 400);
  }

  preloadNextBatch();
}
/* ================= IMAGE PRELOAD ================= */
function preloadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.decoding = "async";

    img.onload = () => resolve(url);
    img.onerror = () => resolve(url);
  });
}

async function preloadInitialMemes(memes, count = 5) {
  const firstBatch = memes.slice(0, count);

  await Promise.all(
    firstBatch.map(meme => preloadImage(meme.url))
  );

  return memes;
}

async function fetchGuestMemes() {
  try {
    const response = await fetch("https://backend2-kpkg.onrender.com/guest-memes");

    if (!response.ok) {
      throw new Error("Failed to load guest memes");
    }

    const json = await response.json();

    const formattedMemes = json.map((url, index) => ({
      id: index + 1,
      url: url
    }));

    return formattedMemes;

  } catch (error) {
    console.error("Guest meme fetch error:", error);
    return [];
  }
}






/* ================= FETCH MEMES ================= */
async function fetchDailyMemes() {
  try {

     const username = localStorage.getItem("username");
 console.log(username);
 
    // 🔥 CHECK IF USER IS GUEST (case-insensitive)
    // if (username==="guest") {
    //   return await fetchGuestMemes();
    // }
    console.log("Fetching memes for user:", username);
    const res = await fetch(`${BACKEND_API}?username=${username}`);
    if (!res.ok) return [];
    const urls = await res.json();
    return urls.map(url => ({ url }));
  } catch {
    window.location.href = "/pages/error.html";
    return [];
  }
}

/* ================= LOADER ================= */
function createLoader(container) {
  if (container.querySelector(".meme-loader")) return;
  const loader = document.createElement("div");
  loader.className = "meme-loader";
  loader.innerHTML = `<div class="spinner"></div><p>Loading memes...</p>`;
  container.appendChild(loader);
}

function removeLoader(container) {
  const loader = container.querySelector(".meme-loader");
  if (loader) loader.remove();
}

// /* ================= QUOTA CARD ================= */
// function renderQuotaCard() {
//   const memeBox = document.querySelector(".memeBox");
//   memeBox.innerHTML = "";

//   const card = document.createElement("div");
//   card.className = "meme-card quota-card active";
//   card.innerHTML = `
//     <h2>🎉 Daily Quota Completed</h2>
//     <p>Come back tomorrow for fresh memes</p>
//     <div style="margin-top:20px;">
//       <a href="https://www.buymeacoffee.com/vibhavkhichi" target="_blank">
//         <img 
//           src="https://img.buymeacoffee.com/button-api/?text=Coffee?&emoji=😁&slug=vibhavkhichi&button_colour=5F7FFF&font_colour=ffffff&font_family=Poppins&outline_colour=ffffff&coffee_colour=FFDD00"
//           style="height:50px; border-radius:8px;"
//         />
//       </a>
//     </div>
//   `;

//   memeBox.appendChild(card);
//   disableSwipe();
// }
/* ================= MIDNIGHT COUNTDOWN ================= */
function startMidnightCountdown() {
  const countdownEl = document.getElementById("countdown");

  function updateCountdown() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const diff = midnight - now;

    if (diff <= 0) {
      location.reload();
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.textContent =
      String(hours).padStart(2, "0") + ":" +
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}
/* ================= QUOTA CARD ================= */
function renderQuotaCard() {
  disableSwipe()
  const memeBox = document.querySelector(".memeBox");
  memeBox.innerHTML = "";

  const card = document.createElement("div");
  card.className = "meme-card quota-card active";

  card.innerHTML = `
    <div class="quota-wrapper">
        <h2>🎉 Daily Quota Completed</h2>
        <p>Come back tomorrow for fresh memes</p>

        <div class="midnight-counter">
            ⏳ Refresh in <span id="countdown">--:--:--</span>
        </div>

        <div class="premium-coffee">
            <div class="coffee-glow"></div>
            <div class="coffee-icon">☕</div>
            <h3>Enjoying Daily Swipe?</h3>
            <p>Your coffee keeps the memes alive 🚀</p>

            <a href="https://www.buymeacoffee.com/vibhavkhichi"
               target="_blank"
               class="coffee-btn-premium">
               Buy Me a Coffee
            </a>
        </div>
    </div>
  `;

  memeBox.appendChild(card);
  disableSwipe();

  startMidnightCountdown();
}

/* ================= RENDER CHUNK ================= */
function renderNextChunk() {
  const memeBox = document.querySelector(".memeBox");

  if (currentIndexs >= loadedMemes.length) {
    renderQuotaCard();
    return;
  }

  const start = currentIndexs;
  const end = Math.min(start + RENDER_CHUNK_SIZE, loadedMemes.length);
  const fragment = document.createDocumentFragment();

  for (let i = start; i < end; i++) {
    const meme = loadedMemes[i];

    const card = document.createElement("div");
    card.className = "meme-card";
    card.style.zIndex = loadedMemes.length - i;

    // const img = document.createElement("img");
    // img.src = meme.url;
    // img.loading = "eagar";
    // img.decoding = "async";
    // img.draggable = false;
    const img = document.createElement("img");

img.src = meme.url;
img.loading = "eager";
img.decoding = "async";
img.draggable = false;
img.classList.add("meme");
// img.style.width = "100%";
// img.style.height = "100%";
// img.style.objectFit = "contain";

    card.appendChild(img);
    fragment.appendChild(card);
  }

  memeBox.appendChild(fragment);

  if (!document.querySelector(".meme-card.active")) {
    const firstCard = document.querySelector(".meme-card");
    if (firstCard) {
      firstCard.classList.add("active");
      currentCard = firstCard;
    }
  }
}

/* ================= ENABLE / DISABLE ================= */
function enableSwipe() {
  swipeEnabled = true;
  currentCard = document.querySelector(".meme-card.active");
}

function disableSwipe() {
  swipeEnabled = false;
  keyLocked = true;
  currentCard = null;
}

/* ================= SWIPE ENGINE ================= */
function swipe(direction) {
  if (!swipeEnabled) return;
   if (!currentCard) return;
  if (currentCard.classList.contains("quota-card")) return;


  swipeEnabled = false; // prevent rapid duplicate swipes
  incrementSwipe();

  totalSwipesForAPI++;
  localStorage.setItem(API_SWIPE_STORAGE_KEY, totalSwipesForAPI);

  if (direction === "right") {
    rightSwipesForScore++;
    rightSwipesForStreak++;
    localStorage.setItem(RIGHT_SWIPE_SCORE_KEY, rightSwipesForScore);
    localStorage.setItem(RIGHT_STREAK_KEY, rightSwipesForStreak);
  }

  // if (totalSwipesForAPI === API_SWIPE_TARGET) {
  //   updateBackend();
  // }

  if (totalSwipesForAPI === API_SWIPE_TARGET) {

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
    updateBackend();
  } else {
    // 🔥 DIRECTLY SHOW GUEST POPUP
    popupForGuest(
      totalSwipesForAPI,
      rightSwipesForScore,
      rightSwipesForStreak,
      "Guest"
    );
    disableSwipe();
  }
}



  if (currentCard) {
    currentCard.classList.add(direction === "right" ? "swipe-right" : "swipe-left");
  }

  setTimeout(() => {
    if (currentCard) currentCard.classList.remove("active");

    onMemeSwiped();

    const cards = document.querySelectorAll(".meme-card");
    const next = cards[0];
    if (next) {
      next.classList.add("active");
      currentCard = next;
      swipeEnabled = true;
    }
  }, 300);
}


function popupForGuest(totalSwipesForAPI, rightSwipesForScore, streakIncrement, username) {

  // STORE guest data
  localStorage.setItem("GuestTotalSwipes", totalSwipesForAPI);
  localStorage.setItem("GuestRightSwipes", rightSwipesForScore);
  localStorage.setItem("GuestStreakIncrement", 1);
  localStorage.setItem("guestTask", username);

  // READ guest data into popup
  document.getElementById("snapUsername").innerText =
    localStorage.getItem("guestTask");

  document.getElementById("snapScore").innerText =
    rightSwipesForScore * 3 + 1 * 5;

  document.getElementById("snapSwipes").innerText =
    localStorage.getItem("GuestRightSwipes");

  document.getElementById("snapStreak").innerText =
    "🔥 1" 

  // SHOW popup
  document.getElementById("snapshotOverlay").style.display = "flex";
  
  // console.log(JSON.stringify(localStorage));

}




/* ================= SWIPE PROGRESS ================= */
function onMemeSwiped() {
  currentIndexs++;
  currentIndex = currentIndexs;

  const data = getStoredData();
  if (data) {
    data.index = currentIndexs;
    setStoredData(data);
  }

  const cards = document.querySelectorAll(".meme-card");

  cards.forEach(card => {
    if (
      !card.classList.contains("active") &&
      !card.classList.contains("quota-card") &&
      (card.classList.contains("swipe-left") ||
        card.classList.contains("swipe-right"))
    ) {
      card.remove();
    }
  });

  if (currentIndexs >= loadedMemes.length) {
    renderQuotaCard();
    return;
  }

  if (currentIndexs % RENDER_CHUNK_SIZE === 0) {
    renderNextChunk();
  }
}

/* ================= BACKEND UPDATE ================= */
async function updateBackend() {
 
  if (backendUpdating) return;

  backendUpdating = true;

  const payload = {
    username,
    totalSwipes: totalSwipesForAPI,
    swipes: rightSwipesForScore,
    streak: rightSwipesForStreak,
  };

  try {
    await fetch(API.updateUser(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    totalSwipesForAPI = 0;
    rightSwipesForScore = 0;

    localStorage.setItem(API_SWIPE_STORAGE_KEY, 0);
    localStorage.setItem(RIGHT_SWIPE_SCORE_KEY, 0);

  } catch (err) {
    console.error("Backend update failed", err);
    
     localStorage.setItem("GuestTotalSwipes", totalSwipesForAPI);
     localStorage.setItem("GuestRightSwipes", rightSwipesForScore);
     localStorage.setItem("GuestStreakIncrement", 1);
    popupForGuest(totalSwipesForAPI, rightSwipesForScore, 1, username);
     disableSwipe();
  } finally {
    backendUpdating = false;
  }
}

// /* ================= INIT ================= */
async function initDailyMemes() {
  const memeBox = document.querySelector(".memeBox");
  const today = getTodayKey();
  let storedData = getStoredData();
   
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";


  if (storedData && storedData.date === today) {
    currentIndexs = storedData.index || 0;
    loadedMemes = storedData.memes;
    renderNextChunk();
    enableSwipe();
    return;
  }

  createLoader(memeBox);
 let memes = [];
  // const memes = await fetchDailyMemes();
  // loadedMemes = memes;
         
     if (isLoggedIn) {
      console.log("for user");
      
    memes = await fetchDailyMemes();
  } else {
    console.log("for guest");
    memes = await fetchGuestMemes();   // ✅ only change
  }

  // loadedMemes = memes;


  // setStoredData({
  //   date: today,
  //   memes: memes,
  //   index: 0,
  // });
  // 🔥 PRELOAD FIRST MEMES BEFORE RENDER
await preloadInitialMemes(memes, 5);

loadedMemes = memes;

setStoredData({
  date: today,
  memes: memes,
  index: 0,
});

  memeBox.innerHTML = "";
  removeLoader(memeBox);

  renderNextChunk();
  enableSwipe();
  // startBackgroundPreload();
  setTimeout(startBackgroundPreload, 800);
}


/* ================= KEYBOARD SWIPE ================= */
document.addEventListener("keydown", (e) => {
  if (keyLocked) return;
  if (e.key === "ArrowRight") { keyLocked = true; swipe("right"); }
  if (e.key === "ArrowLeft") { keyLocked = true; swipe("left"); }
});
document.addEventListener("keyup", () => keyLocked = false);


/* ================= PREMIUM TOUCH ENGINE ================= */

let startX = 0;
let currentX = 0;
let startTime = 0;
let dragging = false;

const heart = document.querySelector(".swipe-reaction.heart");
const cross = document.querySelector(".swipe-reaction.cross");

document.addEventListener("touchstart", (e) => {
  if (!swipeEnabled || !currentCard) return;
  
  if (currentCard.classList.contains("quota-card")) return;
  dragging = true;
  startX = e.touches[0].clientX;
  startTime = Date.now();

  currentCard.style.transition = "none";
}, { passive: true });

document.addEventListener("touchmove", (e) => {
  if (!dragging || !currentCard) return;

  currentX = e.touches[0].clientX;
  const deltaX = currentX - startX;

  const screenWidth = window.innerWidth;
  const percent = deltaX / screenWidth;

  const rotate = percent * ROTATION_STRENGTH;

  currentCard.style.transform = `
    translateX(${deltaX}px)
    rotate(${rotate}deg)
  `;

  // Fade card slightly
  currentCard.style.opacity = 1 - Math.abs(percent) * 0.4;

  // // ❤️ ✖ Premium indicator animation
  // if (deltaX > 0) {
  //   heart.style.opacity = Math.min(Math.abs(percent) * 3, 1);
  //   heart.style.transform = `scale(${1 + Math.abs(percent)}) rotate(-10deg)`;
  //   cross.style.opacity = 0;
  // } else {
  //   cross.style.opacity = Math.min(Math.abs(percent) * 3, 1);
  //   cross.style.transform = `scale(${1 + Math.abs(percent)}) rotate(10deg)`;
  //   heart.style.opacity = 0;
  // }

}, { passive: true });

document.addEventListener("touchend", () => {
  if (!dragging || !currentCard) return;

  dragging = false;

  const deltaX = currentX - startX;
  const timeTaken = Date.now() - startTime;
  const velocity = Math.abs(deltaX) / timeTaken;

  currentCard.style.transition = `all ${TOUCH_SPEED}s cubic-bezier(.22,1,.36,1)`;

  // Trigger swipe by distance OR velocity
  if (Math.abs(deltaX) > TOUCH_THRESHOLD || velocity > VELOCITY_TRIGGER) {
    const direction = deltaX > 0 ? "right" : "left";
    premiumExit(direction);
  } else {
    resetCard();
  }
});

/* ================= PREMIUM EXIT ================= */

function premiumExit(direction) {
  const exitX = direction === "right" ? window.innerWidth : -window.innerWidth;

  currentCard.style.transform = `
    translateX(${exitX}px)
    rotate(${direction === "right" ? 30 : -30}deg)
  `;
  currentCard.style.opacity = 0;

  setTimeout(() => {
    swipe(direction);
    resetIndicators();
  }, TOUCH_SPEED * 1000);
}

/* ================= RESET ================= */

function resetCard() {
  currentCard.style.transform = "translateX(0) rotate(0)";
  currentCard.style.opacity = 1;
  resetIndicators();
}

function resetIndicators() {
  heart.style.opacity = 0;
  cross.style.opacity = 0;
  heart.style.transform = "scale(1)";
  cross.style.transform = "scale(1)";
}

// async function initDailyMemes() {

//   const memeBox = document.querySelector(".memeBox");
//   const today = getTodayKey();
//   let storedData = getStoredData();
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

//   let memes = [];

//   /* ===== SAME DAY ===== */
//   if (storedData && storedData.date === today) {

//     currentIndexs = storedData.index || 0;
//     loadedMemes = storedData.memes || [];

//     renderNextChunk();
//     enableSwipe();
//     return;
//   }

//   /* ===== NEW DAY ===== */

//   createLoader(memeBox);

//   if (isLoggedIn) {
//     memes = await fetchDailyMemes();
//   } else {
//     memes = await fetchGuestMemes();
//   }

//   if (storedData && storedData.memes) {

//     // remaining memes from yesterday
//     const remainingMemes = storedData.memes.slice(storedData.index || 0);

//     console.log("Remaining memes from yesterday:", remainingMemes.length);

//     // merge remaining + new
//     loadedMemes = [...remainingMemes, ...memes];

//     // reset swipe index
//     currentIndexs = 0;

//   } else {

//     loadedMemes = memes;
//     currentIndexs = 0;

//   }

//   await preloadInitialMemes(loadedMemes, 5);

//   setStoredData({
//     date: today,
//     memes: loadedMemes,
//     index: currentIndexs
//   });

//   memeBox.innerHTML = "";
//   removeLoader(memeBox);

//   renderNextChunk();
//   enableSwipe();

//   setTimeout(startBackgroundPreload, 800);
// }





/* ================= START ================= */
window.addEventListener("load", initDailyMemes);