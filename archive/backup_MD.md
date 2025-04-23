# 내가 그린 그림  DrawAnyAnimal
>HTML5 API(canvas, audio) 기능 제어하기
>

![alt text](image-2.png) | ![alt text](image.png)
--|--|

[🔗 사이트 바로가기 ](https://tony96kimsh.github.io/DrawAnyAnimal)

📘 [작업 로그(노션)](https://stump-smartphone-024.notion.site/HTML-5-1d0f398452c380a4b80dfd5fe4baa91a?pvs=4)

 ---

# 프로젝트 소개
- 설치없이 누구나 쉽게 사용가능한 웹 환경에서 이용하는 그림판 어플리케이션
- 귀엽고 깔끔한 디자인과 밝은 배경음악으로 친근한 분위기 제공 
- 강아지와 고양이 사진 API를 통해 특색있는 그림판 앱 제공

### 기술 스택
- javascript: canvasAPI, Audio.API, openAPI (fetchAPI)
- Tailwind

## 주요 기능
1. canvas API를 통한 그림판 기능
    - 붓 색상, 굵기, 투명도, 지우개 기능 제공
2. 고양이, 강아지 API를 통해 다양한 참고 동물 사진 제공
3. Audio API를 통한 배경음악 기능 제공

## 구조

### 레이아웃 구조
![alt text](image-1.png)

### 폴더구조

```tree
── README.md
├── 📁bg // 샘플 배경 음악
├── 📁img // 샘플이미지
├── index.html
└── src
    ├── audio.js // 배경음악 제어
    ├── canvas.js // 그림판 제어
    └── photo.js // 사진 API 제어
```

### 코드 구조

#### audio.js

사용된 내장 함수와 이벤트

- `DOMContentLoaded`  
  HTML 문서가 완전히 로드된 후 실행됨.  
  → 오디오 요소를 DOM에 추가하는 타이밍으로 사용.

- `ended`  
  오디오 한 곡의 재생이 끝났을 때 발생하는 이벤트.  
  → 다음 곡으로 자동 전환하는 데 사용됨.

- `document.createElement('audio')`  
  `<audio>` 요소를 JS로 생성.

- `.src`  
  오디오 파일 경로 지정.

- `.controls = true`  
  재생/일시정지 등 브라우저 기본 오디오 컨트롤 표시.

- `.loop = false`  
  자동 반복 재생 여부 설정 (false일 경우 한 번만 재생).

- `.play()`  
  오디오 재생 시작 (Promise 기반, `await` 가능).

- `addEventListener('ended', callback)`  
  곡이 끝났을 때 콜백 실행 (여기서는 다음 곡 재생).

- `shuffle(array)`  
  Fisher-Yates 알고리즘으로 배열을 랜덤하게 섞음.  
  원본 배열을 손상하지 않기 위해 복사본을 셔플.
```javascript

function shuffle(array) {
  let currentIndex = array.length, randomIndex; // 구조할당

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }
```


#### canvas.js

사용된 내장 함수와 이벤트

- `DOMContentLoaded`  
  페이지의 HTML 구조가 모두 로드된 후 실행.  
  → 오디오에서는 이 시점에 요소 삽입, 캔버스에서는 필요하지 않음.

- `mousedown`, `mousemove`, `mouseup`, `mouseleave`  
  사용자의 마우스 동작을 통해 그림을 시작, 그리는 중, 끝내기, 캔버스 밖으로 나간 상황을 처리.

- `getBoundingClientRect()`  
  캔버스의 크기 및 위치를 가져와 고해상도 디바이스에 맞게 리사이즈.

- `canvas.getContext("2d")`  
  2D 그래픽을 그리기 위한 컨텍스트 생성.

- `.beginPath()` / `.moveTo(x, y)` / `.lineTo(x, y)` / `.stroke()`  
  드로잉의 기본 동작. 선 시작 → 이동 → 선 그리기 → 출력.

- `.clearRect(0, 0, w, h)`  
  전체 캔버스를 초기화하는 메서드.

- `.lineWidth`, `.lineCap`, `.lineJoin`  
  선의 두께와 끝 모양, 꺾이는 지점의 스타일 지정.

- `.globalAlpha`  
  브러시 투명도 제어.

- `hexToRgba(hex, alpha)`  
  16진수 색상(hex)을 RGBA로 변환하여 투명도 조절 가능하게 함.

- 커서 구현 관련:
  - `customCursor.style`을 통해 커서 모양을 브러시 크기와 색상에 맞게 동적으로 표시
  - `position: fixed`, `pointerEvents: none`, `zIndex: 9999`로 마우스에 따라다니는 효과 구현

- `setColor(color)`  
  현재 브러시 색상 설정 및 input[type="color"] UI 연동.

- `eraserBtn.addEventListener("click", ...)`  
  클릭 시 지우개 on/off 전환, 버튼 텍스트도 바뀜.

- `brushSize`, `brushOpacity` 슬라이더 연동  
  입력값에 따라 브러시 두께와 투명도 설정.


#### photo.js

API 요청 코드

```js
async function fetchDogImage() {
  try {
    showLoader();
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await res.json();
    animalImage.src = data.message;
  } catch (err) {
    console.error("강아지 이미지를 불러오는 데 실패했어요 🐶", err);
  } finally {
    hideLoader();
  }
}
```

fetch API vs jQuery AJAX 문법 비교 및 설명

- fetch API (Promise 기반)
```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

- jQuery AJAX (콜백 기반)
```javascript
$.ajax({
  url: 'https://api.example.com/data',
  method: 'GET',
  success: function(data) {
    console.log(data);
  },
  error: function(error) {
    console.error(error);
  }
});
```

- fetch + async/await (가독성 개선)
```javascript
async function loadData() {
  try {
    const res = await fetch('https://api.example.com/data');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

■ async/await 문법 요약

- `async`: 해당 함수가 항상 Promise를 반환하게 만듦
- `await`: Promise가 처리될 때까지 기다림
- 비동기 흐름을 동기처럼 작성 가능 → 가독성 우수

■ OpenAPI 요청 방식

- 고양이 API (The Cat API)
  - URL: `https://api.thecatapi.com/v1/images/search`
  - GET 방식
  - 응답 데이터: 배열
  - 이미지 URL 접근: `data[0].url`
  - 예시 응답:
```json
    {"url": "https://cdn2.thecatapi.com/images/abc.jpg"}
```

- 강아지 API (Dog CEO’s Dog API)
  - URL: `https://dog.ceo/api/breeds/image/random`
  - GET 방식
  - 응답 데이터: 객체
  - 이미지 URL 접근: `data.message`
  - 예시 응답:
```json
{
  "message": "https://images.dog.ceo/breeds/shiba/shiba-1.jpg",
  "status": "success"
}
```


## 추후 작업 및 이슈

### 추후 작업
기능 추가 사항
- 현재 그리는 그림 로컬스토리지에 저장 기능
- 캔버스에 동물 사진 배경 기능 (따라 그리기 기능)
- 창 사이즈 조절 시, 레이아웃 자동 조절 기능
- 터치를 통한 캔버스 제어 기능

보완 사항
- 음악 재생 시, 연속 재생 및 반복 재생
- 캔버스 드로우 중 영역 벗어났다가 돌아올 시 브러쉬 유지 동작
- 사진 요청 실패 시, 기본 이미지와 안내문구 노출

### 이슈
 - (테스트 중...)


### 레퍼런스

- 사진
    - [핀터레스트 - 춤추는 강아지 ](https://kr.pinterest.com/pin/20195898325337996/)
- 폰트
    - [눈누 - 어비 찌빠빠체](https://noonnu.cc/font_page/160)
    - [눈누 - Cafe24 Meongi White](https://noonnu.cc/font_page/1403)
    - [눈누 - 온글잎 콘콘체](https://noonnu.cc/font_page/1546)
- 아이콘
    - [프리픽 - 파비콘](https://www.freepik.com/icon/sketchbook_6994399#fromView=search&page=1&position=41&uuid=9cf6df0d-0622-4012-a7db-9e8ed3676d29)
- 배경음악
    - [유튜브 오디오 라이브러리 - BGM](https://studio.youtube.com/channel/UCo3j6bBQz09Hy7eNkARd3yg/music)