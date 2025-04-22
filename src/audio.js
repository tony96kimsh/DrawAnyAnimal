const musicList = [
  'bg/Best Besties - The Soundlings.mp3',
  'bg/Bike Rides - The Green Orbs.mp3',
  'bg/Melodie Victoria - Kevin MacLeod.mp3',
  'bg/Open Your Eyes - Jeremy Korpas.mp3',
  'bg/Sand Castle - Quincas Moreira.mp3',
  'bg/Skip To My Lou - The Green Orbs.mp3',
  'bg/Springtime Family Band - The Green Orbs.mp3'
];

// 🔀 Fisher-Yates 셔플 알고리즘
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }

  return array;
}

const shuffledList = shuffle([...musicList]); // 원본 배열 손상 없이 복사해서 셔플
let currentIndex = 0;

const audioElement = document.createElement('audio');
audioElement.controls = true;
audioElement.autoplay = true;
audioElement.loop = false;
audioElement.src = shuffledList[currentIndex];

audioElement.addEventListener('ended', () => {
  currentIndex = (currentIndex + 1) % shuffledList.length;
  audioElement.src = shuffledList[currentIndex];
  audioElement.play();
});

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('musicPlayer');
  if (container) {
    container.appendChild(audioElement);
  }
});