const audioPlayer = document.getElementById("audio-player");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const stopButton = document.getElementById("stop-button");
const volume=document.getElementById("volume-control");
const timeElapsed = document.getElementById("time-elapsed");

playButton.addEventListener("click", () => {
    audioPlayer.play();
   });
pauseButton.addEventListener("click", () => {
    audioPlayer.pause();
   });
stopButton.addEventListener("click", () => {
   
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
   });
volume.addEventListener("input", function (e) {
        audioPlayer.volume = e.target.value;
    });
audioPlayer.addEventListener("timeupdate", () => {
        let minutes = Math.floor(audioPlayer.currentTime / 60);
        let seconds = Math.floor(audioPlayer.currentTime % 60);
        timeElapsed.innerHTML = `${minutes}:${seconds}`;
       });