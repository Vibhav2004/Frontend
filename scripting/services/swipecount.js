/* ================================
   GLOBAL STATE (RUNTIME ONLY)
================================ */
let currentIndex = 0;
let startX = 0;
let currentCard = null;

/* ---- Counters ---- */
let rightSwipesForStreak = 0;   // ONLY for streak (50 rights)
let rightSwipesForScore = 0;    // ONLY for backend score
let totalSwipesForAPI = 0;      // left + right
let streakIncrement = 0;

/* ---- Constants ---- */
const STREAK_RIGHT_TARGET = 10;
const API_SWIPE_TARGET = 50;
const STREAK_COOLDOWN = 24 * 60 * 60 * 1000; // 24 hrs

 const username = sessionStorage.getItem("username");
console.log(username);


/* ================================
   ENABLE SWIPE
================================ */
function enableSwipe() {
  currentCard = document.querySelector(".meme-card.active");
  if (!currentCard) return;

  currentCard.addEventListener("touchstart", startSwipe);
  currentCard.addEventListener("touchmove", moveSwipe);
  currentCard.addEventListener("touchend", endSwipe);

  currentCard.addEventListener("mousedown", startSwipe);
}

function startSwipe(e) {
  startX = e.touches ? e.touches[0].clientX : e.clientX;
  document.addEventListener("mousemove", moveSwipe);
  document.addEventListener("mouseup", endSwipe);
}

function moveSwipe(e) {
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  const deltaX = x - startX;
  currentCard.style.transform =
    `translateX(${deltaX}px) rotate(${deltaX * 0.05}deg)`;
}

function endSwipe(e) {
  const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
  const deltaX = endX - startX;
  const threshold = 120;

  document.removeEventListener("mousemove", moveSwipe);
  document.removeEventListener("mouseup", endSwipe);

  if (deltaX > threshold) swipe("right");
  else if (deltaX < -threshold) swipe("left");
  else currentCard.style.transform = "";
}

function canIncreaseStreak() {
  const lastTimestamp = sessionStorage.getItem("lastStreakTime"); // store as millis
  const now = Date.now();

  if (!lastTimestamp) return true; // never incremented before → allowed

  // Check if 24 hours have passed
  const HOURS_24 = 24 * 60 * 60 * 1000;
  if (now - Number(lastTimestamp) >= HOURS_24) {
    return true; // 24 hours passed → allowed
  }
console.log(Number(lastTimestamp));

  return false; // still within 24 hours → locked
}




/* ================================
   STREAK POPUP
================================ */
function showStreakPopup() {
  const popup = document.getElementById("streakPopup");
  if (!popup) return;

  popup.style.display = "flex";
  setTimeout(() => popup.style.display="none", 2000);
}



/* ================================
   MAIN SWIPE HANDLER
================================ */
function swipe(direction) {
  const heart = document.querySelector(".swipe-reaction.heart");
  const cross = document.querySelector(".swipe-reaction.cross");

  /* ---- Count ALL swipes ---- */
  totalSwipesForAPI++;

  if (direction === "right") {
    rightSwipesForScore++;
    rightSwipesForStreak++;

    heart.classList.add("show");
    setTimeout(() => heart.classList.remove("show"), 300);

    /* 🔥 STREAK CHECK */
    /* 🔥 STREAK CHECK */
if (rightSwipesForStreak >= STREAK_RIGHT_TARGET && canIncreaseStreak()) {
  streakIncrement++;

  // Store exact time in milliseconds for 24hr lock
  sessionStorage.setItem("lastStreakTime", Date.now());

  // Reset daily counter
  rightSwipesForStreak = 0;

  // Show popup
  showStreakPopup()
  console.log("🔥 Streak incremented! Next increment allowed after 24hrs.");
}




  } else {
    cross.classList.add("show");
    setTimeout(() => cross.classList.remove("show"), 300);
  }

  /* 📡 BACKEND UPDATE */
  if (totalSwipesForAPI === API_SWIPE_TARGET) {
    updateBackend();
  }

  currentCard.classList.add(
    direction === "right" ? "swipe-right" : "swipe-left"
  );

  setTimeout(() => {
    currentCard.classList.remove("active");
    currentIndex++;
    const next = document.querySelectorAll(".meme-card")[currentIndex];
    if (next) {
      next.classList.add("active");
      enableSwipe();
    }
  }, 300);
}

/* ================================
   BACKEND UPDATE
================================ */
async function updateBackend() {
  const payload = {
    username,
    totalSwipes: totalSwipesForAPI,
    swipes: rightSwipesForScore,
    streak: streakIncrement,
    score: rightSwipesForScore * 3 + streakIncrement * 5
  };

  console.log("📡 Sending payload:", payload);

  try {
    const response = await fetch("http://localhost:8080/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error("Backend error");

    /* ✅ RESET ONLY API COUNTERS */
    streakIncrement = 0;
    totalSwipesForAPI = 0;
    rightSwipesForScore = 0;

    console.log("✅ Backend synced", response);

  } catch (err) {
    console.error("❌ Update failed:", err);
  }
}

/* ================================
   INIT
================================ */
window.addEventListener("load", () => {
  enableSwipe();
  fetch("http://localhost:8080/All-User", 
 {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response     => response.json())
    .then(data => {
    console.log(data);
    })
}); 