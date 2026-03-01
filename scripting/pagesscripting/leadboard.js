
// let allUsers = []; // store API data globally
// let Friend = []; // store API data globally
// const sessionUser = localStorage.getItem("username");
// document.addEventListener("DOMContentLoaded", () => {
//     Globalleadboard();
// });
// function Globalleadboard() {
//     document.getElementById("btn-global").style.backgroundColor="#000000";
//     document.getElementById("btn-global").style.color="#ffffff";
//     document.getElementById("btn-global").style.border=" 1.5px solid #000cea";
//      document.getElementById("btn-local").style.backgroundColor="#f1f1f1";
//     document.getElementById("btn-local").style.color="#000000";
//     document.getElementById("btn-local").style.border=" 1.5px solid #000cea";
//      document.getElementById("streak").style.visibility="visible";
//     document.getElementById("swipes").style.visibility="visible";
//     loadRanking();

//     // Attach filter button listeners
//     document.querySelectorAll(".secondary .sbutton").forEach(btn => {
//         btn.addEventListener("click", () => {
//             filterLeaderboard(btn.value);
//         });
//     });

//     // Search input listener
//     const searchInput = document.querySelector(".searching input");
//     searchInput.addEventListener("input", () => {
//         searchLeaderboard(searchInput.value.trim());
//     });
// };

// // ================= LOAD API ONCE =================
// function loadRanking() {
//     fetch(API.getAllUsers(), {
//         method: "GET",
//         headers: { "Content-Type": "application/json" }
//     })
//     .then(res => res.ok ? res.json() : Promise.reject(res.status))
//     .then(users => {
//         allUsers = users;
        
//         filterLeaderboard("score"); // default sort by score
//     })
//     .catch(err => {window.location.href="/pages/error.html"; console.error("Ranking error:", err)});
// }

// // ================= FILTER FUNCTIONS =================
// function filterLeaderboard(type) {
//     if (!allUsers.length) return;

//     // Highlight the clicked filter button and reset others
//     document.querySelectorAll(".secondary .sbutton").forEach(btn => {
//         if (btn.value === type) {
//             btn.classList.add("actives"); // active color
//         } else {
//             btn.classList.remove("actives"); // reset to normal
//         }
//     });

//     buildRankUI(allUsers, type);
// }


// // Search function
// function searchLeaderboard(query) {
//     if (!allUsers.length) return;

//     if (!query) {
//         // no query, reset to last selected filter
//         const activeBtn = document.querySelector(".secondary .sbutton.active");
//         filterLeaderboard(activeBtn?.value || "score");
//         return;
//     }

//     const filtered = allUsers.filter(u => 
//         u.username.toLowerCase().includes(query.toLowerCase()) ||
//         u.rank?.toString() === query
//     );

//     buildRankUI(filtered, "score", true); // show search results
// }

// // ================= BUILD UI =================
// function buildRankUI(users, type = "score", isSearch = false) {
//     const rankBox = document.querySelector(".RankBox");
//     rankBox.innerHTML = "";

//     // Highlight active button
//     document.querySelectorAll(".secondary .sbutton").forEach(btn => {
//         btn.classList.toggle("active", btn.value === type);
//     });

//     // Sort users based on type
//     users.sort((a, b) => {
//         if (type === "score") return b.score - a.score;
//         if (type === "streak") return (b.streak || 0) - (a.streak || 0);
//         if (type === "swipe") return (b.swipes || 0) - (a.swipes || 0);
//         return 0;
//     });

//     // Update column header dynamically
//     const col3Header = document.querySelector(".colName .col:nth-child(3)");
//     col3Header.textContent = type.charAt(0).toUpperCase() + type.slice(1);

//     let prevRank = Number(localStorage.getItem("prevRank"));
//     const storedUI = JSON.parse(localStorage.getItem(`rankUI_${sessionUser}`) || "{}");

//     users.forEach((user, index) => {
//         const currentRank = index + 1;
//         let cardClass = "card";
//         let badgeHTML = "";

//         // Restore persisted UI for session user
//         if (user.username === sessionUser && storedUI.cardClass) {
//             cardClass = storedUI.cardClass;
//             badgeHTML = storedUI.badgeHTML || "";
//         }

