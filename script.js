console.log('evening fellas');

let currentSong= new Audio();
 
function formatTime(seconds) {
    // Remove milliseconds by flooring the total seconds
    const totalSeconds = Math.floor(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    // Ensure seconds are always two digits
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
}

async function getSongs(){

    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response= await a.text();
    console.log(response); 
    let div = document.createElement("div")  
    div.innerHTML = response;

    let as = div.getElementsByTagName("a")
    let songs=[]

    for (let index = 0; index < as.length; index++) {
        const element = as[index];      
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }       
    }
    return songs
    // console.log(songs);
    
} 

// --------------------------------------------------------------------------------------------------

const playMusic = (track, pause=false)=>{
    // let audio= new Audio("/songs/" +track)
    currentSong.src = "/songs/"+ track
    if (!pause){

        currentSong.play()
        play.src="pause.svg"
    }
    document.querySelector(".songinfo").innerHTML= track 
    document.querySelector("title").innerHTML = "Spotify – " +  track
    document.querySelector(".songtime").innerHTML= "00:00 / 00:00"
}

// ---------------------------------------------------------------------------------------------------

async function main() {
    //Get the list of all the songs
    let songs = await getSongs()
    
    //set a bydefault top song
    playMusic(songs[0], true)


    thmb = ["https://images-na.ssl-images-amazon.com/images/M/MV5BMDk3ZjQ3NDQtM2ZjNy00ZWVlLWFlMGItMjlhMjQ1OTc4ZTFiXkEyXkFqcGdeQXVyNTE0MDc0NTM@._V1_.jpg","https://i.pinimg.com/originals/96/cf/b8/96cfb876dbee86c4ca3b03141dbb0c36.jpg","https://stat5.bollywoodhungama.in/wp-content/uploads/2018/04/Kabir-Singh-12.jpg","https://wallpapers.oneindia.com/ph-1024x768/2012/11/135418816517327.jpg","https://files.prokerala.com/movies/pics/800/anjaana-anjaani-7519.jpg"]


    //show songs in playlist bar
    let songUL = document.querySelector(".song-list").getElementsByTagName("ul")[0]
    for (const [index, song] of songs.entries()) {
        const thumbnail = thmb[index];
        songUL.innerHTML = songUL.innerHTML + `<li>
                            <img src="${thumbnail}" alt="">
                            <img id="play1" class="invert" src="play.svg" alt="play">
                            <div class="info">
                                <div>${song.replaceAll("%20"," ")}</div>
                                <h6>Pranshu</h6>
                            </div> </li>`; 
    }

    //..............................................
    // ---play first song---
    // var audio = new Audio(songs[0]);
    // audio.play();
    
    // audio.addEventListener("loadeddata",()=>{
        //     console.log(audio.duration , audio.currentSrc , audio.currentTime);
        //     the duration var holds duration of audio in seconds 
        // });    
    //..............................................

    //Attach an event listener to each song
    Array.from(document.querySelector(".song-list").getElementsByTagName("li")).forEach(e   => {
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

    //Attach event listener to play prev and next
    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "pause.svg"
        }
        else{
            currentSong.pause()
            play.src = "play.svg"
        }
    })

    //listen for timeupdate
    currentSong.addEventListener("timeupdate", ()=>{
        document.querySelector(".songtime").innerHTML= formatTime(currentSong.currentTime) +"/"+ formatTime(currentSong.duration)
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    })

    //listen for slider seek
    document.querySelector(".seekbar").addEventListener("click", e=>{
        // console.log(e.target, e.offsetX);  //target html element, pixelin x dir  
          
        // console.log(e.target.getBoundingClientRect().width, e.offsetX);  
        //getboundingclient gives position info, so extracting width from that info which gives max x-offset then finding percent of current clicks x-offset
        let percent= (e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left = percent + "%"
        currentSong.currentTime = ((currentSong.duration)*percent)/100
    })

}

main()
