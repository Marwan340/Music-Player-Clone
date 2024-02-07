let currentSongIndex = -1;
const inputsearcharea = document.getElementById("inputsearcharea");
const searchbutton = document.getElementById("searchbutton");
const songContainer=document.getElementById("songContainer");
let playHistory=JSON.parse(localStorage.getItem("playHistory"));

const confessionsportrait=document.getElementById("confessionsportrait");
const allegianceportrait=document.getElementById("allegianceportrait");
const minutesportrait=document.getElementById("minutesportrait");
const apotportrait=document.getElementById("apotportrait");
const diamonddustportrait=document.getElementById("diamonddustportrait");
const talamancaportrait=document.getElementById("talamancaportrait");
const volumeControl=document.getElementById("volume-control");

const SongPause=document.getElementById("fa fa-pause");
const SongPlay=document.getElementById("fa fa-play");
const FastForwardSong=document.getElementById("fa fa-fast-forward");
const fastBackwardSong=document.getElementById("fa fa-fast-backward");
const stepbackward = document.getElementById("fa fa-step-backward");
const stepforward = document.getElementById("fa fa-step-forward");
const searchplaybtn=document.getElementById("searchplaybtn");
let audio;
let progressBar;
let timeProgress;

function togglePlay(songUrl) {
    if (audio) {
        if (audio.src === songUrl) {
            // If the same song is clicked again, toggle play/pause
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
            return;
        } else {
            // If a new song is clicked, stop the current audio
            audio.pause();
            // Clear the audio object when a new song is played
            audio.src = "";
            audio.removeEventListener("ended", handleSongEnd);
        }
    

    // Create a new Audio object
    audio = new Audio(songUrl);

    // Add an event listener for the "ended" event
    audio.addEventListener("ended", handleSongEnd);

    // Play the audio
    audio.play();
    }}

    function updateSongOrder() {
        const validSongIds = playHistory.filter(songId => songId !== -1);
    
        const sortedSongs = validSongIds.map(songId => document.getElementById(songId)).filter(song => song);
        // Sort the song elements based on play history
        
        //const sortedSongs = playHistory.map(songId => document.getElementById(songId));
        sortedSongs.forEach(song => songContainer.appendChild(song));
    }
    function songPlayed(songId) {
        playHistory=playHistory || [];
        // Update play history
        playHistory.unshift(songId);
    
        // Store the updated play history in local storage
        localStorage.setItem("playHistory", JSON.stringify(playHistory));
    
        // Update the song order in the DOM
        updateSongOrder();
    }

    function handleSongEnd() {
    currentSongIndex++;
    if(currentSongIndex>=songElements.length){
        currentSongIndex=0;
    }
    const nextSongButton=songElements[currentSongIndex];
    handleSongButtonClick(nextSongButton);
 }

