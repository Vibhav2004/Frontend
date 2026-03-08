



// /* =====================================================
//    DAILY SWIPE - MERGED (MEME FETCH + SWIPE LOGIC)
// ===================================================== */

// /* ================= CONFIG ================= */

// const BACKEND_API = "https://backend2-kpkg.onrender.com/daily-memes";
// const STORAGE_KEYs = "dailyMemeData";

// const DAILY_LIMIT = 300;
// const RENDER_CHUNK_SIZE = 50;
// // let userType=localStorage.getItem("username") 
// /* ================= STATE ================= */
// let loadedMemes = [];
// let currentIndexs = 0;
// let midnightTimer;
// let swipeEnabled = false;

// /* SWIPE STATE */
// let currentIndex = 0;
// let startX = 0;
// let currentCard = null;
// let keyLocked = false;

// const RIGHT_STREAK_KEY = "rightSwipesForStreak";
// let rightSwipesForStreak = Number(localStorage.getItem(RIGHT_STREAK_KEY)) || 0;
// const RIGHT_SWIPE_SCORE_KEY = "rightSwipesForScore";
// let rightSwipesForScore =
//   Number(localStorage.getItem(RIGHT_SWIPE_SCORE_KEY)) || 0;

// const API_SWIPE_STORAGE_KEY = "totalSwipesForAPI";
// let totalSwipesForAPI =
//   Number(localStorage.getItem(API_SWIPE_STORAGE_KEY)) || 0;
// let streakIncrement = 0;

// const STREAK_RIGHT_TARGET = 50;
// const API_SWIPE_TARGET = 50;

// /* USER */
// const username = localStorage.getItem("username");

// /* SWIPE COUNT UI */
// const swipeBox = document.getElementById("swipe");
// const STORAGE_KEY = "swipeCount";
// let swipeCount = Number(localStorage.getItem(STORAGE_KEY)) || 0;
// updateSwipeUI();

// /* ================= DATE ================= */
// function getTodayKey() {
//   return new Date().toISOString().split("T")[0];
// }



// function popupForGuest(totalSwipesForAPI, rightSwipesForScore, streakIncrement, username) {

//   // STORE guest data
//   localStorage.setItem("GuestTotalSwipes", totalSwipesForAPI);
//   localStorage.setItem("GuestRightSwipes", rightSwipesForScore);
//   localStorage.setItem("GuestStreakIncrement", streakIncrement);
//   localStorage.setItem("guestTask", username);

//   // READ guest data into popup
//   document.getElementById("snapUsername").innerText =
//     localStorage.getItem("guestTask");

//   document.getElementById("snapScore").innerText =
//     rightSwipesForScore * 3 + streakIncrement * 5;

//   document.getElementById("snapSwipes").innerText =
//     localStorage.getItem("GuestRightSwipes");

//   document.getElementById("snapStreak").innerText =
//     "🔥 " + localStorage.getItem("GuestStreakIncrement");

//   // SHOW popup
//   document.getElementById("snapshotOverlay").style.display = "flex";
  
//   // console.log(JSON.stringify(localStorage));

// }
// /* ================= STORAGE ================= */
// function getStoredData() {
//   return JSON.parse(localStorage.getItem(STORAGE_KEYs) || "null");
// }

// function setStoredData(data) {
//   localStorage.setItem(STORAGE_KEYs, JSON.stringify(data));
// }

// /* ================= SWIPE UI COUNTER ================= */
// function incrementSwipe() {
//   swipeCount++;

//   if (swipeCount > 300) swipeCount = 0;

//   localStorage.setItem(STORAGE_KEY, swipeCount);
//   updateSwipeUI();
// }

// function updateSwipeUI() {
//   if (swipeBox) swipeBox.textContent = `Swipes:${swipeCount}`;
// }

// /* ================= ENABLE / DISABLE SWIPE ================= */
// function enableSwipe() {
//   swipeEnabled = true;
//   document.body.classList.add("swipe-enabled");

//   currentCard = document.querySelector(".meme-card.active");
//   if (!currentCard) return;

//   currentCard.addEventListener("touchstart", startSwipe);
//   currentCard.addEventListener("touchmove", moveSwipe);
//   currentCard.addEventListener("touchend", endSwipe);

//   currentCard.addEventListener("mousedown", startSwipe);
// }

// function disableSwipe() {
//   swipeEnabled = false;
//   document.body.classList.remove("swipe-enabled");

//   if (!currentCard) return;

//   currentCard.removeEventListener("touchstart", startSwipe);
//   currentCard.removeEventListener("touchmove", moveSwipe);
//   currentCard.removeEventListener("touchend", endSwipe);

//   currentCard.removeEventListener("mousedown", startSwipe);
//   document.removeEventListener("mousemove", moveSwipe);
//   document.removeEventListener("mouseup", endSwipe);

//   currentCard.style.transform = "";
//   currentCard.style.pointerEvents = "none";
//   keyLocked = true;
// }

// /* ================= FETCH MEMES ================= */
// async function fetchDailyMemes() {
//   try {
//     const res = await fetch(`${BACKEND_API}?username=${username}`);
//     if (!res.ok) return [];
//     const urls = await res.json();
//     return urls.map(url => ({ url, title: "meme" }));
//     // Map to include title and author
//     // return memes.map(m => ({
//     //   url: m.url,
//     //   title: m.title || "No Title",
//     //   author: m.posted_by || "Anonymous"
//     // }));
//   } catch {
//     window.location.href="/pages/error.html"; 
//     return [];
//   }
// }
// // async function fetchDailyMemes(username) {
// //   try {
// //     const res = await fetch(`${BACKEND_API}?username=${username}`);
// //     if (!res.ok) return [];
// //     const urls = await res.json();

// //     console.log("Fetched memes for:", username);
// // console.log("API RESPONSE:", data);
// //     return urls.map(url => ({ url, title: "meme" }));
   
// //   } catch {
// //     return [];
// //   }
// // }

// /* ================= PRELOAD IMAGES ================= */
// function preloadImages(memes) {
//   return Promise.all(
//     memes.map(m =>
//       new Promise(resolve => {
//         const img = new Image();
//         img.src = m.url;
//         img.onload = () => resolve({ ...m, img });
//         img.onerror = () => resolve(null);
//       })
//     )
//   ).then(results => results.filter(Boolean));
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
//   if (loader) loader.remove();
// }

// /* ================= MIDNIGHT COUNTDOWN ================= */
// function startMidnightCountdown() {
//   const counterEl = document.getElementById("midnightCounter");
//   if (!counterEl) return;

//   if (midnightTimer) clearInterval(midnightTimer);

//   function updateCounter() {
//     const now = new Date();
//     const midnight = new Date();
//     midnight.setHours(24, 0, 0, 0);

//     const diff = midnight - now;
//     if (diff <= 0) {
//       counterEl.textContent = "New memes available!";
//       clearInterval(midnightTimer);
//        // ✅ Reset quota for new day
     
//       // Re-init memes for new day
//       initDailyMemes();
//       return;
//     }

//     const hrs = Math.floor(diff / 3600000);
//     const mins = Math.floor((diff % 3600000) / 60000);
//     const secs = Math.floor((diff % 60000) / 1000);

//     counterEl.textContent = `Next memes in: ${hrs}h ${mins}m ${secs}s`;
//   }

//   updateCounter();
//   midnightTimer = setInterval(updateCounter, 1000);
// }

// /* ================= RENDER QUOTA CARD ================= */
// function renderQuotaCard() {
//   const memeBox = document.querySelector(".memeBox");
//   memeBox.innerHTML = "";

//   const card = document.createElement("div");
//   card.className = "meme-card quota-card active";
//   card.innerHTML = `
//     <h2>🎉 Daily Quota Completed</h2>
//     <p>Come back tomorrow for fresh memes</p>
//     <p id="midnightCounter" style="font-weight:bold;"></p>
//   `;

//   memeBox.appendChild(card);
//   startMidnightCountdown();
//   disableSwipe();
 
 
// }

// /* ================= RENDER MEMES ================= */
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
// }
// // function renderNextChunk() {
// //   const memeBox = document.querySelector(".memeBox");
// //   if (currentIndexs >= loadedMemes.length) {
// //     renderQuotaCard();
// //     return;
// //   }

// //   const start = currentIndexs;
// //   const end = Math.min(start + RENDER_CHUNK_SIZE, loadedMemes.length);

// //   loadedMemes.slice(start, end).forEach((meme, i) => {
// //     const card = document.createElement("div");
// //     card.className = "meme-card";
// //     card.style.zIndex = loadedMemes.length - (start + i);

// //     if (start === currentIndexs && i === 0) {
// //       card.classList.add("active");
// //     }
// // console.log(meme);

// //     // append image
// //     card.appendChild(meme.img);

// //     // create info container
// //     const infoDiv = document.createElement("div");
// //     infoDiv.className = "meme-info";
// //     infoDiv.innerHTML = `
// //       <h3 class="meme-title">${meme.title}</h3>
// //       <p class="meme-author">by ${meme.author}</p>
// //     `;

// //     card.appendChild(infoDiv);
// //     memeBox.appendChild(card);
// //   });
// // }

// function renderInitial() {
//   const memeBox = document.querySelector(".memeBox");
//   memeBox.innerHTML = "";

//   if (currentIndexs >= loadedMemes.length) {
//     renderQuotaCard();
//     return;
//   }

//   renderNextChunk();
//   enableSwipe();
// }

// /* ================= SWIPE PROGRESS ================= */
// function onMemeSwiped() {
//   if (!swipeEnabled) return;

//   const data = getStoredData();
//   if (!data) return;

//   data.index += 1;
//   setStoredData(data);
//   currentIndexs = data.index;

//   if (currentIndexs >= loadedMemes.length) {
//     renderQuotaCard();
//     disableSwipe();
//     return;
//   }

//   if (currentIndexs % RENDER_CHUNK_SIZE === 0) {
//     renderNextChunk();
//     setTimeout(enableSwipe, 50);
//   }
// }

// /* ================= SWIPE HANDLERS ================= */
// function startSwipe(e) {
//   startX = e.touches ? e.touches[0].clientX : e.clientX;
//   document.addEventListener("mousemove", moveSwipe);
//   document.addEventListener("mouseup", endSwipe);
// }

