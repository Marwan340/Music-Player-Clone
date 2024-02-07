let cars=new Set();
cars.add("Toyota");
cars.add("Lexus");
cars.add("Lotus");
cars.add("Volvo");

console.log(cars);

if (cars.has("Volvo")){console.log("It is one of my favourite cars.")};
if (cars.has("Chrysler")){console.log("Not a favourite car.")}
else {console.log("How reliable is it?")};

for (const car of cars){console.log(car);}

// MAPS;
let municip=new Map([
    ["Hamar", "Innlandet"],
    ["Evje", "Agder"],
    ["Frederikstad", "Viken"],
    ["Ålesund", "Møre og Romsdal"]
                    ]
);
municip.set("Kolsås", "Oslo")
console.log(municip)
document.getElementById("output").innerHTML=municip.get("Evje");

for (const [key, value] of municip){
    console.log("City/village: " + key);
    console.log("County: " + value);
}