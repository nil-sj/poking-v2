const charArray = [ "bear", "bird", "cat", "chicken", "cow", "dog", "duck", "fish", "fox", "horse", "lion", "monkey", "mouse", "octopus", "pig", "sheep"];

document.getElementById("message").textContent = "Please double click to start";

let prev = "";

document.addEventListener("dblclick", function(event) {

  var element = document.querySelector("#play-block");

  element.requestFullscreen()
  .then(function() {
    document.getElementById("message").classList.add("move-up");
    document.getElementById("message").textContent = "Click anywhere to play | Swipe left to exit";
    document.querySelectorAll(".img-block").forEach((img) => {
        img.addEventListener("click", (event) => {
          let current = event.target.id;
          if (current == "") {
              current = event.target.parentElement.id;
          }
          if(current == prev) {
            //pick a random current
            current = charArray[Math.floor(Math.random() * charArray.length)];
          }
          //console.log(current);
          const currentAudioFile = "audio/" + current + ".mp3";
          const currentAudio = new Audio(currentAudioFile);
          currentAudio.play();

          document.querySelectorAll(".img-block").forEach((div) => {
            if(div.id == current) {
              div.firstElementChild.classList.add("visible");
            } else {
              if (div.firstElementChild.classList.contains("visible")) {
                div.firstElementChild.classList.remove("visible");
              }
            }
          });

          prev = current;

        });
    });

    let touchstartX = 0
    let touchendX = 0

    const slider = document.getElementById('play-block')

    function handleGesture() {
      if (touchstartX - touchendX > 100) {
        document.exitFullscreen()
        .then(function() {
        	window.location.href = "index.html";
        })
        .catch(function(error) {
        	console.log(error.message);
        });
      }
      if (touchendX - touchstartX > 100) {
        let nonoAudio = new Audio("audio/swipe-left.mp3");
        nonoAudio.play();
      }

    }

    slider.addEventListener('touchstart', evnt => {
      touchstartX = evnt.changedTouches[0].screenX
    })

    slider.addEventListener('touchend', evnt => {
      touchendX = evnt.changedTouches[0].screenX
      handleGesture()
    })

    document.addEventListener("dblclick", function(ev) {
      const nodoubleAudio = new Audio("audio/nodouble.mp3");
      nodoubleAudio.play();
      prev = "";
    });

  })
  .catch(function(error) {
  	// element could not enter fullscreen mode
  	// error message
  	console.log(error.message);
  });
}, false);