// function moveSwipe(e) {
//   const x = e.touches ? e.touches[0].clientX : e.clientX;
//   const deltaX = x - startX;
//   currentCard.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.05}deg)`;
// }

// function endSwipe(e) {
//   const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
//   const deltaX = endX - startX;
//   const threshold = 120;

//   document.removeEventListener("mousemove", moveSwipe);
//   document.removeEventListener("mouseup", endSwipe);

//   if (deltaX > threshold) swipe("right");
//   else if (deltaX < -threshold) swipe("left");
//   else currentCard.style.transform = "";
// }

// /* ================= STREAK CHECK ================= */
// function canIncreaseStreak() {
//   const lastTimestamp = localStorage.getItem("lastStreakTime");
//   if (!lastTimestamp) return true;

//   return Date.now() - Number(lastTimestamp) >= 24 * 60 * 60 * 1000;
// }

// /* ================= STREAK POPUP ================= */
// // function showStreakPopup() {
// //   const popup = document.getElementById("streakPopup");
// //   if (!popup) return;
// //   popup.style.display = "flex";
// //   setTimeout(() => (popup.style.display = "none"), 2000);
// // }
// function showStreakPopup(streakDays) {
//   const popup = document.getElementById("streakPopup");
//   if (!popup) return;

//   popup.style.display = "flex";

//   const weeks = document.querySelectorAll(".week");
//   const completedWeeks = Math.floor(streakDays / 7);
//   const leftoverDays = streakDays % 7;

//   weeks.forEach((week, index) => {
//     const fill = week.querySelector(".fill");
//     fill.style.width = "0%"; // reset

//     if (index < completedWeeks) {
//       // Fully complete week
//       setTimeout(() => (fill.style.width = "100%"), index * 150);
//     } else if (index === completedWeeks) {
//       // Partial fill for current week
//       const percent = (leftoverDays / 7) * 100;
//       setTimeout(() => (fill.style.width = percent + "%"), index * 150);
//     }
//   });

//   document.getElementById("streakCount").innerText = `🔥 ${streakDays} Days`;

//   // Auto-close after 2s
//   setTimeout(() => (popup.style.display = "none"), 2000);
// }
// /* ================= SWIPE ACTION ================= */
// function swipe(direction) {
//   const heart = document.querySelector(".swipe-reaction.heart");
//   const cross = document.querySelector(".swipe-reaction.cross");

//   incrementSwipe();
  
//   totalSwipesForAPI++;
//   localStorage.setItem(API_SWIPE_STORAGE_KEY, totalSwipesForAPI);

//   if (direction === "right") {
//     rightSwipesForScore++;
//     localStorage.setItem(RIGHT_SWIPE_SCORE_KEY, rightSwipesForScore);
    
// rightSwipesForStreak++;
//     localStorage.setItem(RIGHT_STREAK_KEY, rightSwipesForStreak);
//     heart?.classList.add("show");
//     setTimeout(() => heart?.classList.remove("show"), 300);

//     if (rightSwipesForStreak >= STREAK_RIGHT_TARGET && canIncreaseStreak()) {
//       streakIncrement++;
//       localStorage.setItem("lastStreakTime", Date.now());
//        rightSwipesForStreak = 0;
//         localStorage.setItem(RIGHT_STREAK_KEY, rightSwipesForStreak);
//       showStreakPopup();
//     }
//   } else {
//     cross?.classList.add("show");
//     setTimeout(() => cross?.classList.remove("show"), 300);
//   }

//   if (totalSwipesForAPI >= API_SWIPE_TARGET) {
//     updateBackend();
//   }

//   currentCard.classList.add(direction === "right" ? "swipe-right" : "swipe-left");

//   setTimeout(() => {
//     currentCard.classList.remove("active");
//     onMemeSwiped();

//     currentIndex++;
//     const next = document.querySelectorAll(".meme-card")[currentIndex];
//     if (next) {
//       next.classList.add("active");
//       enableSwipe();
//     }
//   }, 300);
// }

// /* ================= BACKEND UPDATE ================= */
// // async function updateBackend() {

// //   const payload = {
// //     username,
// //     totalSwipes: totalSwipesForAPI,
// //     swipes: rightSwipesForScore,
// //     streak: rightSwipesForStreak,
    
// //   };

// //   try {
// //     const response = await fetch(API.updateUser(), {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(payload),
// //     });

// //     if (!response.ok) throw new Error("Backend error");

// //     streakIncrement = 0;
   
// //     localStorage.setItem(RIGHT_STREAK_KEY, rightSwipesForStreak);
// // totalSwipesForAPI = 0;
// // localStorage.setItem(API_SWIPE_STORAGE_KEY, totalSwipesForAPI);
// //     rightSwipesForScore = 0;
// //     localStorage.setItem(RIGHT_SWIPE_SCORE_KEY, rightSwipesForScore);
// //   } catch {
// //     disableSwipe();
// //     localStorage.setItem("GuestTotalSwipes", totalSwipesForAPI);
// //     localStorage.setItem("GuestRightSwipes", rightSwipesForScore);
// //     localStorage.setItem("GuestStreakIncrement", streakIncrement);
// //     popupForGuest(totalSwipesForAPI, rightSwipesForScore, streakIncrement, username);
// //   }
// // }
// async function updateBackend() {
//   const payload = {
//     username,
//     totalSwipes: totalSwipesForAPI,
//     swipes: rightSwipesForScore,  // only session swipes
//     streak: rightSwipesForStreak,
//   };

//   try {
//     const response = await fetch(API.updateUser(), {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) throw new Error("Backend error");

//     streakIncrement = 0;

//     // Merge session swipes into localStorage so next session starts from DB total
//     rightSwipesForScore = 0;  // reset session swipes
//     localStorage.setItem(RIGHT_SWIPE_SCORE_KEY, rightSwipesForScore);

//     totalSwipesForAPI = 0;
//     localStorage.setItem(API_SWIPE_STORAGE_KEY, totalSwipesForAPI);

//     localStorage.setItem(RIGHT_STREAK_KEY, rightSwipesForStreak);

//   } catch {
//     disableSwipe();
//     localStorage.setItem("GuestTotalSwipes", totalSwipesForAPI);
//     localStorage.setItem("GuestRightSwipes", rightSwipesForScore);
//     localStorage.setItem("GuestStreakIncrement", streakIncrement);
//     popupForGuest(totalSwipesForAPI, rightSwipesForScore, streakIncrement, username);
//   }
// }

// /* ================= INIT ================= */
// async function initDailyMemes() {
//   rightSwipesForStreak = Number(localStorage.getItem(RIGHT_STREAK_KEY)) || 0;
//   const memeBox = document.querySelector(".memeBox");
//   const today = getTodayKey();
  
 
//   let storedData = getStoredData();

//   if (!storedData || storedData.date !== today) {
//     createLoader(memeBox);

//     const memes = await fetchDailyMemes(username);
//     loadedMemes = await preloadImages(memes);

//     storedData = {
//       date: today,
//       memes: loadedMemes.map(m => ({ url: m.url, title: m.title })),
//       index: 0,
//     };

//     setStoredData(storedData);
//     currentIndexs = 0;

//     renderInitial();
//     removeLoader(memeBox);

//     setTimeout(enableSwipe, 100);
//   } else {
//     currentIndexs = storedData.index;

//     loadedMemes = storedData.memes.map(m => {
//       const img = new Image();
//       img.src = m.url;
//       img.alt = m.title;
//       return { ...m, img };
//     });

//     renderInitial();
//   }
// }
// /* ================= KEYBOARD SWIPE ================= */
// document.addEventListener("keydown", (e) => {
//   if (keyLocked) return;
//   if (!currentCard) return;

//   if (e.key === "ArrowRight") {
//     keyLocked = true;
//     swipe("right");
//   }

//   if (e.key === "ArrowLeft") {
//     keyLocked = true;
//     swipe("left");
//   }
// });

// /* unlock on key release (so next swipe works) */
// document.addEventListener("keyup", () => {
//   keyLocked = false;
// });
// window.addEventListener("load", initDailyMemes);

// /* =====================================================
//    DAILY SWIPE - MERGED (MEME FETCH + SWIPE LOGIC)
//    FULLY OPTIMIZED FOR FAST RENDERING
// ===================================================== */

// /* ================= CONFIG ================= */
// const BACKEND_API = "https://backend2-kpkg.onrender.com/daily-memes";
// const STORAGE_KEYs = "dailyMemeData";

// const DAILY_LIMIT = 300;
// const RENDER_CHUNK_SIZE = 50;

// /* ================= STATE ================= */
// let loadedMemes = [];
// let currentIndexs = 0;
// let midnightTimer;
// let swipeEnabled = false;

// /* SWIPE STATE */
// let currentIndex = 0;
// let startX = 0;
// let currentCard = null;
// let keyLocked = false;

// const RIGHT_STREAK_KEY = "rightSwipesForStreak";
// let rightSwipesForStreak = Number(localStorage.getItem(RIGHT_STREAK_KEY)) || 0;
// const RIGHT_SWIPE_SCORE_KEY = "rightSwipesForScore";
// let rightSwipesForScore = Number(localStorage.getItem(RIGHT_SWIPE_SCORE_KEY)) || 0;

// const API_SWIPE_STORAGE_KEY = "totalSwipesForAPI";
// let totalSwipesForAPI = Number(localStorage.getItem(API_SWIPE_STORAGE_KEY)) || 0;
// let streakIncrement = 0;

// const STREAK_RIGHT_TARGET = 50;
// const API_SWIPE_TARGET = 50;

// /* USER */
// const username = localStorage.getItem("username");

// /* SWIPE COUNT UI */
// const swipeBox = document.getElementById("swipe");
// const STORAGE_KEY = "swipeCount";
// let swipeCount = Number(localStorage.getItem(STORAGE_KEY)) || 0;
// updateSwipeUI();

// /* ================= DATE ================= */
// function getTodayKey() {
//   return new Date().toISOString().split("T")[0];
// }

// /* ================= POPUP FOR GUEST ================= */
// function popupForGuest(totalSwipesForAPI, rightSwipesForScore, streakIncrement, username) {
//   localStorage.setItem("GuestTotalSwipes", totalSwipesForAPI);
//   localStorage.setItem("GuestRightSwipes", rightSwipesForScore);
//   localStorage.setItem("GuestStreakIncrement", streakIncrement);
//   localStorage.setItem("guestTask", username);

