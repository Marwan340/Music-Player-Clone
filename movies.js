document.addEventListener("DOMContentLoaded", function(){
    const getdata=document.getElementById("search");
    const movieinput=document.getElementById("searchinput");
    getdata.addEventListener("click", ()=>{
    const moviename=movieinput.value.trim();
    if(moviename===""){alert("Enter movie name:")
    return;}
        fetch("movies.json")
        .then(Response=>Response.json())
        .then(data=>{
            const movie=data.find(
            movie=>movie.title===moviename);
        if (movie){
            document.getElementById("movies").textContent=movie.title;
            document.getElementById("dirname").textContent=movie.director;
            document.getElementById("date").textContent=movie.release_date;
        }
        else{alert("Movie not found.");}})
            
    
    
    .catch(error=>{console.log(error)})})})