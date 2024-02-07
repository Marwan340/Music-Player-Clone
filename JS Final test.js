
        // Your existing JavaScript code
        // ...

        document.addEventListener("DOMContentLoaded", function () {
            // Your existing code
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
               const SearchEventValue=SearchEvent.value;
                let EventFound=false;
               for (let i = 0; i < localStorage.length; i++) {
                const key=localStorage.key(i);
                const value=JSON.parse(localStorage.getItem(key));
                 if (value && value.EventName===SearchEventValue) {
                    document.getElementById("SearchOutput").innerHTML="Event title: "+ value.EventName +".";
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
                    const EventData = JSON.parse(value);

                    const EditingArea = document.createElement("div");
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
                        SaveEditedEvent.setAttribute("id", `SaveEditedEvent-${key}`);

                        SaveEditedEvent.addEventListener("click", function () {
                            const EditedEventTitle = document.getElementById(`EditEventTitle-${key}`).value;
                            const EditedEventContent = document.getElementById(`EditEventInput-${key}`).value;

                            localStorage.removeItem(key);
                            localStorage.setItem(EditedEventTitle, EditedEventContent);
                            EditingArea.innerHTML = key + " has been edited.";
                        });

                        EditingArea.appendChild(SaveEditedEvent);
                    });

                    // Add event listener for deletion
                    DeleteEvent.addEventListener("click", function () {
                        localStorage.removeItem(key);
                        EditingArea.remove();
                        alert(key + " has been deleted.");
                    });

                    // Appending elements to the EventsDisplay
                    // ...
                    EventsDisplay.innerHTML+="<b>"+key+"</b>: <br/><p>"+EventData.EventName+", " +EventData.EventDateInput+", " +EventData.EventTimeInput+", " +EventData.Eventlat+", " +EventData.Eventlong+", " +EventData.EventNotes+".<p/>";
                    EventsDisplay.appendChild(EditEvent);
                    EventsDisplay.appendChild(DeleteEvent); 
                    EventsDisplay.innerHTML+="<br/>";
                    EventsDisplay.appendChild(EditingArea);
                }
            });
        });
 
