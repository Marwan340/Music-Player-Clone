/*   //QUESTION NR.1:
let bands=["Sabaton", "Iron Maiden", "Black Sabbath",
"Depeche Mode"];

let fav= prompt ("What's your favourite band?")

if(bands.find(band=>band===fav) )
{document.getElementById("output").innerHTML="This is one of my favourites too."}

else {document.getElementById("output").innerHTML="This is not my favourite."};
*/

/*
var myIntegers=[];
let total=prompt("enter a set of integers and press x when done.");
let  average=total/myIntegers.length;
let product=total*myIntegers.length;

let x=0;
while( x<myIntegers.length ){if 
        (x!="x"){
       myIntegers.push(x); 
    total=total+myIntegers[x];}
    console.log(myIntegers);
}
document.getElementById("output").innerHTML+=total,average,product;
*/

//QUESTION NR.2:

var myIntegers=[];
var input="";


while(input!="x"){input=prompt("Enter a set of integers, press x to exit.");

if (input!="x"){
myIntegers.push(parseInt(input));}
};
var sum=0;
for (var i = 0; i < myIntegers.length; i++) {
    sum+= myIntegers[i];   
}
var average=sum/myIntegers.length;

var product=1;
for (var i = 0; i < myIntegers.length; i++) {
    product*=myIntegers[i];
    
}
console.log(myIntegers);

document.getElementById("output").innerHTML="Sum: "+sum+", Average: "+average+", Product:"+product;