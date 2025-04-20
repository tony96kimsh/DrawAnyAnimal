const musicList = [
  'bg/Best Besties - The Soundlings.mp3',
  'bg/Bike Rides - The Green Orbs.mp3',
  'bg/Melodie Victoria - Kevin MacLeod.mp3',
  'bg/Open Your Eyes - Jeremy Korpas.mp3',
  'bg/Sand Castle - Quincas Moreira.mp3',
  'bg/Skip To My Lou - The Green Orbs.mp3',
  'bg/Springtime Family Band - The Green Orbs.mp3'
];

const randomIndex = Math.floor(Math.random() * musicList.length);
const selectedMusic = musicList[randomIndex];

const audioElement = document.createElement('audio');
audioElement.src = selectedMusic;
audioElement.controls = true;
audioElement.loop = true;

// autoplay는 브라우저 정책에 따라 실패할 수 있음
audioElement.autoplay = true;
// audioElement.muted = true; // 자동재생만 원한다면 이렇게도 가능

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('musicPlayer');
  if (container) {
    container.appendChild(audioElement);
  }
});