//   document.getElementById("snapUsername").innerText = localStorage.getItem("guestTask");
//   document.getElementById("snapScore").innerText = rightSwipesForScore * 3 + streakIncrement * 5;
//   document.getElementById("snapSwipes").innerText = localStorage.getItem("GuestRightSwipes");
//   document.getElementById("snapStreak").innerText = "🔥 " + localStorage.getItem("GuestStreakIncrement");

//   document.getElementById("snapshotOverlay").style.display = "flex";
// }

// /* ================= STORAGE ================= */
// function getStoredData() {
//   return JSON.parse(localStorage.getItem(STORAGE_KEYs) || "null");
// }

// function setStoredData(data) {
//   localStorage.setItem(STORAGE_KEYs, JSON.stringify(data));
// }

// /* ================= SWIPE UI COUNTER ================= */
// function incrementSwipe() {
//   swipeCount++;
//   if (swipeCount > 300) swipeCount = 0;
//   localStorage.setItem(STORAGE_KEY, swipeCount);
//   updateSwipeUI();
// }

// function updateSwipeUI() {
//   if (swipeBox) swipeBox.textContent = `Swipes:${swipeCount}`;
// }

// /* ================= ENABLE / DISABLE SWIPE ================= */
// function enableSwipe() {
//   swipeEnabled = true;
//   document.body.classList.add("swipe-enabled");

//   currentCard = document.querySelector(".meme-card.active");
//   if (!currentCard) return;

//   currentCard.addEventListener("touchstart", startSwipe);
//   currentCard.addEventListener("touchmove", moveSwipe);
//   currentCard.addEventListener("touchend", endSwipe);
//   currentCard.addEventListener("mousedown", startSwipe);
// }

// function disableSwipe() {
//   swipeEnabled = false;
//   document.body.classList.remove("swipe-enabled");

//   if (!currentCard) return;

//   currentCard.removeEventListener("touchstart", startSwipe);
//   currentCard.removeEventListener("touchmove", moveSwipe);
//   currentCard.removeEventListener("touchend", endSwipe);
//   currentCard.removeEventListener("mousedown", startSwipe);
//   document.removeEventListener("mousemove", moveSwipe);
//   document.removeEventListener("mouseup", endSwipe);

//   currentCard.style.transform = "";
//   currentCard.style.pointerEvents = "none";
//   keyLocked = true;
// }

// /* ================= FETCH MEMES ================= */
// async function fetchDailyMemes() {
//   try {
//     const res = await fetch(`${BACKEND_API}?username=${username}`);
//     if (!res.ok) return [];
//     const urls = await res.json();
//     return urls.map(url => ({ url, title: "meme" }));
//   } catch {
//     window.location.href = "/pages/error.html";
//     return [];
//   }
// }

// /* ================= PRELOAD IMAGES IN CHUNKS ================= */
// function preloadImages(memes) {
//   return Promise.all(
//     memes.map(m =>
//       new Promise(resolve => {
//         const img = new Image();
//         img.src = m.url;
//         img.loading = "lazy";
//         img.onload = () => resolve({ ...m, img });
//         img.onerror = () => resolve(null);
//       })
//     )
//   ).then(results => results.filter(Boolean));
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
//   if (loader) loader.remove();
// }

// /* ================= MIDNIGHT COUNTDOWN ================= */
// function startMidnightCountdown() {
//   const counterEl = document.getElementById("midnightCounter");
//   if (!counterEl) return;

//   if (midnightTimer) clearInterval(midnightTimer);

//   function updateCounter() {
//     const now = new Date();
//     const midnight = new Date();
//     midnight.setHours(24, 0, 0, 0);

//     const diff = midnight - now;
//     if (diff <= 0) {
//       counterEl.textContent = "New memes available!";
//       clearInterval(midnightTimer);
//       initDailyMemes();
//       return;
//     }

//     const hrs = Math.floor(diff / 3600000);
//     const mins = Math.floor((diff % 3600000) / 60000);
//     const secs = Math.floor((diff % 60000) / 1000);
//     counterEl.textContent = `Next memes in: ${hrs}h ${mins}m ${secs}s`;
//   }

//   updateCounter();
//   midnightTimer = setInterval(updateCounter, 1000);
// }

// /* ================= RENDER QUOTA CARD ================= */
// function renderQuotaCard() {
//   const memeBox = document.querySelector(".memeBox");
//   memeBox.innerHTML = "";

//   const card = document.createElement("div");
//   card.className = "meme-card quota-card active";
//   card.innerHTML = `
//     <h2>🎉 Daily Quota Completed</h2>
//     <p>Come back tomorrow for fresh memes</p>
//     <p id="midnightCounter" style="font-weight:bold;"></p>
//   `;

//   memeBox.appendChild(card);
//   startMidnightCountdown();
//   disableSwipe();
// }

// /* ================= RENDER MEMES IN CHUNKS ================= */
// function renderNextChunk() {
//   const memeBox = document.querySelector(".memeBox");
//   if (currentIndexs >= loadedMemes.length) {
//     renderQuotaCard();
//     return;
//   }

//   const start = currentIndexs;
//   const end = Math.min(start + RENDER_CHUNK_SIZE, loadedMemes.length);

//   const fragment = document.createDocumentFragment();
//   loadedMemes.slice(start, end).forEach((meme, i) => {
//     const card = document.createElement("div");
//     card.className = "meme-card";
//     card.style.zIndex = loadedMemes.length - (start + i);
//     if (start === currentIndexs && i === 0) card.classList.add("active");
//     meme.img.alt = meme.title;
//     fragment.appendChild(card).appendChild(meme.img);
//   });

//   memeBox.appendChild(fragment);

//   // Preload next chunk in background
//   if (end < loadedMemes.length) {
//     preloadImages(loadedMemes.slice(end, Math.min(end + RENDER_CHUNK_SIZE, loadedMemes.length)));
//   }
// }

// function renderInitial() {
//   const memeBox = document.querySelector(".memeBox");
//   memeBox.innerHTML = "";

//   if (currentIndexs >= loadedMemes.length) {
//     renderQuotaCard();
//     return;
//   }

//   renderNextChunk();
//   enableSwipe();
// }

// /* ================= SWIPE PROGRESS ================= */
// function onMemeSwiped() {
//   if (!swipeEnabled) return;

//   const data = getStoredData();
//   if (!data) return;

//   data.index += 1;
//   setStoredData(data);
//   currentIndexs = data.index;

//   if (currentIndexs >= loadedMemes.length) {
//     renderQuotaCard();
//     disableSwipe();
//     return;
//   }

//   if (currentIndexs % RENDER_CHUNK_SIZE === 0) {
//     renderNextChunk();
//     setTimeout(enableSwipe, 50);
//   }
// }

// /* ================= SWIPE HANDLERS WITH rAF ================= */
// let animFrame;
// function startSwipe(e) {
//   startX = e.touches ? e.touches[0].clientX : e.clientX;
//   document.addEventListener("mousemove", moveSwipe);
//   document.addEventListener("mouseup", endSwipe);
// }

// function moveSwipe(e) {
//   const x = e.touches ? e.touches[0].clientX : e.clientX;
//   const deltaX = x - startX;

//   cancelAnimationFrame(animFrame);
//   animFrame = requestAnimationFrame(() => {
//     if (currentCard) currentCard.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.05}deg)`;
//   });
// }

// function endSwipe(e) {
//   const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
//   const deltaX = endX - startX;
//   const threshold = 120;

//   document.removeEventListener("mousemove", moveSwipe);
//   document.removeEventListener("mouseup", endSwipe);

//   if (deltaX > threshold) swipe("right");
//   else if (deltaX < -threshold) swipe("left");
//   else if (currentCard) currentCard.style.transform = "";
// }

// /* ================= STREAK CHECK ================= */
// function canIncreaseStreak() {
//   const lastTimestamp = localStorage.getItem("lastStreakTime");
//   if (!lastTimestamp) return true;
//   return Date.now() - Number(lastTimestamp) >= 24 * 60 * 60 * 1000;
// }

// /* ================= STREAK POPUP ================= */
// function showStreakPopup(streakDays) {
//   const popup = document.getElementById("streakPopup");
//   if (!popup) return;

//   popup.style.display = "flex";

//   const weeks = document.querySelectorAll(".week");
//   const completedWeeks = Math.floor(streakDays / 7);
//   const leftoverDays = streakDays % 7;

//   weeks.forEach((week, index) => {
//     const fill = week.querySelector(".fill");
//     fill.style.width = "0%";

//     if (index < completedWeeks) {
//       setTimeout(() => (fill.style.width = "100%"), index * 150);
//     } else if (index === completedWeeks) {
//       const percent = (leftoverDays / 7) * 100;
//       setTimeout(() => (fill.style.width = percent + "%"), index * 150);
//     }
//   });

//   document.getElementById("streakCount").innerText = `🔥 ${streakDays} Days`;
//   setTimeout(() => (popup.style.display = "none"), 2000);
// }

// /* ================= SWIPE ACTION ================= */
// function swipe(direction) {
//   const heart = document.querySelector(".swipe-reaction.heart");
//   const cross = document.querySelector(".swipe-reaction.cross");

//   incrementSwipe();
//   totalSwipesForAPI++;
//   localStorage.setItem(API_SWIPE_STORAGE_KEY, totalSwipesForAPI);

//   if (direction === "right") {
//     rightSwipesForScore++;
//     localStorage.setItem(RIGHT_SWIPE_SCORE_KEY, rightSwipesForScore);

//     rightSwipesForStreak++;
//     localStorage.setItem(RIGHT_STREAK_KEY, rightSwipesForStreak);

//     heart?.classList.add("show");
//     setTimeout(() => heart?.classList.remove("show"), 300);

//     if (rightSwipesForStreak >= STREAK_RIGHT_TARGET && canIncreaseStreak()) {
//       streakIncrement++;
//       localStorage.setItem("lastStreakTime", Date.now());
//       rightSwipesForStreak = 0;
//       localStorage.setItem(RIGHT_STREAK_KEY, rightSwipesForStreak);
//       showStreakPopup();
//     }
//   } else {
//     cross?.classList.add("show");
//     setTimeout(() => cross?.classList.remove("show"), 300);
//   }

//   if (totalSwipesForAPI >= API_SWIPE_TARGET) updateBackend();

