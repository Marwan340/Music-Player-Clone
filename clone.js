let currentSongIndex = -1;
const inputsearcharea = document.getElementById("inputsearcharea");
const searchbutton = document.getElementById("searchbutton");

const confessionsheadsong=document.getElementById("confessionsheadsong");

document.addEventListener("DOMContentLoaded", function () {
  confessionsheadsong.addEventListener("click", (event) => {
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
            } else {
                console.error("Song Not Found.");
            }
          //  console.log(song);           
        })
        
        .catch(error => console.error('Error fetching XML:', error));
}

    function togglePlay(songUrl) {
        const audio = new Audio(songUrl);

        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }
    
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

    const songElements = document.querySelectorAll(".headsong button");

    songElements.forEach(button => {
        button.addEventListener("click", function () {
            handleSongButtonClick(button);
        });
    });
    })

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
                        const albumNode = songs[i].querySelector("album");
                        const album = albumNode ? albumNode.textContent : "Unknown Album";

                        const nameNode = songs[i].querySelector("name");
                        const name = nameNode ? nameNode.textContent : "Unknown Song";

                           const lengthNode = songs[i].querySelector("length");
                        const length = lengthNode ? lengthNode.textContent : "Unknown length";

                        console.log("Comparing:", name.toLowerCase(), songinput.toLowerCase());

                        if (name.toLowerCase() === songinput.toLowerCase()) {
                            document.getElementById("output").innerHTML = "Album: " + album + " | Song Name: " + name + ", " + length;

                            const searchplaybtn = document.createElement("button");
                            searchplaybtn.id = "searchplaybtn";
                            searchplaybtn.type = "button";
                            searchplaybtn.innerHTML = `<i class="fas fa-play" style="font-size: 36px;"></i>`;

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