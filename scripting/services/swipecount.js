/* ================================
   GLOBAL STATE (RUNTIME ONLY)
================================ */
let currentIndex = 0;
let startX = 0;
let currentCard = null;
let keyLocked = false;

/* ---- Counters ---- */
let rightSwipesForStreak = 0;   // ONLY for streak (50 rights)
let rightSwipesForScore = 0;    // ONLY for backend score
let totalSwipesForAPI = 0;      // left + right
let streakIncrement = 0;

/* ---- Constants ---- */
const STREAK_RIGHT_TARGET = 10;
const API_SWIPE_TARGET = 50;
const STREAK_COOLDOWN = 24 * 60 * 60 * 1000; // 24 hrs

 const username = localStorage.getItem("username");
console.log(username);

const swipeBox = document.getElementById("swipe");
const MAX_SWIPE = 300;
const STORAGE_KEY = "swipeCount";

// 🔄 Load saved value on page load
let swipeCount = Number(localStorage.getItem(STORAGE_KEY)) || 0;
updateSwipeUI();

// ➕ Call this whenever a swipe happens
function incrementSwipe() {
  swipeCount++;
  
  if(swipeCount==50){
    
  }
  if (swipeCount > MAX_SWIPE ) {
    
    swipeCount = 0; // 🔁 reset after 100
  }

  localStorage.setItem(STORAGE_KEY, swipeCount);
  updateSwipeUI();
}

// 🎯 Update UI
function updateSwipeUI() {
  swipeBox.textContent = `Swipes:${swipeCount}`;
}

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
  const lastTimestamp = localStorage.getItem("lastStreakTime"); // store as millis
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
function popupForGuest(totalSwipesForAPI, rightSwipesForScore, streakIncrement, username) {

  // STORE guest data
  localStorage.setItem("GuestTotalSwipes", totalSwipesForAPI);
  localStorage.setItem("GuestRightSwipes", rightSwipesForScore);
  localStorage.setItem("GuestStreakIncrement", streakIncrement);
  localStorage.setItem("guestTask", username);

  // READ guest data into popup
  document.getElementById("snapUsername").innerText =
    localStorage.getItem("guestTask");

  document.getElementById("snapScore").innerText =
    rightSwipesForScore * 3 + streakIncrement * 5;

  document.getElementById("snapSwipes").innerText =
    localStorage.getItem("GuestRightSwipes");

  document.getElementById("snapStreak").innerText =
    "🔥 " + localStorage.getItem("GuestStreakIncrement");

  // SHOW popup
  document.getElementById("snapshotOverlay").style.display = "flex";
  console.log(JSON.stringify(localStorage));

}



/* ================================
   MAIN SWIPE HANDLER
================================ */
// function swipe(direction) {
//   const heart = document.querySelector(".swipe-reaction.heart");
//   const cross = document.querySelector(".swipe-reaction.cross");
// incrementSwipe();

//   /* ---- Count ALL swipes ---- */
//   totalSwipesForAPI++;

//   if (direction === "right") {
//     rightSwipesForScore++;
//     rightSwipesForStreak++;

//     heart.classList.add("show");
//     setTimeout(() => heart.classList.remove("show"), 300);

//     /* 🔥 STREAK CHECK */
//     /* 🔥 STREAK CHECK */
// if (rightSwipesForStreak >= STREAK_RIGHT_TARGET && canIncreaseStreak()) {
//   streakIncrement++;

//   // Store exact time in milliseconds for 24hr lock
//   sessionStorage.setItem("lastStreakTime", Date.now());

//   // Reset daily counter
//   rightSwipesForStreak = 0;

//   // Show popup
//   // showStreakPopup()
//   console.log("🔥 Streak incremented! Next increment allowed after 24hrs.");
  
// }




//   } else {
//     cross.classList.add("show");
//     setTimeout(() => cross.classList.remove("show"), 300);
//   }