//   if (currentCard) currentCard.classList.add(direction === "right" ? "swipe-right" : "swipe-left");

//   setTimeout(() => {
//     if (currentCard) currentCard.classList.remove("active");
//     onMemeSwiped();

//     currentIndex++;
//     const next = document.querySelectorAll(".meme-card")[currentIndex];
//     if (next) {
//       next.classList.add("active");
//       enableSwipe();
//     }
//   }, 300);
// }

// /* ================= BACKEND UPDATE ================= */
// async function updateBackend() {
//   const payload = {
//     username,
//     totalSwipes: totalSwipesForAPI,
//     swipes: rightSwipesForScore,
//     streak: rightSwipesForStreak,
//   };

//   try {
//     const response = await fetch(API.updateUser(), {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) throw new Error("Backend error");

//     streakIncrement = 0;
//     rightSwipesForScore = 0;
//     localStorage.setItem(RIGHT_SWIPE_SCORE_KEY, rightSwipesForScore);
//     totalSwipesForAPI = 0;
//     localStorage.setItem(API_SWIPE_STORAGE_KEY, totalSwipesForAPI);
//     localStorage.setItem(RIGHT_STREAK_KEY, rightSwipesForStreak);
//   } catch {
//     disableSwipe();
//     localStorage.setItem("GuestTotalSwipes", totalSwipesForAPI);
//     localStorage.setItem("GuestRightSwipes", rightSwipesForScore);
//     localStorage.setItem("GuestStreakIncrement", streakIncrement);
//     popupForGuest(totalSwipesForAPI, rightSwipesForScore, streakIncrement, username);
//   }
// }

// /* ================= INIT DAILY MEMES ================= */
// async function initDailyMemes() {
//   rightSwipesForStreak = Number(localStorage.getItem(RIGHT_STREAK_KEY)) || 0;
//   const memeBox = document.querySelector(".memeBox");
//   const today = getTodayKey();

//   let storedData = getStoredData();

//   if (!storedData || storedData.date !== today) {
//     createLoader(memeBox);

//     const memes = await fetchDailyMemes(username);

//     // Preload only first chunk immediately
//     loadedMemes = await preloadImages(memes.slice(0, RENDER_CHUNK_SIZE));
//     // Keep rest for lazy preload
//     const remainingMemes = memes.slice(RENDER_CHUNK_SIZE).map(m => ({ ...m, img: null }));
//     loadedMemes = [...loadedMemes, ...remainingMemes];

//     storedData = {
//       date: today,
//       memes: loadedMemes.map(m => ({ url: m.url, title: m.title })),
//       index: 0,
//     };

//     setStoredData(storedData);
//     currentIndexs = 0;

//     renderInitial();
//     removeLoader(memeBox);

//     // Preload remaining chunks in background
//     setTimeout(async () => {
//       for (let i = RENDER_CHUNK_SIZE; i < loadedMemes.length; i += RENDER_CHUNK_SIZE) {
//         const chunk = loadedMemes.slice(i, i + RENDER_CHUNK_SIZE);
//         const preloaded = await preloadImages(chunk.map(m => ({ url: m.url, title: m.title })));
//         preloaded.forEach((p, idx) => (loadedMemes[i + idx].img = p.img));
//       }
//     }, 500);

//     setTimeout(enableSwipe, 100);
//   } else {
//     currentIndexs = storedData.index;
//     loadedMemes = storedData.memes.map(m => {
//       const img = new Image();
//       img.src = m.url;
//       img.alt = m.title;
//       img.loading = "lazy";
//       return { ...m, img };
//     });
//     renderInitial();
//   }
// }

// /* ================= KEYBOARD SWIPE ================= */
// document.addEventListener("keydown", (e) => {
//   if (keyLocked) return;
//   if (!currentCard) return;
//   if (e.key === "ArrowRight") { keyLocked = true; swipe("right"); }
//   if (e.key === "ArrowLeft") { keyLocked = true; swipe("left"); }
// });

// document.addEventListener("keyup", () => { keyLocked = false; });
// window.addEventListener("load", initDailyMemes);



// /* =====================================================
//    DAILY SWIPE - MERGED (MEME FETCH + SWIPE LOGIC)
//    FULLY OPTIMIZED FOR FAST RENDERING
// ===================================================== */

// /* ================= CONFIG ================= */
// const BACKEND_API = "https://backend2-kpkg.onrender.com/daily-memes";
// const STORAGE_KEYs = "dailyMemeData";
// const RENDER_CHUNK_SIZE = 50;

// /* ================= STATE ================= */
// let loadedMemes = [];
// let currentIndexs = 0;
// let midnightTimer;
// let swipeEnabled = false;

// /* SWIPE STATE */
// let currentIndex = 0;
// let startX = 0;
// let currentCard = null;
// let keyLocked = false;

// const RIGHT_STREAK_KEY = "rightSwipesForStreak";
// let rightSwipesForStreak = Number(localStorage.getItem(RIGHT_STREAK_KEY)) || 0;
// const RIGHT_SWIPE_SCORE_KEY = "rightSwipesForScore";
// let rightSwipesForScore = Number(localStorage.getItem(RIGHT_SWIPE_SCORE_KEY)) || 0;

// const API_SWIPE_STORAGE_KEY = "totalSwipesForAPI";
// let totalSwipesForAPI = Number(localStorage.getItem(API_SWIPE_STORAGE_KEY)) || 0;
// let streakIncrement = 0;

// const STREAK_RIGHT_TARGET = 50;
// const API_SWIPE_TARGET = 50;

// /* USER */
// const username = localStorage.getItem("username");

// /* SWIPE COUNT UI */
// const swipeBox = document.getElementById("swipe");
// const STORAGE_KEY = "swipeCount";
// let swipeCount = Number(localStorage.getItem(STORAGE_KEY)) || 0;
// updateSwipeUI();

// /* ================= DATE ================= */
// function getTodayKey() {
//   return new Date().toISOString().split("T")[0];
// }

// /* ================= POPUP FOR GUEST ================= */
// function popupForGuest(totalSwipesForAPI, rightSwipesForScore, streakIncrement, username) {
//   localStorage.setItem("GuestTotalSwipes", totalSwipesForAPI);
//   localStorage.setItem("GuestRightSwipes", rightSwipesForScore);
//   localStorage.setItem("GuestStreakIncrement", streakIncrement);
//   localStorage.setItem("guestTask", username);

//   document.getElementById("snapUsername").innerText = localStorage.getItem("guestTask");
//   document.getElementById("snapScore").innerText = rightSwipesForScore * 3 + streakIncrement * 5;
//   document.getElementById("snapSwipes").innerText = localStorage.getItem("GuestRightSwipes");
//   document.getElementById("snapStreak").innerText = "🔥 " + localStorage.getItem("GuestStreakIncrement");

//   document.getElementById("snapshotOverlay").style.display = "flex";
// }

// /* ================= STORAGE ================= */
// function getStoredData() {
//   return JSON.parse(localStorage.getItem(STORAGE_KEYs) || "null");
// }

// function setStoredData(data) {
//   localStorage.setItem(STORAGE_KEYs, JSON.stringify(data));
// }

// /* ================= SWIPE UI COUNTER ================= */
// function incrementSwipe() {
//   swipeCount++;
//   if (swipeCount > 300) swipeCount = 0;
//   localStorage.setItem(STORAGE_KEY, swipeCount);
//   updateSwipeUI();
// }

// function updateSwipeUI() {
//   if (swipeBox) swipeBox.textContent = `Swipes:${swipeCount}`;
// }

// /* ================= ENABLE / DISABLE SWIPE ================= */
// function enableSwipe() {
//   swipeEnabled = true;
//   document.body.classList.add("swipe-enabled");

//   currentCard = document.querySelector(".meme-card.active");
//   if (!currentCard) return;

//   currentCard.addEventListener("touchstart", startSwipe);
//   currentCard.addEventListener("touchmove", moveSwipe);
//   currentCard.addEventListener("touchend", endSwipe);
//   currentCard.addEventListener("mousedown", startSwipe);
// }

// function disableSwipe() {
//   swipeEnabled = false;
//   document.body.classList.remove("swipe-enabled");

//   if (!currentCard) return;

//   currentCard.removeEventListener("touchstart", startSwipe);
//   currentCard.removeEventListener("touchmove", moveSwipe);
//   currentCard.removeEventListener("touchend", endSwipe);
//   currentCard.removeEventListener("mousedown", startSwipe);
//   document.removeEventListener("mousemove", moveSwipe);
//   document.removeEventListener("mouseup", endSwipe);

//   currentCard.style.transform = "";
//   currentCard.style.pointerEvents = "none";
//   keyLocked = true;
// }

// /* ================= FETCH MEMES ================= */
// async function fetchDailyMemes() {
//   try {
//     const res = await fetch(`${BACKEND_API}?username=${username}`);
//     if (!res.ok) return [];
//     const urls = await res.json();
//     return urls.map(url => ({ url, title: "meme" }));
//   } catch {
//     window.location.href = "/pages/error.html";
//     return [];
//   }
// }

// /* ================= PRELOAD IMAGES ================= */
// function preloadImages(memes) {
//   return memes.map(m => {
//     if (m.img) return Promise.resolve(m); // already loaded
//     return new Promise(resolve => {
//       const img = new Image();
//       img.src = m.url;
//       img.alt = m.title;
//       img.loading = "lazy";
//       img.onload = () => resolve({ ...m, img });
//       img.onerror = () => resolve({ ...m, img: null });
//     });
//   });
// }

// /* ================= LOADER ================= */
// function createLoader(container) {
//   if (container.querySelector(".meme-loader")) return;
//   const loader = document.createElement("div");
//   loader.className = "meme-loader";
//   loader.innerHTML = `<div class="spinner"></div><p>Loading memes...</p>`;
//   container.appendChild(loader);
// }

// function removeLoader(container) {
//   const loader = container.querySelector(".meme-loader");
//   if (loader) loader.remove();
// }

// /* ================= MIDNIGHT COUNTDOWN ================= */
// function startMidnightCountdown() {
//   const counterEl = document.getElementById("midnightCounter");
//   if (!counterEl) return;

//   if (midnightTimer) clearInterval(midnightTimer);

//   function updateCounter() {
//     const now = new Date();
//     const midnight = new Date();
//     midnight.setHours(24, 0, 0, 0);

