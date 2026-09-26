const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");
const mainContent = document.getElementById("mainContent");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicText = document.getElementById("musicText");
const discordBtn = document.getElementById("discordBtn");
const toast = document.getElementById("toast");

let playing = false;

async function enterSite() {
  intro.classList.add("hide");
  mainContent.classList.remove("hidden");
  mainContent.animate(
    [{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }],
    { duration: 800, easing: "ease-out", fill: "forwards" }
  );

  try {
    await music.play();
    playing = true;
    updateMusicUI();
  } catch (error) {
    playing = false;
    updateMusicUI();
  }
}

enterBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  enterSite();
});

intro.addEventListener("click", enterSite);

musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      playing = true;
    } catch (_) {}
  } else {
    music.pause();
    playing = false;
  }
  updateMusicUI();
});

function updateMusicUI() {
  musicText.textContent = playing ? "MUSIC ON" : "MUSIC OFF";
  musicBtn.classList.toggle("music-off", !playing);
}

discordBtn.addEventListener("click", async () => {
  const username = "not_jhb";
  try {
    await navigator.clipboard.writeText(username);
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
  } catch (_) {
    alert("Discord username: " + username);
  }
});
