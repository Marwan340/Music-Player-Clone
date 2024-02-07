const button=document.getElementById("mybutton");
const stopp=document.getElementById("stopbtn");
const pause=document.getElementById("pausebtn");
const up=document.getElementById("volume+");
const down=document.getElementById("volume-");
const changetrk=document.getElementById("changetrack");

const audioplayer=new Audio();

button.addEventListener("click", (e)=>{
    audioplayer.play();
});

stopp.addEventListener("click", (e)=>{
    audioplayer.pause();
    audioplayer.currentTime=0;
});

pause.addEventListener("click", (e)=>{
    audioplayer.pause();
})
up.addEventListener("click", (e)=>{
    audioplayer.volume+=0.1;
})
down.addEventListener("click", (e)=>{
    audioplayer.volume-=0.1;
})
changetrk.addEventListener("click", (e)=>{
    audioplayer.src="";
})