//         // Only session user: live comparison
//         if (user.username === sessionUser && !isSearch) {
//             if (Number.isFinite(prevRank)) {
//                 if (currentRank < prevRank) {
//                     cardClass = "gain";
//                     badgeHTML = `<span class="badge gain-badge">↑ ${prevRank - currentRank}</span>`;
//                 } else if (currentRank > prevRank) {
//                     cardClass = "loss";
//                     badgeHTML = `<span class="badge loss-badge">↓ ${currentRank - prevRank}</span>`;
//                 }
//             }
//             localStorage.setItem("prevRank", currentRank);
//             localStorage.setItem(`rankUI_${sessionUser}`, JSON.stringify({ cardClass, badgeHTML }));
//         }

//         // Choose what to display in third column
//         let thirdCol = user.score;
//         if (type === "streak") thirdCol = user.streak || 0;
//         if (type === "swipe") thirdCol = user.swipes || 0;

//         // Render card
//         rankBox.innerHTML += `
//             <div class="${cardClass}">
//                 ${badgeHTML}
//                 <span class="col1">${currentRank}</span>
//                 <span class="col2">${user.username}</span>
//                 <span class="col1">${thirdCol}</span>
//             </div>
//         `;
//     });
// }



// function Localleadboard() {
//       document.getElementById("btn-local").style.backgroundColor="#000000";
//     document.getElementById("btn-local").style.color="#ffffff";
//     document.getElementById("btn-local").style.border=" 1.5px solid #000cea";
//      document.getElementById("btn-global").style.backgroundColor="#f1f1f1";
//     document.getElementById("btn-global").style.color="#000000";
//     document.getElementById("btn-global").style.border=" 1.5px solid #000cea";
//     document.getElementById("streak").style.visibility="hidden";
//     document.getElementById("swipes").style.visibility="hidden";
//  loadLocalRanking();

//     // Attach filter button listeners
//     document.querySelectorAll(".secondary .sbutton").forEach(btn => {
//         btn.addEventListener("click", () => {
//             filterLeaderboard(btn.value);
//         });
//     });

//     // Search input listener
//     const searchInput = document.querySelector(".searching input");
//     searchInput.addEventListener("input", () => {
//         searchLeaderboard(searchInput.value.trim());
//     });
// };

// function loadLocalRanking() {
//     const user = localStorage.getItem("username");
//     fetch(API.getFriendsList(user), {
//         method: "GET",
//         headers: { "Content-Type": "application/json" }
//     })
//     .then(res => res.ok ? res.json() : Promise.reject(res.status))
//     .then(users => {
//         localStorage.setItem("pfps",users.pfp)
//         Friend = users;
//         filterLeaderboardlocal("score"); // default sort by score
//     })
//     .catch(err =>{window.location.href="/pages/error.html";  console.error("Ranking error:", err)});
// }

// function filterLeaderboardlocal(type) {
//     if (!Friend.length) return;

//     // Highlight the clicked filter button and reset others
//     document.querySelectorAll(".secondary .sbutton").forEach(btn => {
//         btn.classList.toggle("actives", btn.value === type);
//     });

//     buildRankUILocal(Friend, type);
// }

// function buildRankUILocal(users, type = "score", isSearch = false) {
//     const rankBox = document.querySelector(".RankBox");
//     rankBox.innerHTML = "";

//     // 1️⃣ Map friends to full user objects
//     const friendUsers = users.map(f => {
//         const friendUsername = (f.friend1 === sessionUser ? f.friend2 : f.friend1);
//         return allUsers.find(u => u.username === friendUsername);
//     }).filter(u => u !== undefined); // remove any missing friends

//     // 2️⃣ Include session user at the beginning
//     const sessionUserData = allUsers.find(u => u.username === sessionUser);
//     const localUsers = sessionUserData ? [sessionUserData, ...friendUsers] : friendUsers;

//     // Highlight active filter button
//     document.querySelectorAll(".secondary .sbutton").forEach(btn => {
//         btn.classList.toggle("active", btn.value === type);
//     });

//     // 3️⃣ Sort local users
//     localUsers.sort((a, b) => {
//         if (type === "score") return (b.score || 0) - (a.score || 0);
//         if (type === "streak") return (b.streak || 0) - (a.streak || 0);
//         if (type === "swipe") return (b.swipes || 0) - (a.swipes || 0);
//         return 0;
//     });