//     const diff = midnight - now;
//     if (diff <= 0) {
//       counterEl.textContent = "New memes available!";
//       clearInterval(midnightTimer);
//       initDailyMemes();
//       return;
//     }

//     const hrs = Math.floor(diff / 3600000);
//     const mins = Math.floor((diff % 3600000) / 60000);
//     const secs = Math.floor((diff % 60000) / 1000);
//     counterEl.textContent = `Next memes in: ${hrs}h ${mins}m ${secs}s`;
//   }

//   updateCounter();
//   midnightTimer = setInterval(updateCounter, 1000);
// }

// // /* ================= RENDER QUOTA CARD ================= */
// // function renderQuotaCard() {
// //   const memeBox = document.querySelector(".memeBox");
// //   memeBox.innerHTML = "";

// //   const card = document.createElement("div");
// //   card.className = "meme-card quota-card active";
// //   card.innerHTML = `
// //     <h2>🎉 Daily Quota Completed</h2>
// //     <p>Come back tomorrow for fresh memes</p>
// //     <p id="midnightCounter" style="font-weight:bold;"></p>
// //   `;

// //   memeBox.appendChild(card);
// //   startMidnightCountdown();
// //   disableSwipe();
// // }
// /* ================= RENDER QUOTA CARD ================= */
// function renderQuotaCard() {
//   const memeBox = document.querySelector(".memeBox");
//   memeBox.innerHTML = "";

//   const card = document.createElement("div");
//   card.className = "meme-card quota-card active";
//   card.innerHTML = `
//     <h2>🎉 Daily Quota Completed</h2>
//     <p>Come back tomorrow for fresh memes</p>
//     <p id="midnightCounter" style="font-weight:bold;"></p>

//     <div style="margin-top:20px;">
//       <a href="https://www.buymeacoffee.com/vibhavkhichi" target="_blank">
//         <img 
//           src="https://img.buymeacoffee.com/button-api/?text=Coffee?&emoji=😁&slug=vibhavkhichi&button_colour=000000&font_colour=ffffff&font_family=Poppins&outline_colour=ffffff&coffee_colour=FFDD00"
//           alt="Buy Me a Coffee"
//           style="height:50px; border-radius:8px;"
//         />
//       </a>
//     </div>
//   `;

//   memeBox.appendChild(card);
//   startMidnightCountdown();
//   disableSwipe();
// }

// /* ================= RENDER MEMES IN CHUNKS ================= */
// function renderNextChunk() {
//   const memeBox = document.querySelector(".memeBox");
//   if (currentIndexs >= loadedMemes.length) {
//     renderQuotaCard();
//     return;
//   }

//   const start = currentIndexs;
//   const end = Math.min(start + RENDER_CHUNK_SIZE, loadedMemes.length);
//   const fragment = document.createDocumentFragment();

//   loadedMemes.slice(start, end).forEach((meme, i) => {
//     const card = document.createElement("div");
//     card.className = "meme-card";
//     card.style.zIndex = loadedMemes.length - (start + i);
//     if (start === currentIndexs && i === 0) card.classList.add("active");

//     if (!meme.img) {
//       const img = new Image();
//       img.src = meme.url;
//       img.alt = meme.title;
//       img.loading = "lazy";
//       meme.img = img;
//     }

//     card.appendChild(meme.img);
//     fragment.appendChild(card);
//   });

//   memeBox.appendChild(fragment);

//   // Lazy preload remaining memes in parallel
//   const remaining = loadedMemes.slice(end);
//   Promise.all(preloadImages(remaining)).then(preloaded => {
//     preloaded.forEach((p, idx) => (loadedMemes[end + idx].img = p.img));
//   });
// }

// function renderInitial() {
//   const memeBox = document.querySelector(".memeBox");
//   memeBox.innerHTML = "";

//   if (currentIndexs >= loadedMemes.length) {
//     renderQuotaCard();
//     return;
//   }

//   renderNextChunk();
//   enableSwipe();
// }

// /* ================= SWIPE PROGRESS ================= */
// function onMemeSwiped() {
//   if (!swipeEnabled) return;

//   const data = getStoredData();
//   if (!data) return;

//   data.index += 1;
//   setStoredData(data);
//   currentIndexs = data.index;

//   if (currentIndexs >= loadedMemes.length) {
//     renderQuotaCard();
//     disableSwipe();
//     return;
//   }

//   if (currentIndexs % RENDER_CHUNK_SIZE === 0) {
//     renderNextChunk();
//     setTimeout(enableSwipe, 50);
//   }
// }

// /* ================= SWIPE HANDLERS ================= */
// let animFrame;
// function startSwipe(e) {
//   startX = e.touches ? e.touches[0].clientX : e.clientX;
//   document.addEventListener("mousemove", moveSwipe);
//   document.addEventListener("mouseup", endSwipe);
// }

// function moveSwipe(e) {
//   const x = e.touches ? e.touches[0].clientX : e.clientX;
//   const deltaX = x - startX;
//   cancelAnimationFrame(animFrame);
//   animFrame = requestAnimationFrame(() => {
//     if (currentCard) currentCard.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.05}deg)`;
//   });
// }

// function endSwipe(e) {
//   const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
//   const deltaX = endX - startX;
//   const threshold = 120;

//   document.removeEventListener("mousemove", moveSwipe);
//   document.removeEventListener("mouseup", endSwipe);

//   if (deltaX > threshold) swipe("right");
//   else if (deltaX < -threshold) swipe("left");
//   else if (currentCard) currentCard.style.transform = "";
// }

// /* ================= STREAK CHECK ================= */
// function canIncreaseStreak() {
//   const lastTimestamp = localStorage.getItem("lastStreakTime");
//   if (!lastTimestamp) return true;
//   return Date.now() - Number(lastTimestamp) >= 24 * 60 * 60 * 1000;
// }

// /* ================= STREAK POPUP ================= */
// function showStreakPopup(streakDays) {
//   const popup = document.getElementById("streakPopup");
//   if (!popup) return;

//   popup.style.display = "flex";
//   const weeks = document.querySelectorAll(".week");
//   const completedWeeks = Math.floor(streakDays / 7);
//   const leftoverDays = streakDays % 7;

//   weeks.forEach((week, index) => {
//     const fill = week.querySelector(".fill");
//     fill.style.width = "0%";

//     if (index < completedWeeks) setTimeout(() => (fill.style.width = "100%"), index * 150);
//     else if (index === completedWeeks) setTimeout(() => (fill.style.width = (leftoverDays / 7) * 100 + "%"), index * 150);
//   });

//   document.getElementById("streakCount").innerText = `🔥 ${streakDays} Days`;
//   setTimeout(() => (popup.style.display = "none"), 2000);
// }

// /* ================= SWIPE ACTION ================= */
// function swipe(direction) {
//   const heart = document.querySelector(".swipe-reaction.heart");
//   const cross = document.querySelector(".swipe-reaction.cross");

//   incrementSwipe();
//   totalSwipesForAPI++;
//   localStorage.setItem(API_SWIPE_STORAGE_KEY, totalSwipesForAPI);

//   if (direction === "right") {
//     rightSwipesForScore++;
//     localStorage.setItem(RIGHT_SWIPE_SCORE_KEY, rightSwipesForScore);

//     rightSwipesForStreak++;
//     localStorage.setItem(RIGHT_STREAK_KEY, rightSwipesForStreak);

//     heart?.classList.add("show");
//     setTimeout(() => heart?.classList.remove("show"), 300);

//     if (rightSwipesForStreak >= STREAK_RIGHT_TARGET && canIncreaseStreak()) {
//       streakIncrement++;
//       localStorage.setItem("lastStreakTime", Date.now());
//       rightSwipesForStreak = 0;
//       localStorage.setItem(RIGHT_STREAK_KEY, rightSwipesForStreak);
//       showStreakPopup();
//     }
//   } else {
//     cross?.classList.add("show");
//     setTimeout(() => cross?.classList.remove("show"), 300);
//   }

//   if (totalSwipesForAPI >= API_SWIPE_TARGET) updateBackend();

//   if (currentCard) currentCard.classList.add(direction === "right" ? "swipe-right" : "swipe-left");

//   setTimeout(() => {
//     if (currentCard) currentCard.classList.remove("active");
//     onMemeSwiped();

//     currentIndex++;
//     const next = document.querySelectorAll(".meme-card")[currentIndex];
//     if (next) {
//       next.classList.add("active");
//       enableSwipe();
//     }
//   }, 300);
// }

// /* ================= BACKEND UPDATE ================= */
// async function updateBackend() {
//   const payload = {
//     username,
//     totalSwipes: totalSwipesForAPI,
//     swipes: rightSwipesForScore,
//     streak: rightSwipesForStreak,
//   };

//   try {
//     const response = await fetch(API.updateUser(), {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) throw new Error("Backend error");

//     streakIncrement = 0;
//     rightSwipesForScore = 0;
//     localStorage.setItem(RIGHT_SWIPE_SCORE_KEY, rightSwipesForScore);
//     totalSwipesForAPI = 0;
//     localStorage.setItem(API_SWIPE_STORAGE_KEY, totalSwipesForAPI);
//     localStorage.setItem(RIGHT_STREAK_KEY, rightSwipesForStreak);
//   } catch {
//     disableSwipe();
//     localStorage.setItem("GuestTotalSwipes", totalSwipesForAPI);
//     localStorage.setItem("GuestRightSwipes", rightSwipesForScore);
//     localStorage.setItem("GuestStreakIncrement", streakIncrement);
//     popupForGuest(totalSwipesForAPI, rightSwipesForScore, streakIncrement, username);
//   }
// }

// /* ================= INIT DAILY MEMES ================= */
// async function initDailyMemes() {
//   rightSwipesForStreak = Number(localStorage.getItem(RIGHT_STREAK_KEY)) || 0;
//   const memeBox = document.querySelector(".memeBox");
//   const today = getTodayKey();

//   let storedData = getStoredData();

//   if (!storedData || storedData.date !== today) {
//     createLoader(memeBox);

//     const memes = await fetchDailyMemes(username);

//     // Create first visible chunk immediately
//     loadedMemes = memes.map((m, idx) => {
//       const card = document.createElement("div");
//       card.className = "meme-card";
//       card.style.zIndex = memes.length - idx;
//       if (idx < RENDER_CHUNK_SIZE) card.classList.add(idx === 0 ? "active" : "");

