// DOM elements
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [
  {
    name: "Dashavatar",
    artist: "By Narci",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/c2/15/3d/c2153d6d-bce7-2eb2-536e-1d7492cf84b0/cover.jpg/1200x1200bf-60.jpg",
    path: "Narci2.mp3"
  },
  {
    name: "Ты и Я",
    artist: "By XcHo",
    image: "https://i.scdn.co/image/ab67616d0000b2735d4156362a337995a4e56c87",
    path: "Ты и Я.mp3"
  },
  {
    name: "AeTcTBo",
    artist: " By Rauf & Faik",
    image: "https://i.ytimg.com/vi/-OGiw5YcSO8/maxresdefault.jpg",
    path: "childhood.mp3"
  },
  {
    name: "Cheques",
    artist: "By Subh",
    image: "https://i.ytimg.com/vi/4tywp83zkmk/maxresdefault.jpg",
    path: "subh.mp3"
  },
  {
    name: "Star Boy",
    artist: "By The Weeknd",
    image: "https://i.pinimg.com/736x/91/19/78/91197815268aa7e20b0a3b239d87bf4f.jpg",
    path: "starboy.mp3"
  },
  {
    name: "Džanum ",
    artist: "By Teya Dora",
    image: "https://images.genius.com/2fa537c5a2c8b250aa39e3ac68266104.1000x1000x1.png",
    path: "dzanum.mp3"
  },
  {
    name: "One Love",
    artist: "By Subh",
    image: "https://i1.sndcdn.com/artworks-nGq8biEWiLnc-0-t500x500.jpg",
    path: "Subh2.mp3"
  },
  {
    name: "Limbo",
    artist: "Freddie Dredd",
    image: "https://i.scdn.co/image/ab67616d0000b2735472702e288ab0e6d9d94355",
    path: "Limbo.mp3"
  },
  {
    name: "Warriyo Mortals",
    artist: "By Laura Brehm",
    image: "https://i1.sndcdn.com/artworks-RyKjkoDRrLpllmeo-sz7P6Q-t500x500.jpg",
    path: "Mortals.mp3"
  },
  {
    name: "Ram Darshan",
    artist: "By Narci",
    image: "https://i.ytimg.com/vi/pv2uUH_rkSY/maxresdefault.jpg",
    path: "Narci1.mp3"
  }
];

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();
  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;
  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function random_bg_color() {
  let red1 = Math.floor(Math.random() * 256);
  let green1 = Math.floor(Math.random() * 256);
  let blue1 = Math.floor(Math.random() * 256);
  let red2 = Math.floor(Math.random() * 256);
  let green2 = Math.floor(Math.random() * 256);
  let blue2 = Math.floor(Math.random() * 256);
  let bgColor = `linear-gradient(45deg, rgb(${red1}, ${green1}, ${blue1}), rgb(${red2}, ${green2}, ${blue2})`;
  document.body.style.background = bgColor;
}
let isShuffle = false;

function toggleShuffle() {
  isShuffle = !isShuffle; // Toggle the shuffle state

  // Update the shuffle button appearance based on the state
  const shuffleButton = document.querySelector(".shuffle-button");
  if (isShuffle) {
    shuffleButton.style.color = "#3498db"; // Change color to indicate shuffle is active
  } else {
    shuffleButton.style.color = "white"; // Reset color
  }

  // If shuffle is active, shuffle the track list
  if (isShuffle) {
    shuffleTrackList();
  } else {
    // If shuffle is deactivated, reset the track list to its original order
    track_list.sort((a, b) => a.index - b.index);
  }
}

function shuffleTrackList() {
  // Create a copy of the original track list
  const originalTrackList = [...track_list];

  // Shuffle the copy using the Fisher-Yates algorithm
  for (let i = originalTrackList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [originalTrackList[i], originalTrackList[j]] = [originalTrackList[j], originalTrackList[i]];
  }

  // Update the track list with the shuffled copy
  track_list = originalTrackList;
}

// Make sure to call toggleShuffle initially to set the initial state
toggleShuffle();


function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  if (!isPlaying) {
    playTrack();
  } else {
    pauseTrack();
  }
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < track_list.length - 1) {
    track_index += 1;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = track_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;
  
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;
    
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
    
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }
    
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

loadTrack(track_index);