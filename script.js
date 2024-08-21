console.log("evening fellas");

let currentSong = new Audio();

let songs;

let currfolder;

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }
  // Remove milliseconds by flooring the total seconds
  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;
  // Ensure seconds are always two digits
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${minutes}:${formattedSeconds}`;
}


thmb = [  "https://m.media-amazon.com/images/M/MV5BZGQ1NjRhOWEtZTQ4MS00MjY0LWJhZjctOWNlZGY3NTZhMmNmXkEyXkFqcGdeQXVyMTY0MzA2OTgz._V1_.jpg",
  "https://i.pinimg.com/originals/96/cf/b8/96cfb876dbee86c4ca3b03141dbb0c36.jpg",
  "https://stat5.bollywoodhungama.in/wp-content/uploads/2018/04/Kabir-Singh-12.jpg",
  "https://files.prokerala.com/movies/pics/800/anjaana-anjaani-7519.jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReejVrOkUr4Gq3bDVjbzqVS0T3DwD5EBtOAQ&s","https://stat4.bollywoodhungama.in/wp-content/uploads/2016/03/50348492.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTP19KsI7Y33Y47VzGQzfikddyjEgY5qsKKlDYjtje5MXLCpUrIWHn1Jxm_euAgeq3YoM&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7SPrp-lMK5m7o19X7we2WQ7ihq_vFFU0h_w&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7SPrp-lMK5m7o19X7we2WQ7ihq_vFFU0h_w&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7SPrp-lMK5m7o19X7we2WQ7ihq_vFFU0h_w&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7SPrp-lMK5m7o19X7we2WQ7ihq_vFFU0h_w&s"]
let thumbnail;
let nig=[]

async function getSongs(folder) {
  currfolder = folder;

  let a = await fetch(`http://127.0.0.1:3000/${folder}/`);
  let response = await a.text();
  // console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;

  let as = div.getElementsByTagName("a");
  songs = [];

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`/${folder}/`)[1]);
    }
  }
  //show songs in playlist bar
  let songUL = document
    .querySelector(".song-list")
    .getElementsByTagName("ul")[0];
  songUL.innerHTML = "";
  for (const [index, song] of songs.entries()) {
    // if (thmb[index]<4){
    //   return thumbnail
    // }
    thumbnail = nig[index];
    songUL.innerHTML =
      songUL.innerHTML +
      `<li>
                            <img src="${thumbnail}" alt="">
                            <img id="play1" class="invert" src="img/play.svg" alt="play">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
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
  Array.from(
    document.querySelector(".song-list").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      // console.log(e.querySelector(".info").firstElementChild.innerHTML)
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });
}

// --------------------------------------------------------------------------------------------------

const playMusic = (track, pause = false) => {
  // let audio= new Audio("/songs/" +track)
  currentSong.src = `/${currfolder}/` + track;
  currentSong.volume = 0.5;
  if (!pause) {
    currentSong.play();
    play.src = "img/pause.svg";
  }
  document.querySelector(".songinfo").innerHTML = track.replaceAll("%20", " ");
  document.querySelector("title").innerHTML =
    "Spotify – " + track.replaceAll("%20", " ");
  document.querySelector(".songtime").innerHTML = "00:00";
  document.querySelector(".songcurrent").innerHTML = "00:00";
};

// ---------------------------------------------------------------------------------------------------


async function displayAlbums() {
  let a = await fetch(`http://127.0.0.1:3000/songs/`);
  let response = await a.text();
  // console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let anchors = div.getElementsByTagName("a");
  let cardContainer = document.querySelector(".cardContainer");
  let array = Array.from(anchors);
  for (let index = 0; index < array.length; index++) {
    const e = array[index];

    if (e.href.includes("/songs")) {
      let folder = e.href.split("/").slice(-2)[0];
      //Getting the metadata
      let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`);
      let response = await a.json();
      // console.log(response)
      cardContainer.innerHTML =
        cardContainer.innerHTML +
        `<div data-folder="${folder}" class="card p-1 bg-gray rounded1">
                        <div class="circle-container">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="black" class="injected-svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img"
                                color="#000000">
                                <path d="M5 20V4L19 12L5 20Z" stroke="#000000" stroke-width="1.5"
                                    stroke-linejoin="round"></path>
                            </svg>
                        </div>
                        <img src="/songs/${folder}/cover.jpg" alt="img">
                        <h3>${response.title}</h3>
                        <p>${response.artists}</p>
                    </div>`;
    }
  }
  
  //load the playlist according to the library card-----------------------------------------------------
  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    e.addEventListener("click",  (item) => {
      console.log(item.currentTarget.dataset.folder);
      
      if(item.currentTarget.dataset.folder=="fun"){
        nig=thmb.slice(4)
      }
      else if(item.currentTarget.dataset.folder=="aujla"){
        nig=thmb.slice(7)
      }
      else{
        nig=thmb
      }

      songs =  getSongs(`songs/${item.currentTarget.dataset.folder}`);
    });
  });
}

async function main() {
  //Get the list of all the songs
  await getSongs("songs/basic");

  //set a bydefault top song
  playMusic(songs[0], true);

  displayAlbums();

  //Attach event listener to play prev and next
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "img/pause.svg";
    } else {
      currentSong.pause();
      play.src = "img/play.svg";
    }
  });

  //listen for timeupdate------------------------------------------------------------------------------------
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songcurrent").innerHTML = formatTime(
      currentSong.currentTime
    );
    document.querySelector(".songtime").innerHTML = formatTime(
      currentSong.duration
    );
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  //listen for slider seek---------------------------------------------------------------------------------
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    // console.log(e.target, e.offsetX);  //target html element, pixelin x dir

    // console.log(e.target.getBoundingClientRect().width, e.offsetX);
    //getboundingclient gives position info, so extracting width from that info which gives max x-offset then finding percent of current clicks x-offset
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  //listen for previous and next buttons-------------------------------------------------------------------
  previous.addEventListener("click", () => {
    if (!songs || !Array.isArray(songs)) {
      console.error("The songs array is undefined or not an array.");
      return;
    }
    if (!currentSong || !currentSong.src) {
      console.error("currentSong or currentSong.src is undefined.");
      return;
    }
  
    currentSong.pause();
    console.log("previous clicked");
  
    let songName = currentSong.src.split("/").slice(-1)[0];
    console.log("Current song name:", songName);
    
    let index = songs.indexOf(songName);
    console.log("Index of current song:", index);
  
    if (index === -1) {
      console.error("Current song not found in the songs array.");
      return;
    }
  
    if (currentSong.currentTime > 3) {
      playMusic(songs[index]);
    } else if (index - 1 >= 0) {
      playMusic(songs[index - 1]);
    }
  });
  
  next.addEventListener("click", () => {
    if (!songs || !Array.isArray(songs)) {
      console.error("The songs array is undefined or not an array.");
      return;
    }
    if (!currentSong || !currentSong.src) {
      console.error("currentSong or currentSong.src is undefined.");
      return;
    }
  
    currentSong.pause();
    console.log("next clicked");
  
    let songName = currentSong.src.split("/").slice(-1)[0];
    console.log("Current song name:", songName);
    
    let index = songs.indexOf(songName);
    console.log("Index of current song:", index);
  
    if (index === -1) {
      console.error("Current song not found in the songs array.");
      return;
    }
  
    if (index + 1 < songs.length) {
      playMusic(songs[index + 1]);
    } else if (index + 1 === songs.length) {
      currentSong.play();
    }
  });
  

  //listen for volume!!-----------------------------------------------------------------------
  document.querySelector(".range").addEventListener("change", (e) => {
    // console.log(e.target.value);
    let voll = parseInt(e.target.value) / 100;
    console.log(voll);

    currentSong.volume = voll;
    if (voll < 0.01) {
      volico.src = "img/mute.svg";
    } else if (voll < 0.5) {
      volico.src = "img/lowvol.svg";
    } else {
      volico.src = "img/highvol.svg";
    }
  });
  document.querySelector("#volico").addEventListener("click", z => {
    console.log(z.target.src);
    
    // if ((volico.src = "img/highvol.svg")) {
    //   volico.src = "img/mute.svg";
    //   currentSong.volume = 0;
    // } else if ((volico.src = "img/lowvol.svg")) {
    //   volico.src = "img/mute.svg";
    //   currentSong.volume = 0;
    // } else {
    //   z.target.src = z.target.src.replace("img/mute.svg", "img/lowvol.svg");
    // }
    if(z.target.src.includes("img/highvol.svg")){
        z.target.src = z.target.src.replace("img/highvol.svg","img/mute.svg");
        currentSong.volume= 0
        document.querySelector(".volbar").getElementsByTagName("input")[0].value=0;
    }
    else if(z.target.src.includes("img/lowvol.svg")){
        volico.src= "img/mute.svg"
        currentSong.volume= 0
        document.querySelector(".volbar").getElementsByTagName("input")[0].value=0;
    }
    else if(z.target.src.includes("img/mute.svg")){
        volico.src = "img/lowvol.svg"
        currentSong.volume= 0.2
        document.querySelector(".volbar").getElementsByTagName("input")[0].value= "0.2";
    }
  });
}

main();

//responsiveness purposes---------------------------------------------------------------------------------
document.querySelector(".hamburger").addEventListener("click", (ee) => {
  document.querySelector(".left").style.left = 0;
});
document.querySelector(".close").addEventListener("click", (e) => {
  document.querySelector(".left").style.left = -100 + "%";
});

// document.querySelector(".card").addEventListener("mouseenter",()=>{

//     document.querySelector(".circle-container").style.opacity=1
//     document.querySelector(".circle-container").style.bottom= "125px"
// })
// document.querySelector(".card").addEventListener("mouseleave",()=>{
//     document.querySelector(".circle-container").style.opacity=0
//     document.querySelector(".circle-container").style.bottom= "110px"
// })