//       const img = new Image();
//       img.src = m.url;
//       img.alt = m.title;
//       img.loading = "lazy";
//       card.appendChild(img);
//       loadedMemes.push({ ...m, img });
//       return { ...m, img };
//     });

//     memeBox.innerHTML = "";
//     renderNextChunk();
//     removeLoader(memeBox);
//     setTimeout(enableSwipe, 50);

//     // Preload remaining in parallel
//     const remaining = memes.slice(RENDER_CHUNK_SIZE);
//     Promise.all(preloadImages(remaining)).then(preloaded => {
//       preloaded.forEach((p, idx) => (loadedMemes[RENDER_CHUNK_SIZE + idx].img = p.img));
//     });

//   } else {
//     currentIndexs = storedData.index;
//     loadedMemes = storedData.memes.map(m => {
//       const img = new Image();
//       img.src = m.url;
//       img.alt = m.title;
//       img.loading = "lazy";
//       return { ...m, img };
//     });
//     renderInitial();
//   }
// }

// /* ================= KEYBOARD SWIPE ================= */
// document.addEventListener("keydown", (e) => {
//   if (keyLocked) return;
//   if (!currentCard) return;
//   if (e.key === "ArrowRight") { keyLocked = true; swipe("right"); }
//   if (e.key === "ArrowLeft") { keyLocked = true; swipe("left"); }
// });

// document.addEventListener("keyup", () => { keyLocked = false; });
// window.addEventListener("load", initDailyMemes);


// /* =====================================================
//    DAILY SWIPE - MERGED (MEME FETCH + SWIPE LOGIC)
//    FULLY OPTIMIZED WITHOUT REMOVING ANY FEATURE
// ===================================================== */

// /* ================= CONFIG ================= */
// const BACKEND_API = "https://backend2-kpkg.onrender.com/daily-memes";
// const STORAGE_KEYs = "dailyMemeData";
// const RENDER_CHUNK_SIZE = 20; // 🔥 faster first paint

// /* ================= STATE ================= */
// let loadedMemes = [];
// let currentIndexs = 0;
// let midnightTimer;
// let swipeEnabled = false;

// /* SWIPE STATE */
// let currentIndex = 0;
// let startX = 0;
// let currentCard = null;
// let keyLocked = false;

// const RIGHT_STREAK_KEY = "rightSwipesForStreak";
// let rightSwipesForStreak = Number(localStorage.getItem(RIGHT_STREAK_KEY)) || 0;

// const RIGHT_SWIPE_SCORE_KEY = "rightSwipesForScore";
// let rightSwipesForScore = Number(localStorage.getItem(RIGHT_SWIPE_SCORE_KEY)) || 0;

// const API_SWIPE_STORAGE_KEY = "totalSwipesForAPI";
// let totalSwipesForAPI = Number(localStorage.getItem(API_SWIPE_STORAGE_KEY)) || 0;

// let streakIncrement = 0;

// const STREAK_RIGHT_TARGET = 50;
// const API_SWIPE_TARGET = 50;

// /* USER */
// const username = localStorage.getItem("username");

// /* ================= SWIPE COUNT UI ================= */
// const swipeBox = document.getElementById("swipe");
// const STORAGE_KEY = "swipeCount";
// let swipeCount = Number(localStorage.getItem(STORAGE_KEY)) || 0;
// updateSwipeUI();

// function incrementSwipe() {
//   swipeCount++;
//   if (swipeCount > 300) swipeCount = 0;
//   localStorage.setItem(STORAGE_KEY, swipeCount);
//   updateSwipeUI();
// }

// function updateSwipeUI() {
//   if (swipeBox) swipeBox.textContent = `Swipes:${swipeCount}`;
// }

// /* ================= DATE ================= */
// function getTodayKey() {
//   return new Date().toISOString().split("T")[0];
// }

// /* ================= STORAGE ================= */
// function getStoredData() {
//   return JSON.parse(localStorage.getItem(STORAGE_KEYs) || "null");
// }

// function setStoredData(data) {
//   localStorage.setItem(STORAGE_KEYs, JSON.stringify(data));
// }

// /* ================= FETCH MEMES ================= */
// async function fetchDailyMemes() {
//   try {
//     const res = await fetch(`${BACKEND_API}?username=${username}`);
//     if (!res.ok) return [];
//     const urls = await res.json();
//     return urls.map(url => ({ url, title: "meme" }));
//   } catch {
//     window.location.href = "/pages/error.html";
//     return [];
//   }
// }

// /* ================= LOADER ================= */
// function createLoader(container) {
//   if (container.querySelector(".meme-loader")) return;
//   const loader = document.createElement("div");
//   loader.className = "meme-loader";
//   loader.innerHTML = `<div class="spinner"></div><p>Loading memes...</p>`;
//   container.appendChild(loader);
// }

// function removeLoader(container) {
//   const loader = container.querySelector(".meme-loader");
//   if (loader) loader.remove();
// }

// /* ================= MIDNIGHT COUNTDOWN ================= */
// function startMidnightCountdown() {
//   const counterEl = document.getElementById("midnightCounter");
//   if (!counterEl) return;

//   if (midnightTimer) clearInterval(midnightTimer);

//   function updateCounter() {
//     const now = new Date();
//     const midnight = new Date();
//     midnight.setHours(24, 0, 0, 0);

//     const diff = midnight - now;

//     if (diff <= 0) {
//       counterEl.textContent = "New memes available!";
//       clearInterval(midnightTimer);
//       initDailyMemes();
//       return;
//     }

//     const hrs = Math.floor(diff / 3600000);
//     const mins = Math.floor((diff % 3600000) / 60000);
//     const secs = Math.floor((diff % 60000) / 1000);

//     counterEl.textContent = `Next memes in: ${hrs}h ${mins}m ${secs}s`;
//   }

//   updateCounter();
//   midnightTimer = setInterval(updateCounter, 1000);
// }

// /* ================= RENDER QUOTA CARD ================= */
// function renderQuotaCard() {
//   const memeBox = document.querySelector(".memeBox");
//   memeBox.innerHTML = "";

//   const card = document.createElement("div");
//   card.className = "meme-card quota-card active";
//   card.innerHTML = `
//     <h2>🎉 Daily Quota Completed</h2>
//     <p>Come back tomorrow for fresh memes</p>
//     <p id="midnightCounter" style="font-weight:bold;"></p>
//     <div style="margin-top:20px;">
//       <a href="https://www.buymeacoffee.com/vibhavkhichi" target="_blank">
//         <img 
//           src="https://img.buymeacoffee.com/button-api/?text=Coffee?&emoji=😁&slug=vibhavkhichi&button_colour=000000&font_colour=ffffff&font_family=Poppins&outline_colour=ffffff&coffee_colour=FFDD00"
//           alt="Buy Me a Coffee"
//           style="height:50px; border-radius:8px;"
//         />
//       </a>
//     </div>
//   `;

//   memeBox.appendChild(card);
//   startMidnightCountdown();
//   disableSwipe();
// }

// /* ================= RENDER CHUNK ================= */
// function renderNextChunk() {
//   const memeBox = document.querySelector(".memeBox");

//   if (currentIndexs >= loadedMemes.length) {
//     renderQuotaCard();
//     return;
//   }

//   const start = currentIndexs;
//   const end = Math.min(start + RENDER_CHUNK_SIZE, loadedMemes.length);
//   const fragment = document.createDocumentFragment();

//   for (let i = start; i < end; i++) {
//     const meme = loadedMemes[i];

//     const card = document.createElement("div");
//     card.className = "meme-card";
//     card.style.zIndex = loadedMemes.length - i;

//     if (i === start) card.classList.add("active");

//     if (!meme.img) {
//       const img = new Image();
//       img.src = meme.url;
//       img.alt = meme.title;
//       img.loading = "eager";
//       meme.img = img;
//     }

//     card.appendChild(meme.img);
//     fragment.appendChild(card);
//   }

//   memeBox.appendChild(fragment);

//   setTimeout(() => {
//     for (let i = end; i < loadedMemes.length; i++) {
//       const meme = loadedMemes[i];
//       if (!meme.img) {
//         const img = new Image();
//         img.src = meme.url;
//         img.loading = "lazy";
//         meme.img = img;
//       }
//     }
//   }, 100);
// }

// function renderInitial() {
//   const memeBox = document.querySelector(".memeBox");
//   memeBox.innerHTML = "";

//   if (currentIndexs >= loadedMemes.length) {
//     renderQuotaCard();
//     return;
//   }

//   renderNextChunk();
//   enableSwipe();
// }

// /* ================= SWIPE PROGRESS ================= */
// function onMemeSwiped() {
//   if (!swipeEnabled) return;

//   currentIndexs++;
//   currentIndex = currentIndexs;

//   const data = getStoredData();
//   if (data) {
//     data.index = currentIndexs;
//     setStoredData(data);
//   }

//   if (currentIndexs >= loadedMemes.length) {
//     renderQuotaCard();
//     disableSwipe();
//     return;
//   }

//   if (currentIndexs % RENDER_CHUNK_SIZE === 0) {
//     renderNextChunk();
//   }
// }


// /* =====================================================
//    DAILY SWIPE - FULLY FIXED + COMPLETE
//    All Features Preserved + Fast Rendering
// ===================================================== */

// /* ================= CONFIG ================= */
// const BACKEND_API = "https://backend2-kpkg.onrender.com/daily-memes";
// const UPDATE_API = "https://backend2-kpkg.onrender.com/update-user";
// const STORAGE_KEYs = "dailyMemeData";
// const RENDER_CHUNK_SIZE = 20;

// /* ================= STATE ================= */
// let loadedMemes = [];
// let currentIndexs = 0;
// let currentIndex = 0;
// let midnightTimer;
// let swipeEnabled = false;
// let currentCard = null;
// let startX = 0;
// let keyLocked = false;

// /* ================= USER ================= */
// const username = localStorage.getItem("username");

// /* ================= STREAK + SCORE ================= */
// const RIGHT_STREAK_KEY = "rightSwipesForStreak";
// const RIGHT_SWIPE_SCORE_KEY = "rightSwipesForScore";
// const API_SWIPE_STORAGE_KEY = "totalSwipesForAPI";

