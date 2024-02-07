  const red = document.getElementById("red");
   const blue=document.getElementById("blue");
   const switchBtn=document.getElementById("button");

function getRandomColor() {
  let letters=`0123456789ABCDEF`;
  let color=`#`;
  for (let i = 0; i < 6; i++) {
    color+=letters[Math.floor(Math.random()*16)];
  }
  return color;
};

function changeBackgroundColor(box) {
    const newColor= getRandomColor();
    box.style.backgroundColor=newColor;
};
    red.addEventListener("click", () => {
      changeBackgroundColor(red);
    });

    blue.addEventListener("click", ()=>{
      changeBackgroundColor(blue);
    });

    switchBtn.addEventListener("click", ()=>{
       const redColor=red.style.backgroundColor;

       red.style.backgroundColor=blue.style.backgroundColor;
       blue.style.backgroundColor=redColor;
    });