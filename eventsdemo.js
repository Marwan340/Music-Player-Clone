const btnsmaller=document.getElementById("btnsmaller");
const btnlarger=document.getElementById("btnlarger");

let size=1;
btnsmaller.addEventListener("click", (event)=>{
    console.log(event);
    size-=0.75;
    document.getElementById("title").style.fontSize=size+"em";
    if (event.shiftKey==true){alert("Shiftkey is pressed.")}
})
btnlarger.addEventListener("click", ()=>{
    size+=0.75;
    document.getElementById("title").style.fontSize=size+"em";
})

document.addEventListener("keydown", (event)=>{
    var name= event.key;
    var code=event.code;

    document.getElementById("title").innerHTML="key: "+ name + " Code: "+ code;
})