// let rightSwipesForStreak = Number(localStorage.getItem(RIGHT_STREAK_KEY)) || 0;
// let rightSwipesForScore = Number(localStorage.getItem(RIGHT_SWIPE_SCORE_KEY)) || 0;
// let totalSwipesForAPI = Number(localStorage.getItem(API_SWIPE_STORAGE_KEY)) || 0;

// let streakIncrement = 0;
// const STREAK_RIGHT_TARGET = 50;
// const API_SWIPE_TARGET = 50;

// /* ================= SWIPE UI COUNTER ================= */
// const swipeBox = document.getElementById("swipe");
// const STORAGE_KEY = "swipeCount";
// let swipeCount = Number(localStorage.getItem(STORAGE_KEY)) || 0;
// updateSwipeUI();

// function incrementSwipe() {
//   swipeCount++;
//   if (swipeCount > 300) swipeCount = 0;
//   localStorage.setItem(STORAGE_KEY, swipeCount);
//   updateSwipeUI();
// }

// function updateSwipeUI() {
//   if (swipeBox) swipeBox.textContent = `Swipes:${swipeCount}`;
// }

// /* ================= DATE ================= */
// function getTodayKey() {
//   return new Date().toISOString().split("T")[0];
// }

// /* ================= STORAGE ================= */
// function getStoredData() {
//   return JSON.parse(localStorage.getItem(STORAGE_KEYs) || "null");
// }

// function setStoredData(data) {
//   localStorage.setItem(STORAGE_KEYs, JSON.stringify(data));
// }

// /* ================= FETCH MEMES ================= */
// async function fetchDailyMemes() {
//   try {
//     const res = await fetch(`${BACKEND_API}?username=${username}`);
//     if (!res.ok) return [];
//     const urls = await res.json();
//     return urls.map(url => ({ url, title: "meme", img: null }));
//   } catch {
//     window.location.href = "/pages/error.html";
//     return [];
//   }
// }

// /* ================= LOADER ================= */
// function createLoader(container) {
//   if (container.querySelector(".meme-loader")) return;
//   const loader = document.createElement("div");
//   loader.className = "meme-loader";
//   loader.innerHTML = `<div class="spinner"></div><p>Loading memes...</p>`;
//   container.appendChild(loader);
// }

// function removeLoader(container) {
//   const loader = container.querySelector(".meme-loader");
//   if (loader) loader.remove();
// }

// /* ================= QUOTA CARD ================= */
// function renderQuotaCard() {
//   const memeBox = document.querySelector(".memeBox");
//   memeBox.innerHTML = "";

//   const card = document.createElement("div");
//   card.className = "meme-card quota-card active";
//   card.innerHTML = `
//     <h2>🎉 Daily Quota Completed</h2>
//     <p>Come back tomorrow for fresh memes</p>
//     <p id="midnightCounter" style="font-weight:bold;"></p>
//     <div style="margin-top:20px;">
//       <a href="https://www.buymeacoffee.com/vibhavkhichi" target="_blank">
//         <img 
//           src="https://img.buymeacoffee.com/button-api/?text=Coffee?&emoji=😁&slug=vibhavkhichi&button_colour=000000&font_colour=ffffff&font_family=Poppins&outline_colour=ffffff&coffee_colour=FFDD00"
//           style="height:50px; border-radius:8px;"
//         />
//       </a>
//     </div>
//   `;

//   memeBox.appendChild(card);
//   disableSwipe();
// }

// /* ================= RENDER CHUNK ================= */
// function renderNextChunk() {
//   const memeBox = document.querySelector(".memeBox");

//   if (currentIndexs >= loadedMemes.length) {
//     renderQuotaCard();
//     return;
//   }

//   const start = currentIndexs;
//   const end = Math.min(start + RENDER_CHUNK_SIZE, loadedMemes.length);
//   const fragment = document.createDocumentFragment();

//   for (let i = start; i < end; i++) {
//     const meme = loadedMemes[i];

//     const card = document.createElement("div");
//     card.className = "meme-card";
//     card.style.zIndex = loadedMemes.length - i;
//     if (i === start) card.classList.add("active");

//     if (!meme.img) {
//       const img = new Image();
//       img.src = meme.url;
//       img.loading = "eager";
//       meme.img = img;
//     }

//     card.appendChild(meme.img);
//     fragment.appendChild(card);
//   }

//   memeBox.appendChild(fragment);
// }

// /* ================= ENABLE / DISABLE SWIPE ================= */
// function enableSwipe() {
//   swipeEnabled = true;
//   currentCard = document.querySelector(".meme-card.active");
// }

// function disableSwipe() {
//   swipeEnabled = false;
//   keyLocked = true;
// }

// /* ================= SWIPE ENGINE ================= */
// function swipe(direction) {
//   if (!swipeEnabled) return;

//   incrementSwipe();
//   totalSwipesForAPI++;
//   localStorage.setItem(API_SWIPE_STORAGE_KEY, totalSwipesForAPI);

//   if (direction === "right") {
//     rightSwipesForScore++;
//     rightSwipesForStreak++;
//     localStorage.setItem(RIGHT_SWIPE_SCORE_KEY, rightSwipesForScore);
//     localStorage.setItem(RIGHT_STREAK_KEY, rightSwipesForStreak);
//   }

//   if (totalSwipesForAPI >= API_SWIPE_TARGET) {
//     updateBackend();
//   }

//   if (currentCard) {
//     currentCard.classList.add(direction === "right" ? "swipe-right" : "swipe-left");
//   }

//   setTimeout(() => {
//     if (currentCard) currentCard.classList.remove("active");

//     onMemeSwiped();

//     currentIndex++;
//     const next = document.querySelectorAll(".meme-card")[currentIndex];
//     if (next) {
//       next.classList.add("active");
//       currentCard = next;
//       enableSwipe();
//     }
//   }, 300);
// }

// /* ================= SWIPE PROGRESS ================= */
// function onMemeSwiped() {
//   currentIndexs++;
//   currentIndex = currentIndexs;

//   const data = getStoredData();
//   if (data) {
//     data.index = currentIndexs;
//     setStoredData(data);
//   }

//   if (currentIndexs >= loadedMemes.length) {
//     renderQuotaCard();
//     return;
//   }

//   if (currentIndexs % RENDER_CHUNK_SIZE === 0) {
//     renderNextChunk();
//   }
// }

// /* ================= BACKEND UPDATE ================= */
// async function updateBackend() {
//   if (!username) return;

//   const payload = {
//     username,
//     totalSwipes: totalSwipesForAPI,
//     swipes: rightSwipesForScore,
//     streak: rightSwipesForStreak,
//   };

//   try {
//     await fetch(API.updateUser, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     totalSwipesForAPI = 0;
//     rightSwipesForScore = 0;
//     localStorage.setItem(API_SWIPE_STORAGE_KEY, 0);
//     localStorage.setItem(RIGHT_SWIPE_SCORE_KEY, 0);
//   } catch (err) {
//     console.error("Backend update failed", err);
//   }
// }

// /* ================= INIT ================= */
// async function initDailyMemes() {
//   const memeBox = document.querySelector(".memeBox");
//   const today = getTodayKey();
//   let storedData = getStoredData();

//   if (storedData && storedData.date === today) {
//     currentIndexs = storedData.index || 0;
//     loadedMemes = storedData.memes;
//     renderNextChunk();
//     enableSwipe();
//     return;
//   }

//   createLoader(memeBox);

//   const memes = await fetchDailyMemes();
//   loadedMemes = memes;

//   setStoredData({
//     date: today,
//     memes: memes,
//     index: 0,
//   });

//   memeBox.innerHTML = "";
//   removeLoader(memeBox);

//   renderNextChunk();
//   enableSwipe();
// }

// /* ================= KEYBOARD SWIPE ================= */
// document.addEventListener("keydown", (e) => {
//   if (keyLocked) return;
//   if (e.key === "ArrowRight") { keyLocked = true; swipe("right"); }
//   if (e.key === "ArrowLeft") { keyLocked = true; swipe("left"); }
// });
// document.addEventListener("keyup", () => keyLocked = false);

// /* ================= START ================= */
// window.addEventListener("load", initDailyMemes);










// //new version 
// // * =====================================================
// //    DAILY SWIPE - FULLY FIXED + COMPLETE
// //    All Features Preserved + Fast Rendering
// // ===================================================== */

// /* ================= CONFIG ================= */
// const BACKEND_API = "https://backend2-kpkg.onrender.com/daily-memes";
// const UPDATE_API = "https://backend2-kpkg.onrender.com/update-user";
// const STORAGE_KEYs = "dailyMemeData";
// const RENDER_CHUNK_SIZE = 20;

// /* ================= STATE ================= */
// let loadedMemes = [];
// let currentIndexs = 0;
// let currentIndex = 0;
// let midnightTimer;
// let swipeEnabled = false;
// let currentCard = null;
// let startX = 0;
// let keyLocked = false;

// /* ================= USER ================= */
// const username = localStorage.getItem("username");

// /* ================= STREAK + SCORE ================= */
// const RIGHT_STREAK_KEY = "rightSwipesForStreak";
// const RIGHT_SWIPE_SCORE_KEY = "rightSwipesForScore";
// const API_SWIPE_STORAGE_KEY = "totalSwipesForAPI";

// let rightSwipesForStreak = Number(localStorage.getItem(RIGHT_STREAK_KEY)) || 0;
// let rightSwipesForScore = Number(localStorage.getItem(RIGHT_SWIPE_SCORE_KEY)) || 0;
// let totalSwipesForAPI = Number(localStorage.getItem(API_SWIPE_STORAGE_KEY)) || 0;

// let streakIncrement = 0;
// const STREAK_RIGHT_TARGET = 50;
// const API_SWIPE_TARGET = 50;

// /* ================= SWIPE UI COUNTER ================= */
// const swipeBox = document.getElementById("swipe");
// const STORAGE_KEY = "swipeCount";
// let swipeCount = Number(localStorage.getItem(STORAGE_KEY)) || 0;
// updateSwipeUI();

// function incrementSwipe() {
//   swipeCount++;
//   if (swipeCount > 300) swipeCount = 0;
//   localStorage.setItem(STORAGE_KEY, swipeCount);
//   updateSwipeUI();
// }

// function updateSwipeUI() {
//   if (swipeBox) swipeBox.textContent = `Swipes:${swipeCount}`;
// }

// /* ================= DATE ================= */
// function getTodayKey() {
//   return new Date().toISOString().split("T")[0];
// }

