// Detect platform and OS
const details = navigator.userAgent;
const isMobileDevice = /android|iphone|kindle|ipad/i.test(details);
const isChromebook = /(CrOS)/.test(details);
const isMac = navigator.appVersion.indexOf("Mac") !== -1;
const isWindows = navigator.appVersion.indexOf("Win") !== -1;

// Define key combinations
let keyCombination = "Win + Shift + Enter"; // Default for Windows
if (isMac) keyCombination = "Cmd + Shift + Enter";
if (isChromebook) keyCombination = "Ctrl + Shift + Enter";

// Function to display the correct key combination
function displayKeyCombination() {
  document.querySelector(".command").textContent = keyCombination;
}

// Function to handle character display and sound
function handleCharacterChange(current) {
  const currentAudio = new Audio("audio/" + current + ".mp3");
  currentAudio.play();

  document.querySelectorAll(".img-block").forEach((div) => {
    if (div.id === current) {
      div.firstElementChild.classList.add("visible");
    } else {
      div.firstElementChild.classList.remove("visible");
    }
  });
}

// Function to enter fullscreen mode
function enterFullscreen(element) {
  if (element.requestFullscreen) element.requestFullscreen();
  else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
  else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
  else if (element.msRequestFullscreen) element.msRequestFullscreen();
}

// Fullscreen exit function
function exitFullscreen() {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  else if (document.msExitFullscreen) document.msExitFullscreen();
}

// Handle mobile-specific logic
if (isMobileDevice) {
  document.getElementById("instruction").textContent = "Let your kiddo click on the screen to discover special Cocomelon characters.";
  document.querySelector(".bar").classList.add("hide");
  document.querySelector(".alt-way").classList.add("hide");
  document.querySelector(".command").classList.add("hide");

  document.querySelector(".btn").addEventListener("click", function () {
    window.location.href = "play-mob.html";
  });

  window.addEventListener("dblclick", function () {
    window.location.href = "play-mob.html";
  }, false);

  // Mobile-specific play functionality
  document.addEventListener("dblclick", function () {
    const element = document.querySelector("#play-block");
    enterFullscreen(element);

    document.getElementById("message").classList.add("move-up");
    document.getElementById("message").textContent = "Click anywhere to play | Swipe left to exit";

    document.querySelectorAll(".img-block").forEach((img) => {
      img.addEventListener("click", (event) => {
        let current = event.target.id || event.target.parentElement.id;
        handleCharacterChange(current);
      });
    });

    let touchstartX = 0;
    let touchendX = 0;
    const slider = document.getElementById("play-block");

    slider.addEventListener('touchstart', ev => {
      touchstartX = ev.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', ev => {
      touchendX = ev.changedTouches[0].screenX;
      if (touchstartX - touchendX > 100) exitFullscreen();
    });
  }, false);
} else {
  // Desktop/Chromebook-specific logic
  document.getElementById("instruction").textContent = `Let your kiddo press a random key on your keyboard and discover a special Cocomelon character. You can press ${keyCombination} to enter or exit fullscreen mode.`;

  // Call the function to display the key combination
  displayKeyCombination();

  const platformUrl = isChromebook ? "play-chrome.html" : "play-desk.html";
  
  document.querySelector(".btn").addEventListener("click", function () {
    window.location.href = platformUrl;
  });

  document.onkeydown = function (e) {
    const element = document.querySelector("#play-block");
    if (isMac && e.keyCode === 13 && e.metaKey && e.shiftKey) {
      enterFullscreen(element);
    } else if (isWindows && e.keyCode === 13 && e.shiftKey && e.metaKey) {
      enterFullscreen(element);
    } else if (isChromebook && e.keyCode === 13 && e.ctrlKey && e.shiftKey) {
      enterFullscreen(element);
    }
  };

  document.onkeydown = function (e) {
    const charArray = ["yoyo", "coco", "jj", "tomtom", "ele", "teddy", "piggy", "monkey", "ducky", "bingo", "cody", "nina", "cece", "nico", "bella", "mousy"];
    let current = "nono"; // default nono sound

    if ((e.keyCode === 13 && e.ctrlKey && e.shiftKey) || (e.keyCode === 27)) {
      exitFullscreen();
    } else {
      current = charArray[Math.floor(Math.random() * charArray.length)];
      handleCharacterChange(current);
    }
  };
}