
  const TOTAL_WEEKS = 7;
  const streakDays = 50; // example
  const completedWeeks = Math.floor(streakDays / 7);

  function openStreakPopup() {
    document.getElementById("streakPopup").style.display = "flex";
    renderStreak();
  }

  function closeStreakPopup() {
    document.getElementById("streakPopup").style.display = "none";
  }

  function renderStreak() {
    const weeks = document.querySelectorAll(".week");

    weeks.forEach((week, index) => {
      week.classList.remove("active", "completed", "current");

      if (index < completedWeeks) {
        week.classList.add("active");
      }

      // latest completed week → play animation
      if (index === completedWeeks - 1) {
        week.classList.add("completed", "current");
      }
    });

    document.getElementById("streakCount").innerText =
      `🔥 ${streakDays} Days`;
  }
