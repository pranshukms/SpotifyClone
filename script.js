console.log('evening fellas');

let currentSong= new Audio();
 

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

const playMusic = (track)=>{
    // let audio= new Audio("/songs/" +track)
    currentSong.src = "/songs/"+ track
    currentSong.play()
    play.src="pause.svg"
}

async function main() {
    //Get the list of all the songs
    let songs = await getSongs()
    // console.log(songs)



    
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

}

main()
