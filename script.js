console.log('evening fellas');

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
async function main() {
    //Get the list of all the songs
    let songs = await getSongs()
    console.log(songs)

    thmb = ["https://images-na.ssl-images-amazon.com/images/M/MV5BMDk3ZjQ3NDQtM2ZjNy00ZWVlLWFlMGItMjlhMjQ1OTc4ZTFiXkEyXkFqcGdeQXVyNTE0MDc0NTM@._V1_.jpg","https://i.pinimg.com/originals/96/cf/b8/96cfb876dbee86c4ca3b03141dbb0c36.jpg","https://stat5.bollywoodhungama.in/wp-content/uploads/2018/04/Kabir-Singh-12.jpg","https://wallpapers.oneindia.com/ph-1024x768/2012/11/135418816517327.jpg","https://files.prokerala.com/movies/pics/800/anjaana-anjaani-7519.jpg"]

    let songUL = document.querySelector(".song-list").getElementsByTagName("ul")[0]
    for (const [index, song] of songs.entries()) {
        const thumbnail = thmb[index];
        songUL.innerHTML = songUL.innerHTML + `<li>
                            <img src="${thumbnail}" alt="">
                            <svg class="invert" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" class="injected-svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#000000"><path d="M5 20V4L19 12L5 20Z" stroke="#000000" stroke-width="1.5" stroke-linejoin="round"></path></svg>
                            <div class="info">
                                <div>${song.replaceAll("%20"," ")}</div>
                                <h6>Pranshu</h6>
                            </div>
                        </li>`; 
    }

    //play song
    var audio = new Audio(songs[0]);
    audio.play();

    audio.addEventListener("loadeddata",()=>{
        console.log(audio.duration , audio.currentSrc , audio.currentTime);
        //the duration var holds duration of audio in seconds 
    });

}

main()