//     // 4️⃣ Update column header
//     const col3Header = document.querySelector(".colName .col:nth-child(3)");
//     col3Header.textContent = type.charAt(0).toUpperCase() + type.slice(1);

//     // 5️⃣ Rank change highlight logic
//     let prevRank = Number(localStorage.getItem("prevRank"));
//     const storedUI = JSON.parse(localStorage.getItem(`rankUI_${sessionUser}`) || "{}");

//     localUsers.forEach((user, index) => {
//         const currentRank = index + 1;
//         let cardClass = "card";
//         let badgeHTML = "";

//         // Restore persisted UI for session user
//         if (user.username === sessionUser && storedUI.cardClass) {
//             cardClass = storedUI.cardClass;
//             badgeHTML = storedUI.badgeHTML || "";
//         }

//         // Highlight session user based on rank change
//         if (user.username === sessionUser && !isSearch) {
//             if (Number.isFinite(prevRank)) {
//                 if (currentRank < prevRank) {
//                     cardClass = "gain"; // green
//                     badgeHTML = `<span class="badge gain-badge">↑ ${prevRank - currentRank}</span>`;
//                 } else if (currentRank > prevRank) {
//                     cardClass = "loss"; // red
//                     badgeHTML = `<span class="badge loss-badge">↓ ${currentRank - prevRank}</span>`;
//                 }
//             }
//             localStorage.setItem("prevRank", currentRank);
//             localStorage.setItem(`rankUI_${sessionUser}`, JSON.stringify({ cardClass, badgeHTML }));
//         }

//         // 6️⃣ Display third column
//         let thirdCol = user.score || 0;
//         if (type === "streak") thirdCol = user.streak || 0;
//         if (type === "swipe") thirdCol = user.swipes || 0;

//         // 7️⃣ Render
//         rankBox.innerHTML += `
//             <div class="${cardClass}">
//                 ${badgeHTML}
//                 <span class="col1">${currentRank}</span>
//                 <span class="col2">${user.username}</span>
//                 <span class="col1">${thirdCol}</span>
//             </div>
//         `;
//     });
// }
let allUsers = []; // store API data globally
let Friend = []; // store API data globally
const sessionUser = localStorage.getItem("username");

// ================= PAGINATION VARIABLES =================
let currentPageGlobal = 1;
let currentPageLocal = 1;
const rowsPerPage = 10; // users per page

document.addEventListener("DOMContentLoaded", () => {
    Globalleadboard();
});

function Globalleadboard() {
    document.getElementById("btn-global").style.backgroundColor = "#000000";
    document.getElementById("btn-global").style.color = "#ffffff";
    document.getElementById("btn-global").style.border = " 1.5px solid #000cea";
    document.getElementById("btn-local").style.backgroundColor = "#f1f1f1";
    document.getElementById("btn-local").style.color = "#000000";
    document.getElementById("btn-local").style.border = " 1.5px solid #000cea";
    document.getElementById("streak").style.visibility = "visible";
    document.getElementById("swipes").style.visibility = "visible";
     

    // show global pagination, hide local pagination
    document.getElementById("pagination").style.display = "flex";
    document.getElementById("localPagination").style.display = "none";
    loadRanking();

    // Attach filter button listeners
    document.querySelectorAll(".secondary .sbutton").forEach(btn => {
        btn.addEventListener("click", () => {
            filterLeaderboard(btn.value);
        });
    });

    // Search input listener
    const searchInput = document.querySelector(".searching input");
    searchInput.addEventListener("input", () => {
        searchLeaderboard(searchInput.value.trim());
    });
}