// /* ================= STORAGE ================= */
// function getStoredData() {
//   return JSON.parse(localStorage.getItem(STORAGE_KEYs) || "null");
// }

// function setStoredData(data) {
//   localStorage.setItem(STORAGE_KEYs, JSON.stringify(data));
// }

// /* ================= FETCH MEMES ================= */
// async function fetchDailyMemes() {
//   try {
//     const res = await fetch(`${BACKEND_API}?username=${username}`);
//     if (!res.ok) return [];
//     const urls = await res.json();
//     return urls.map(url => ({ url, title: "meme", img: null }));
//   } catch {
//     window.location.href = "/pages/error.html";
//     return [];
//   }
// }

// /* ================= LOADER ================= */
// function createLoader(container) {
//   if (container.querySelector(".meme-loader")) return;
//   const loader = document.createElement("div");
//   loader.className = "meme-loader";
//   loader.innerHTML = `<div class="spinner"></div><p>Loading memes...</p>`;
//   container.appendChild(loader);
// }

// function removeLoader(container) {
//   const loader = container.querySelector(".meme-loader");
//   if (loader) loader.remove();
// }

// /* ================= QUOTA CARD ================= */
// function renderQuotaCard() {
//   const memeBox = document.querySelector(".memeBox");
//   memeBox.innerHTML = "";

//   const card = document.createElement("div");
//   card.className = "meme-card quota-card active";
//   card.innerHTML = `
//     <h2>🎉 Daily Quota Completed</h2>
//     <p>Come back tomorrow for fresh memes</p>
//     <p id="midnightCounter" style="font-weight:bold;"></p>
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

// /* ================= RENDER CHUNK ================= */
// function renderNextChunk() {
//   const memeBox = document.querySelector(".memeBox");

//   if (currentIndexs >= loadedMemes.length) {
//     renderQuotaCard();
//     return;
//   }

//   const start = currentIndexs;
//   const end = Math.min(start + RENDER_CHUNK_SIZE, loadedMemes.length);
//   const fragment = document.createDocumentFragment();

//   for (let i = start; i < end; i++) {
//     const meme = loadedMemes[i];

//     const card = document.createElement("div");
//     card.className = "meme-card";
//     card.style.zIndex = loadedMemes.length - i;

//     // ✅ ALWAYS CREATE NEW IMG ELEMENT
//     const img = document.createElement("img");
//     img.src = meme.url;
//     img.loading = "eager";
//     img.decoding = "async";
//     img.draggable = false;

//     card.appendChild(img);
//     fragment.appendChild(card);
//   }

//   memeBox.appendChild(fragment);

//   // Activate first visible card only if none active
//   if (!document.querySelector(".meme-card.active")) {
//     const firstCard = document.querySelector(".meme-card");
//     if (firstCard) {
//       firstCard.classList.add("active");
//       currentCard = firstCard;
//     }
//   }
// }
// /* ================= ENABLE / DISABLE SWIPE ================= */
// function enableSwipe() {
//   swipeEnabled = true;
//   currentCard = document.querySelector(".meme-card.active");
// }

// function disableSwipe() {
//   swipeEnabled = false;
//   keyLocked = true;
// }

// /* ================= SWIPE ENGINE ================= */
// function swipe(direction) {
//   if (!swipeEnabled) return;

//   incrementSwipe();
//   totalSwipesForAPI++;
//   localStorage.setItem(API_SWIPE_STORAGE_KEY, totalSwipesForAPI);

//   if (direction === "right") {
//     rightSwipesForScore++;
//     rightSwipesForStreak++;
//     localStorage.setItem(RIGHT_SWIPE_SCORE_KEY, rightSwipesForScore);
//     localStorage.setItem(RIGHT_STREAK_KEY, rightSwipesForStreak);
//   }

//   if (totalSwipesForAPI >= API_SWIPE_TARGET) {
//     updateBackend();
//   }

//   if (currentCard) {
//     currentCard.classList.add(direction === "right" ? "swipe-right" : "swipe-left");
//   }

//   setTimeout(() => {
//     if (currentCard) currentCard.classList.remove("active");

//     onMemeSwiped();


// const allCards = document.querySelectorAll(".meme-card");
// const next = allCards[currentIndexs];
//     if (next) {
//       next.classList.add("active");
//       currentCard = next;
//       enableSwipe();
//     }
//   }, 300);
// }

// /* ================= SWIPE PROGRESS ================= */
// function onMemeSwiped() {
//   currentIndexs++;
//   currentIndex = currentIndexs;

//   const data = getStoredData();
//   if (data) {
//     data.index = currentIndexs;
//     setStoredData(data);
//   }

//   if (currentIndexs >= loadedMemes.length) {
//     renderQuotaCard();
//     return;
//   }

//   if (currentIndexs % RENDER_CHUNK_SIZE === 0) {
//     renderNextChunk();
//   }
//  // Clean only cards that are not active and already swiped
// const cards = document.querySelectorAll(".meme-card");

// cards.forEach(card => {
//   if (
//     !card.classList.contains("active") &&
//     !card.classList.contains("quota-card") &&
//     (
//       card.classList.contains("swipe-left") ||
//       card.classList.contains("swipe-right")
//     )
//   ) {
//     card.remove();
//   }
// });
// }

// /* ================= BACKEND UPDATE ================= */
// async function updateBackend() {
//   if (!username) return;

//   const payload = {
//     username,
//     totalSwipes: totalSwipesForAPI,
//     swipes: rightSwipesForScore,
//     streak: rightSwipesForStreak,
//   };

//   try {
//     await fetch(API.updateUser(), {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     totalSwipesForAPI = 0;
//     rightSwipesForScore = 0;
//     localStorage.setItem(API_SWIPE_STORAGE_KEY, 0);
//     localStorage.setItem(RIGHT_SWIPE_SCORE_KEY, 0);
//   } catch (err) {
//     console.error("Backend update failed", err);
//   }
// }

// /* ================= INIT ================= */
// async function initDailyMemes() {
//   const memeBox = document.querySelector(".memeBox");
//   const today = getTodayKey();
//   let storedData = getStoredData();

//   if (storedData && storedData.date === today) {
//     currentIndexs = storedData.index || 0;
//     loadedMemes = storedData.memes;
//     renderNextChunk();
//     enableSwipe();
//     return;
//   }

//   createLoader(memeBox);

//   const memes = await fetchDailyMemes();
//   loadedMemes = memes;

//   setStoredData({
//     date: today,
//     memes: memes,
//     index: 0,
//   });

//   memeBox.innerHTML = "";
//   removeLoader(memeBox);

//   renderNextChunk();
//   enableSwipe();
// }

// /* ================= KEYBOARD SWIPE ================= */
// document.addEventListener("keydown", (e) => {
//   if (keyLocked) return;
//   if (e.key === "ArrowRight") { keyLocked = true; swipe("right"); }
//   if (e.key === "ArrowLeft") { keyLocked = true; swipe("left"); }
// });
// document.addEventListener("keyup", () => keyLocked = false);

// /* ================= START ================= */
// window.addEventListener("load", initDailyMemes);



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

/* ================= GUEST MEME FETCH ================= */
async function fetchGuestMemes() {
  try {
    const response = await fetch("https://backend2-kpkg.onrender.com/guest-memes");

    if (!response.ok) {
      throw new Error("Failed to load guest meme.json");
    }

    const json = await response.json();

    // 🔥 Convert { meme: ["url"] } → [{id, url}]
    const formattedMemes = json.meme.map((url, index) => ({
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

img.style.width = "100%";
img.style.height = "100%";
img.style.objectFit = "cover";

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
// async function initDailyMemes() {
//   const memeBox = document.querySelector(".memeBox");
//   const today = getTodayKey();
//   let storedData = getStoredData();
   
// const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";


//   if (storedData && storedData.date === today) {
//     currentIndexs = storedData.index || 0;
//     loadedMemes = storedData.memes;
//     renderNextChunk();
//     enableSwipe();
//     return;
//   }

//   createLoader(memeBox);
//  let memes = [];
//   // const memes = await fetchDailyMemes();
//   // loadedMemes = memes;
         
//      if (isLoggedIn) {
//       console.log("for user");
      
//     memes = await fetchDailyMemes();
//   } else {
//     console.log("for guest");
//     memes = await fetchGuestMemes();   // ✅ only change
//   }

//   // loadedMemes = memes;


//   // setStoredData({
//   //   date: today,
//   //   memes: memes,
//   //   index: 0,
//   // });
//   // 🔥 PRELOAD FIRST MEMES BEFORE RENDER
// await preloadInitialMemes(memes, 5);

// loadedMemes = memes;

// setStoredData({
//   date: today,
//   memes: memes,
//   index: 0,
// });

//   memeBox.innerHTML = "";
//   removeLoader(memeBox);

//   renderNextChunk();
//   enableSwipe();
//   // startBackgroundPreload();
//   setTimeout(startBackgroundPreload, 800);
// }


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

async function initDailyMemes() {

  const memeBox = document.querySelector(".memeBox");
  const today = getTodayKey();
  let storedData = getStoredData();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  let memes = [];

  /* ===== SAME DAY ===== */
  if (storedData && storedData.date === today) {

    currentIndexs = storedData.index || 0;
    loadedMemes = storedData.memes || [];

    renderNextChunk();
    enableSwipe();
    return;
  }

  /* ===== NEW DAY ===== */

  createLoader(memeBox);

  if (isLoggedIn) {
    memes = await fetchDailyMemes();
  } else {
    memes = await fetchGuestMemes();
  }

  if (storedData && storedData.memes) {

    // remaining memes from yesterday
    const remainingMemes = storedData.memes.slice(storedData.index || 0);

    console.log("Remaining memes from yesterday:", remainingMemes.length);

    // merge remaining + new
    loadedMemes = [...remainingMemes, ...memes];

    // reset swipe index
    currentIndexs = 0;

  } else {

    loadedMemes = memes;
    currentIndexs = 0;

  }

  await preloadInitialMemes(loadedMemes, 5);

  setStoredData({
    date: today,
    memes: loadedMemes,
    index: currentIndexs
  });

  memeBox.innerHTML = "";
  removeLoader(memeBox);

  renderNextChunk();
  enableSwipe();

  setTimeout(startBackgroundPreload, 800);
}





/* ================= START ================= */
window.addEventListener("load", initDailyMemes);