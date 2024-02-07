let vid=document.getElementsByTagName("video");
vid=vid[0];
let interval= setInterval(postTime, 1000);
function postTime(e){
    let time=Math.round(vid.currentTime);
    document.getElementById("Timeout").innerHTML=time;
}

const btnplay=document.getElementById("play-button");
const pausebtn=document.getElementById("pause-button");
const stopbtn=document.getElementById("stop-button");
const volumeControl = document.getElementById("volume-control");

    btnplay.addEventListener("click", ()=>{
    vid.play();
    });
    pausebtn.addEventListener("click", ()=>{
    vid.pause();
    });
    stopbtn.addEventListener("click", ()=>{
    vid.pause();
    vid.currentTime=0;
    });
    volumeControl.addEventListener("input", (e)=>{
        vid.volume=e.target.value;
    })