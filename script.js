console.log("hello");
let audioElement = new Audio('songs/1.mp3');
let songIndex = 1;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'))
let masterSongName = document.getElementById('masterSongName');
let songItemPlays = Array.from(document.getElementsByClassName('songItemPlay'));

let songs = [
    {songName : "Kya Mujhe Pyaar Hai", filePath: "songs/1.mp3", coverPath : "covers/1.jpg"},
    {songName : "Naina(From 'Crew')", filePath: "songs/2.mp3", coverPath : "covers/2.jpg"},
    {songName : "Akhiyaan Gulaab", filePath: "songs/3.mp3", coverPath : "covers/3.jpg"},
    {songName : "Lover(Remix)", filePath: "songs/4.mp3", coverPath : "covers/4.jpg"},
    {songName : "Those Eyes", filePath: "songs/5.mp3", coverPath : "covers/5.jpg"},
]


songItems.forEach((element, i) => {
    //console.log(element,i);
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//handle play/pause
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        }
})

//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //update progressbar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

//to update song to progressbar position
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        masterSongName.innerText = songs[songIndex - 1].songName;
        if (audioElement.paused || audioElement.currentTime <=0){
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
        else{
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        }
        
    })
})

document.getElementById('forward').addEventListener('click', ()=>{
    if(songIndex >= 5){
        songIndex = 1;
    }
    else{
            songIndex+=1;
        }
        makeAllPlays();
        updatePlayIcon(songIndex);
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex - 1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
})

document.getElementById('backward').addEventListener('click', ()=>{
    if(songIndex <= 1){
        songIndex = 5;
    }
    else{
            songIndex-=1;
        }
        makeAllPlays();
        updatePlayIcon(songIndex);
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex - 1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
})


const updatePlayIcon = (index)=>{
    songItemPlays.forEach((element,i)=>{
        if(i+1 == index){
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');
        }
        else{
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        }
    })
}