// ================= LOAD API ONCE =================
function loadRanking() {
    fetch(API.getAllUsers(), {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .then(users => {
            allUsers = users;
            filterLeaderboard("score"); // default sort by score
        })
        .catch(err => { window.location.href = "/pages/error.html"; console.error("Ranking error:", err) });
}

// ================= FILTER FUNCTIONS =================
function filterLeaderboard(type) {
    if (!allUsers.length) return;

    document.querySelectorAll(".secondary .sbutton").forEach(btn => {
        btn.classList.toggle("actives", btn.value === type);
    });

    currentPageGlobal = 1; // reset to first page
    buildRankUI(allUsers, type);
}

// Search function
function searchLeaderboard(query) {
    if (!allUsers.length) return;

    if (!query) {
        const activeBtn = document.querySelector(".secondary .sbutton.active");
        filterLeaderboard(activeBtn?.value || "score");
        return;
    }

    const filtered = allUsers.filter(u =>
        u.username.toLowerCase().includes(query.toLowerCase()) ||
        u.rank?.toString() === query
    );

    currentPageGlobal = 1;
    buildRankUI(filtered, "score", true);
}

// ================= BUILD GLOBAL UI =================
function buildRankUI(users, type = "score", isSearch = false) {
    const rankBox = document.querySelector(".RankBox");
    rankBox.innerHTML = "";

    document.querySelectorAll(".secondary .sbutton").forEach(btn => {
        btn.classList.toggle("active", btn.value === type);
    });

    // Sort users
    users.sort((a, b) => {
        if (type === "score") return b.score - a.score;
        if (type === "streak") return (b.streak || 0) - (a.streak || 0);
        if (type === "swipe") return (b.swipes || 0) - (a.swipes || 0);
        return 0;
    });

    const col3Header = document.querySelector(".colName .col:nth-child(3)");
    col3Header.textContent = type.charAt(0).toUpperCase() + type.slice(1);

    const prevRank = Number(localStorage.getItem("prevRank"));
    const storedUI = JSON.parse(localStorage.getItem(`rankUI_${sessionUser}`) || "{}");

    // PAGINATION SLICING
    const startIdx = (currentPageGlobal - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    const pageUsers = users.slice(startIdx, endIdx);

    pageUsers.forEach((user, index) => {
        const currentRank = startIdx + index + 1;
        let cardClass = "card";
        let badgeHTML = "";

        if (user.username === sessionUser && storedUI.cardClass) {
            cardClass = storedUI.cardClass;
            badgeHTML = storedUI.badgeHTML || "";
        }

        if (user.username === sessionUser && !isSearch) {
            if (Number.isFinite(prevRank)) {
                if (currentRank < prevRank) {
                    cardClass = "gain";
                    badgeHTML = `<span class="badge gain-badge">↑ ${prevRank - currentRank}</span>`;
                } else if (currentRank > prevRank) {
                    cardClass = "loss";
                    badgeHTML = `<span class="badge loss-badge">↓ ${currentRank - prevRank}</span>`;
                }
            }
            localStorage.setItem("prevRank", currentRank);
            localStorage.setItem(`rankUI_${sessionUser}`, JSON.stringify({ cardClass, badgeHTML }));
        }

        let thirdCol = user.score;
        if (type === "streak") thirdCol = user.streak || 0;
        if (type === "swipe") thirdCol = user.swipes || 0;

        rankBox.innerHTML += `
            <div class="${cardClass}">
                ${badgeHTML}
                <span class="col1">${currentRank}</span>
                <span class="col2">${user.username}</span>
                <span class="col1">${thirdCol}</span>
            </div>
        `;
    });

    renderPagination(users, "global");
}

// ================= LOCAL LEADERBOARD =================
function Localleadboard() {
    document.getElementById("btn-local").style.backgroundColor = "#000000";
    document.getElementById("btn-local").style.color = "#ffffff";
    document.getElementById("btn-local").style.border = " 1.5px solid #000cea";
    document.getElementById("btn-global").style.backgroundColor = "#f1f1f1";
    document.getElementById("btn-global").style.color = "#000000";
    document.getElementById("btn-global").style.border = " 1.5px solid #000cea";
    document.getElementById("streak").style.visibility = "hidden";
    document.getElementById("swipes").style.visibility = "hidden";
     document.getElementById("pagination").style.display = "none";
    document.getElementById("localPagination").style.display = "flex";
    loadLocalRanking();

    document.querySelectorAll(".secondary .sbutton").forEach(btn => {
        btn.addEventListener("click", () => {
            filterLeaderboardlocal(btn.value);
        });
    });

    const searchInput = document.querySelector(".searching input");
    searchInput.addEventListener("input", () => {
        searchLeaderboard(searchInput.value.trim());
    });
}

function loadLocalRanking() {
    const user = localStorage.getItem("username");
    fetch(API.getFriendsList(user), {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .then(users => {
            localStorage.setItem("pfps", users.pfp)
            Friend = users;
            filterLeaderboardlocal("score");
        })
        .catch(err => { window.location.href = "/pages/error.html"; console.error("Ranking error:", err) });
}

function filterLeaderboardlocal(type) {
    if (!Friend.length) return;

    document.querySelectorAll(".secondary .sbutton").forEach(btn => {
        btn.classList.toggle("actives", btn.value === type);
    });

    currentPageLocal = 1;
    buildRankUILocal(Friend, type);
}

// ================= BUILD LOCAL UI =================
function buildRankUILocal(users, type = "score", isSearch = false) {
    const rankBox = document.querySelector(".RankBox");
    rankBox.innerHTML = "";

    const friendUsers = users.map(f => {
        const friendUsername = (f.friend1 === sessionUser ? f.friend2 : f.friend1);
        return allUsers.find(u => u.username === friendUsername);
    }).filter(u => u !== undefined);

    const sessionUserData = allUsers.find(u => u.username === sessionUser);
    const localUsers = sessionUserData ? [sessionUserData, ...friendUsers] : friendUsers;

    document.querySelectorAll(".secondary .sbutton").forEach(btn => {
        btn.classList.toggle("active", btn.value === type);
    });

    localUsers.sort((a, b) => {
        if (type === "score") return (b.score || 0) - (a.score || 0);
        if (type === "streak") return (b.streak || 0) - (a.streak || 0);
        if (type === "swipe") return (b.swipes || 0) - (a.swipes || 0);
        return 0;
    });

    const col3Header = document.querySelector(".colName .col:nth-child(3)");
    col3Header.textContent = type.charAt(0).toUpperCase() + type.slice(1);

    const prevRank = Number(localStorage.getItem("prevRank"));
    const storedUI = JSON.parse(localStorage.getItem(`rankUI_${sessionUser}`) || "{}");

    const startIdx = (currentPageLocal - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    const pageUsers = localUsers.slice(startIdx, endIdx);

    pageUsers.forEach((user, index) => {
        const currentRank = startIdx + index + 1;
        let cardClass = "card";
        let badgeHTML = "";

        if (user.username === sessionUser && storedUI.cardClass) {
            cardClass = storedUI.cardClass;
            badgeHTML = storedUI.badgeHTML || "";
        }

        if (user.username === sessionUser && !isSearch) {
            if (Number.isFinite(prevRank)) {
                if (currentRank < prevRank) {
                    cardClass = "gain";
                    badgeHTML = `<span class="badge gain-badge">↑ ${prevRank - currentRank}</span>`;
                } else if (currentRank > prevRank) {
                    cardClass = "loss";
                    badgeHTML = `<span class="badge loss-badge">↓ ${currentRank - prevRank}</span>`;
                }
            }
            localStorage.setItem("prevRank", currentRank);
            localStorage.setItem(`rankUI_${sessionUser}`, JSON.stringify({ cardClass, badgeHTML }));
        }

        let thirdCol = user.score || 0;
        if (type === "streak") thirdCol = user.streak || 0;
        if (type === "swipe") thirdCol = user.swipes || 0;

        rankBox.innerHTML += `
            <div class="${cardClass}">
                ${badgeHTML}
                <span class="col1">${currentRank}</span>
                <span class="col2">${user.username}</span>
                <span class="col1">${thirdCol}</span>
            </div>
        `;
    });

    renderPagination(localUsers, "local");
}

// ================= PAGINATION =================
function renderPagination(users, mode = "global") {
    const pageCount = Math.ceil(users.length / rowsPerPage);
    const paginationId = mode === "global" ? "pagination" : "localPagination";
    const pagination = document.getElementById(paginationId);
    if (!pagination) return;
    pagination.innerHTML = "";

    for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.classList.add("page-btn");
        if ((mode === "global" ? currentPageGlobal : currentPageLocal) === i) btn.classList.add("active");

        btn.addEventListener("click", () => {
            if (mode === "global") currentPageGlobal = i;
            else currentPageLocal = i;

            if (mode === "global") buildRankUI(users, document.querySelector(".secondary .sbutton.active")?.value || "score");
            else buildRankUILocal(Friend, document.querySelector(".secondary .sbutton.active")?.value || "score");
        });

        pagination.appendChild(btn);
    }
}