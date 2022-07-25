let play = document.getElementsByClassName('play')[0];
let forward = document.getElementsByClassName('forward')[0];
let backward = document.getElementsByClassName('backward')[0];
let shuffle = document.getElementsByClassName('shuffle')[0];
let speaker = document.getElementsByClassName('speaker')[0];
let title = document.getElementById('title');
let cover = document.getElementById('image');
let player = document.getElementsByClassName('player')[0];
let start_time = document.getElementsByClassName('start-time')[0];
let end_time = document.getElementsByClassName('end-time')[0];
const audio = document.getElementsByTagName('audio')[0];
let progress = document.getElementsByClassName('music-played__till-now')[0];
let progress_container = document.getElementsByClassName('music-played__complete')[0];

let shuffled = false;
let muted = false;
let playing_history =[];

const songs = [
  'Monster - By MusicbyAden (Free Copyright Safe Music)',
  'Over You - Atch · [Free Copyright-safe Music]',
  'Too Sweet - IVAAVI [Audio Library Release] · Free Copyright-safe Music',
  'Trust Me (instrumental) – RYYZN (No Copyright Music)',
  "Wanderlust - extenz [Audio Library Release] · Free Copyright-safe Music",
  'Wistful Rain by Ghostrifter Official · [Free Copyright-safe Music]'
]


let songIndex = 1;

loadSong(songs[songIndex]);

function loadSong(song){
  title.innerText = song;
  audio.src = `Songs/${song}.mp3`;
  cover.src=`Photos/${song}.jpg`;
}

function playSong(){
  player.classList.add('play');
  play.src='icons/pause.png';
  let promise=audio.play();
}

function pauseSong(){
  player.classList.remove('play');
  play.src='icons/play.png';
  let promise=audio.pause();
}


play.addEventListener('click',()=>{
  const isPlaying = player.classList.contains('play');
  if(isPlaying){
    pauseSong();
  }
  else{
    playSong();
  }
})


function nextSong(){
  if(shuffled){
    playing_history.push(songIndex);
    let current = songIndex;
    while(current == songIndex){
      songIndex = Math.floor(Math.random()*songs.length);
    }
    console.log(songIndex);
  }
  else{
    songIndex+=1;
    if(songIndex > songs.length - 1){
      songIndex = 0;
    }
  }
    loadSong(songs[songIndex]);
    playSong();
}


forward.addEventListener('click',nextSong);
backward.addEventListener('click',()=>{
  if(shuffled){
    if(playing_history.length == 0){
      songIndex = Math.floor(Math.random()*songs.length);
      console.log(songIndex);
    }
    else{
      songIndex = playing_history[playing_history.length - 1];
      playing_history.pop();
    }
  }
  else{
    songIndex-=1;
    if(songIndex < 0){
      songIndex = songs.length - 1;
    }
  }
    loadSong(songs[songIndex]);
    playSong();
})



function calctime(time){
  let sec = Math.floor(time);
  let min = Math.floor(sec/60);
  while(sec>=60){
    sec-=60;
  }
  if(!isNaN(min)&& !isNaN(sec)){
  min = min >=10 ? min : '0'+ min;
  sec = sec >=10 ? sec : '0' + sec;
  return  min+":"+ sec;
}
}


function updateprogress(e){
  const { duration , currentTime } = e.srcElement;

  start_time.innerText = calctime(currentTime);
  if(calctime(duration))
  end_time.innerText = calctime(duration);
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}


audio.addEventListener('timeupdate',updateprogress)

function setProgress(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX/width) * duration;
}

progress_container.addEventListener('click',setProgress);
audio.addEventListener('ended',nextSong);

shuffle.addEventListener('click',()=>{
  shuffle.classList.toggle('active');
  shuffled = !shuffled;
  playing_history = [];
})

speaker.addEventListener('click',()=>{
  speaker.classList.toggle('active');
  muted = !muted;
  audio.muted = muted;
})