//   /* 📡 BACKEND UPDATE */
//   if (totalSwipesForAPI === API_SWIPE_TARGET) {
//     updateBackend();
//   }

//   currentCard.classList.add(
//     direction === "right" ? "swipe-right" : "swipe-left"
//   );

//   setTimeout(() => {
//     currentCard.classList.remove("active");
//     currentIndex++;
//     const next = document.querySelectorAll(".meme-card")[currentIndex];
//     if (next) {
//       next.classList.add("active");
//       enableSwipe();
//     }
//   }, 300);
// }



function swipe(direction) {
  const heart = document.querySelector(".swipe-reaction.heart");
  const cross = document.querySelector(".swipe-reaction.cross");
   incrementSwipe()
  /* ---- Count ALL swipes ---- */
  totalSwipesForAPI++;
  
  if (direction === "right") {
    rightSwipesForScore++;
    rightSwipesForStreak++;

    heart.classList.add("show");
    setTimeout(() => heart.classList.remove("show"), 300);

    /* 🔥 STREAK CHECK */
    if (rightSwipesForStreak >= STREAK_RIGHT_TARGET && canIncreaseStreak()) {
      streakIncrement++;
      localStorage.setItem("lastStreakTime", Date.now());
      rightSwipesForStreak = 0;
      console.log("🔥 Streak incremented!");
      showStreakPopup();
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

    /* ✅ THIS IS THE IMPORTANT LINE */
    onMemeSwiped(); // 🔥 increments daily quota + saves to localStorage

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
    const response = await fetch(API.updateUser(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error("Backend error");

    /* ✅ RESET ONLY API COUNTERS */
    streakIncrement = 0;
    totalSwipesForAPI = 0;
    rightSwipesForScore = 0;
console.log(JSON.stringify(localStorage));
    console.log("✅ Backend synced", response);

  } catch (err) {
    console.error("❌ Update failed:", err);
    
       console.log(totalSwipesForAPI);
    console.log(rightSwipesForScore);
    console.log(streakIncrement);
    console.log(username);
     localStorage.setItem("GuestTotalSwipes",totalSwipesForAPI);
  localStorage.setItem("GuestRightSwipes",rightSwipesForScore);
  localStorage.setItem("GuestStreakIncrement",streakIncrement);
  localStorage.setItem("guestTask",username);
      alert("Guest users cannot update insights to backend. Please register to save your progress.");
    popupForGuest(totalSwipesForAPI,rightSwipesForScore,streakIncrement,username);

    
  }
}



document.addEventListener("keydown", (e) => {
  if (keyLocked) return;
  if (!currentCard) return;

  if (e.key === "ArrowRight") {
    keyLocked = true;
    swipe("right");
  }

  if (e.key === "ArrowLeft") {
    keyLocked = true;
    swipe("left");
  }

  if (e.key === " ") {
    keyLocked = true;
    downloadCurrentMeme();
  }
});


document.addEventListener("keyup", () => {
  keyLocked = false;
});




/* ================================
   DISABLE SWIPE
================================ */
function disableSwipe() {
  if (!currentCard) return;

  // Touch events
  currentCard.removeEventListener("touchstart", startSwipe);
  currentCard.removeEventListener("touchmove", moveSwipe);
  currentCard.removeEventListener("touchend", endSwipe);

  // Mouse events
  currentCard.removeEventListener("mousedown", startSwipe);
  document.removeEventListener("mousemove", moveSwipe);
  document.removeEventListener("mouseup", endSwipe);

  // Optional: visually lock card
  currentCard.style.transform = "";
  currentCard.style.pointerEvents = "none";

  // Lock keyboard
  keyLocked = true;

  console.log("🚫 Swipe disabled");
}
 

/* ================================
   INIT
================================ */
window.addEventListener("load", () => {
  enableSwipe();
//   fetch("http://localhost:8080/All-User", 
//  {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response     => response.json())
//     .then(data => {
//     console.log(data);
//     })
}); 



