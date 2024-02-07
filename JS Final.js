let map;
let markers = [];
function initMap () {
    //  map.setMapTypeId("map");
  const OSL= {lat: 60.1997, lng: 11.09660};
  map = new google.maps.Map (document.getElementById("map"), {
      center: OSL , //60.19972544883236, 11.096609890524434 
      zoom: 8,
      mapId: "DemoMapId",});
     
          const input = document.getElementById("Location");
          const searchBox = new google.maps.places.SearchBox(input);
          map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
          // Bias the SearchBox results towards current map's viewport.
          map.addListener("bounds_changed", () => {
          searchBox.setBounds(map.getBounds());
});

searchBox.addListener("places_changed", () => {
  const places = searchBox.getPlaces();
  if (places.length == 0) {
    return;
  }

  // Clear out the old markers.
  markers.forEach((marker) => {
    marker.setMap(null);
  });
  markers = [];

  // For each place, get the icon, name and location.
  const bounds = new google.maps.LatLngBounds();

  places.forEach((place) => {
    if (!place.geometry || !place.geometry.location) {
      console.log("Returned place contains no geometry");
      return;
    }

    const icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25),
    };

    // Create a marker for each place.
    markers.push(
      new google.maps.Marker({
        map,
        icon,
        title: place.name,
        position: place.geometry.location,
      }),
    );
    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  });
  map.fitBounds(bounds);
      });
      map.addListener("click", (event) => {
          placeMarker(event.latLng);
        });
        
        function placeMarker(location) {
          if (markers.length>0){
              markers[0].setMap(null);
              markers=[];
          }
          const marker = new google.maps.Marker({
            position: location,
            map: map,
          });
          markers.push(marker);
        }
    }
        function loadScript() {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyADer444gCllgl8PzVoIXdlvmd5tcBNgZk&libraries=places&callback=initMap`;
            script.defer = true;
            document.head.appendChild(script);}
        window.onload = loadScript;        
            document.addEventListener("DOMContentLoaded", function () {
              
              const SaveEvent=document.getElementById("SaveEvent");
              const ViewEvent=document.getElementById("ViewEvents");
              const EventsDisplay=document.getElementById("EventsDisplay");
              const EventNameInput=document.getElementById("EventName");
              const EventDateInput=document.getElementById("EventDate");
              const EventTimeInput=document.getElementById("EventTime");
              const EventNotes=document.getElementById("EventNotes");
              const SearchEvent=document.getElementById("SearchEvent");
              const SearchButton=document.getElementById("SearchButton");
            
              const Eventlists=document.createElement("div");
              EventsDisplay.appendChild(Eventlists);
              
              SearchButton.addEventListener("click", ()=>{
                 const SearchEventValue=SearchEvent.value.toLowerCase();
                  let EventFound=false;
                 for (let i = 0; i < localStorage.length; i++) {
                  const key=localStorage.key(i);
                  const value=JSON.parse(localStorage.getItem(key));
                   if (value && value.EventName.toLowerCase()===SearchEventValue) {
                      document.getElementById("SearchOutput").innerHTML="Event found: "+ value.EventName +".";
                      EventFound=true;
                      break
                   }           
                   }  if (!EventFound) {alert("Event not found.");}
                 }
              )
              SaveEvent.addEventListener("click", ()=>{
                 
                  let eventsArray = [];
                  if (markers.length>0){
                  const markerLat = markers[0].getPosition().lat();
                  const markerLng = markers[0].getPosition().lng();
                  console.log(EventNameInput);
                  console.log(EventDateInput);
                  console.log(EventTimeInput);
                  const EventData= {EventName:EventNameInput.value,
                                      EventDateInput:EventDateInput.value,
                                      EventTimeInput:EventTimeInput.value,
                                      Eventlat: markerLat,
                                      Eventlong: markerLng,
                                      EventNotes:EventNotes.value};
                  const existingEvents=JSON.parse(localStorage.getItem(EventData))||[];
                  existingEvents.push(EventData);
                      
                  localStorage.setItem(EventData.EventName, JSON.stringify(EventData));
                  const EventsDisplay=document.getElementById("EventsDisplay");
                  EventsDisplay.innerHTML+="The event "+EventData.EventName+" has been saved.";
                      setTimeout(() => {
                          EventsDisplay.innerHTML="";
                      }, 5000);
                  }
              else{alert("No markers found. Please place a marker on the map.");}});
  
              ViewEvent.addEventListener("click", function LoadViewEvent() {
                  for (let i = 0; i < localStorage.length; i++) {
                      const key = localStorage.key(i);
                      const value = localStorage.getItem(key);
                      const EventData = JSON.parse(value)||value;
  
                      const EditingArea = document.createElement("div");
                      EditingArea.style.display="flex";
                      EditingArea.style.flexDirection="column";
                      EditingArea.style.width="280px";
                      EditingArea.setAttribute("id", `EditingArea-${key}`);
  
                      const EditEvent = document.createElement("button");
                      EditEvent.innerHTML = "Edit Event";
                      EditEvent.type = "button";
                      EditEvent.setAttribute("class", "EditBtn");
                      EditingArea.appendChild(EditEvent);
  
                      const DeleteEvent = document.createElement("button");
                      DeleteEvent.innerHTML = "Delete Event";
                      DeleteEvent.type = "button";
                      DeleteEvent.setAttribute("class", "DeleteBtn");
                      EditingArea.appendChild(DeleteEvent);
  
                      // Add event listener for editing
                      EditEvent.addEventListener("click", function () {
                        const EditEventTitle = document.getElementById(`EditEventTitle-${key}`);
                        const EditEventContent = document.getElementById(`EditEventInput-${key}`);
                        const SaveEditedEvent = document.getElementById(`SaveEditedEvent-${key}`);

                        if(!EditEventTitle&&!EditEventContent){

                          const newEditEventTitle = document.createElement("input");
                          newEditEventTitle.placeholder = "Enter New Event Title";
                          newEditEventTitle.setAttribute("id", `EditEventTitle-${key}`);
                          
                          EditingArea.appendChild(newEditEventTitle);
  
                          const newEditEventContent = document.createElement("textarea");
                          newEditEventContent.placeholder = "Event Text";                          
                          newEditEventContent.setAttribute("id", `EditEventInput-${key}`);
                          EditingArea.appendChild(newEditEventContent);
  
                          const SaveEditedEvent = document.createElement("button");
                          SaveEditedEvent.innerHTML = "Save Event";
                          SaveEditedEvent.type="button";
                          SaveEditedEvent.setAttribute("id", `SaveEditedEvent-${key}`);
  
                          SaveEditedEvent.addEventListener("click", () => {
                            const EditedEventTitle = document.getElementById(`EditEventTitle-${key}`).value;
                            const EditedEventContent = document.getElementById(`EditEventInput-${key}`).value;
                        
                            let existingEvents = JSON.parse(localStorage.getItem(key)) || [];
                        
                            if (!Array.isArray(existingEvents) && existingEvents.EventName) {
                                existingEvents = [{ title: existingEvents.EventName, content: existingEvents.EventNotes }];
                            } else if (!Array.isArray(existingEvents)) {
                                existingEvents = [{ title: "", content: "" }];
                                 existingEvents.push({ title: EditedEventTitle, content: EditedEventContent });
                            }
                        
                            const updatedEvents = existingEvents.map((event) => {
                                if (event.title === key) {
                                    return {
                                        title: EditedEventTitle,
                                        content: EditedEventContent,
                                    };
                                } else {
                                    return event;
                                }
                            });
                        
                            localStorage.setItem(key, JSON.stringify(updatedEvents));
                            EditingArea.innerHTML = key + " has been edited.";
                            setTimeout(() => {
                                EditingArea.innerHTML = "";
                            }, 5000);
                        });
                          EditingArea.appendChild(SaveEditedEvent);
                  }});
  
                      // Add event listener for deletion
                      DeleteEvent.addEventListener("click", function () {
                          localStorage.removeItem(key);
                          EditingArea.remove();
                          alert(key + " has been deleted.");
                      });
  
                      // Appending elements to the EventsDisplay
                      // ...
                      let existingEvents = JSON.parse(localStorage.getItem(key)) || [];
                      const eventDetails = document.createElement("p");
                      eventDetails.innerHTML = `<b>${key}</b>: <br/><p>${EventData.EventName || (existingEvents.length > 0 ? existingEvents[0].title : '')}, ${EventData.EventDateInput}, ${EventData.EventTimeInput}, ${EventData.Eventlat}, ${EventData.Eventlong}, ${EventData.EventNotes || (existingEvents.length > 0 ? existingEvents[0].content : '')}.<p/>`;


                      EventsDisplay.appendChild(eventDetails);
                      
                      EventsDisplay.appendChild(EditEvent);
                      EventsDisplay.appendChild(DeleteEvent);

                      EventsDisplay.appendChild(EditingArea);
                      
                      const lineBreak = document.createElement("br");
                      EventsDisplay.appendChild(lineBreak);
                  }
              });
          });