document.addEventListener("DOMContentLoaded", function () {
    const now = new Date();
    const hours = now.getHours();
    const welcomeMessage = document.getElementById("welcomeMessage");

    if (hours>=6 && hours<=12){
        welcomeMessage.innerHTML="<h2>Good Morning</h2>";
    }
    else if (hours>12 && hours<=21) {
        welcomeMessage.textContent="<h2>Good Afternoon</h2>";
    }
    else  {
        welcomeMessage.innerHTML="<h2><b>Good Night</b></h2>";
    }   

    confessionsportrait.addEventListener("click", (event) => {
            const button=event.currentTarget;
            //console.log(button);
            handleSongButtonClick(button);  
            })

    talamancaportrait.addEventListener("click", (event) => {
            const button=event.currentTarget;
            //console.log(button);
            handleSongButtonClick(button);  
            })

    allegianceportrait.addEventListener("click", (event) => {
            const button=event.currentTarget;
            //console.log(button);
            handleSongButtonClick(button);  
            })
    minutesportrait.addEventListener("click", (event) => {
            const button=event.currentTarget;
            //console.log(button);
            handleSongButtonClick(button);  
            })
    apotportrait.addEventListener("click", (event) => {
            const button=event.currentTarget;
            //console.log(button);
            handleSongButtonClick(button);  
            })
    diamonddustportrait.addEventListener("click", (event) => {
            const button=event.currentTarget;
            //console.log(button);
            handleSongButtonClick(button);  
            })   

    function getSongByIndex(songId) {
        const parser = new DOMParser();
        fetch("clone.xml")
        .then(response => response.text())
        .then(xml => {
           // console.log('Parsed XML:', xml)
            const xmldoc = parser.parseFromString(xml, "application/xml");
            const Xpath = `//*[@id="${songId}"]`;
           
            console.log('XPath Query:', Xpath); // Log the XPath query
            
            console.log('Full XML Document:', xmldoc.documentElement.outerHTML);
            const songElement = xmldoc.evaluate(Xpath, xmldoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            console.log('After XPath Query:', songElement);

            if (songElement) {
                const name = songElement.querySelector("name").textContent;
                const url = songElement.querySelector("url").textContent;
                console.log ('Found Song:', { name, url });
                return { name, url };
            } else {
                alert("Song not found.");
                return null;
            }
            
        })
        
        .then(song => {
            // Handle the song object, e.g., call togglePlay
            if (song) {
                togglePlay(song.url);
            } 
            else {
                console.error("Song Not Found.");
            }
            SongPause.addEventListener("click", ()=>{
                if (audio){
                if (audio.paused||audio.currentTime<=0){
                audio.play();}
                else{audio.pause();
                   /* audio.src="";
                    audio.removeEventListener("ended", handleSongEnd);*/
                }}
              })
          //  console.log(song);           
        })
        
        .catch(error => console.error('Error fetching XML:', error));
}       

    SongPause.addEventListener("click", ()=>{
        if (audio){
        if (audio.paused||audio.currentTime<=0){
        audio.play();}
        else{audio.pause();
        /*audio.src="";
        audio.removeEventListener("ended", handleSongEnd);*/
    }}
      });
    SongPlay.addEventListener("click", ()=>{
        if (audio){
            if(audio.paused||audio.currentTime<=0){
                audio.play();
            }
            else{audio.pause();}
        }
        
    });

    FastForwardSong.addEventListener("click", ()=>{
        handleSongEnd(audio);
    });
    fastBackwardSong.addEventListener("click", ()=>{
        currentSongIndex--;
        if(currentSongIndex>=songElements.length){
            currentSongIndex=0;
        }
        const previousSongButton=songElements[currentSongIndex];
        handleSongButtonClick(previousSongButton);
    });
    
    stepbackward.addEventListener("click",()=>{
        stepBackwardAudio();
    });
    stepforward.addEventListener("click",()=>{
        stepForwardAudio();
    });
    songPlayed(currentSongIndex);
    function togglePlay(songUrl) {
        if (audio){
         if(audio.src===songUrl){
         
         if (audio.paused) {
             audio.play();
         } else {
             audio.pause();
         }
         return;
         }
         else{
             audio.pause();
             audio.src="";
             audio.removeEventListener("ended", handleSongEnd);
         }
        }
        const volumeControl = document.getElementById("volume-control");
        audio= new Audio(songUrl);

        volumeControl.addEventListener('input', () => {
            audio.volume = volumeControl.value;
        });
        audio.volume = volumeControl.value;

        progressBar=document.getElementById("progressBar");

        timeProgress=document.getElementById("timeProgress");

        audio.addEventListener('timeupdate', ()=>{ 
            // Update Seekbar
            const progress = parseInt((audio.currentTime/audio.duration)* 100); 
            progressBar.value = progress;

            updateTimeProgress();
        })
    
        progressBar.addEventListener('change', ()=>{
        audio.currentTime = progressBar.value * audio.duration/100;
        })
 
        audio.addEventListener("ended", handleSongEnd);
        audio.play();
     }
     function updateTimeProgress(){
        const currentTime=formatTime(audio.currentTime);
        const duration=formatTime(audio.duration);
        timeProgress.innerHTML=`${currentTime}/${duration}`;
     }
     function formatTime(timeInSeconds){
        const minutes=Math.floor(timeInSeconds/60);
        const seconds=Math.floor(timeInSeconds%60);
        return `${padNumber(minutes)}:${padNumber(seconds)}`;
     }
     function padNumber (number){
        return number<10 ? `0${number}`:`${number}`;
     }

     function stepBackwardAudio(audio){
        audio.currentTime-=10;
     }
     function stepForwardAudio(audio){
        audio.currentTime+=10;
     }
     function handleSongEnd() {
        currentSongIndex++;
        if(currentSongIndex>=songElements.length){
            currentSongIndex=0;
        }
        const nextSongButton=songElements[currentSongIndex];
        handleSongButtonClick(nextSongButton);
     }
     /*
     */

    function handleSongButtonClick(button) {
        const dataIndex = button.getAttribute("data-index");
        const index = parseInt(dataIndex, 10);

        if (!isNaN(index)) {
            
            const songId=index + 1;
            getSongByIndex(songId);

        } else {
            alert("Invalid data-index attribute.");
        }
    }

    const songElements = document.querySelectorAll(".songportrait button");

    songElements.forEach(button => {
        button.addEventListener("click", function () {
            handleSongButtonClick(button);
        });
    });
    })

    

    //Search Bar Code:

    searchbutton.addEventListener("click", () => {
        document.getElementById("output").innerHTML = "";

        const songinput = inputsearcharea.value;

        if (songinput === "") {
            document.getElementById("output").innerHTML = "Enter Song Title/Album";
            setTimeout(() => { document.getElementById("output").innerHTML = ""; }, 3000);
        } else {       
            fetch("clone.xml")
                .then(response => response.text())
                .then(data => {
                    const parser = new DOMParser();
                    const xmldoc = parser.parseFromString(data, "application/xml");
                    const songs = xmldoc.getElementsByTagName("song");
                   // console.log('Number of songs:', songs.length);


                    let songFound = false;

                    for (let i = 0; i < songs.length; i++) {
                        /*const albumNode = songs[i].querySelector("album");
                        const album = albumNode ? albumNode.textContent : "Unknown Album";*/

                        const nameNode = songs[i].querySelector("name");
                        const name = nameNode ? nameNode.textContent : "Unknown Song";

                           /*const lengthNode = songs[i].querySelector("length");
                        const length = lengthNode ? lengthNode.textContent : "Unknown length";*/

                        console.log("Comparing:", name.toLowerCase(), songinput.toLowerCase());

                        if (name.toLowerCase() === songinput.toLowerCase()) {
                            const albumNode = songs[i].querySelector("album");
                            const album = albumNode ? albumNode.textContent : "Unknown Album";

                            const lengthNode = songs[i].querySelector("length");
                        const length = lengthNode ? lengthNode.textContent : "Unknown length";

                            document.getElementById("output").innerHTML = "Album: " + album + " | Song Name: " + name + ", " + length;

                            const searchplaybtn = document.createElement("button");
                            searchplaybtn.id = "searchplaybtn";
                            searchplaybtn.type = "button";
                            searchplaybtn.innerHTML = `<i class="fas fa-play" style="font-size: 36px;"></i>`;

                            const urlNode = songs[i].querySelector("url");
                            const url = urlNode ? urlNode.textContent : null;

                            if (url) {
                                searchplaybtn.addEventListener("click", () => {
                                    togglePlay(url);
                                });
                            } else {
                                console.error("URL not found for the selected song.");
                            }
                            
                               document.getElementById("output").appendChild(searchplaybtn);
                               songFound = true;
                               break; // Exit the loop when the song is found
                           }
                           
                       }
                       
                       
                      if (!songFound) {
                          alert("Song Not Found");
                      }
                    })
                
                .catch(error => console.error('Error fetching XML:', error));
            }
        });