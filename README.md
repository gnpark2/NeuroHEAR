# NeuroHEAR
- - -
## Wix 내의 부분 코드

저희 웹사이트 <b>"뉴로히어 - NeuroHEAR"</b>는 청력 상태를 빠르게 파악할 수 있도록 도와드리며, 청각 상태에 따라 적절한 조언을 통해 난청을 효율적으로 관리하실 수 있는 웹사이트입니다.

간단한 설문을 통해 본인의 상태를 파악하고, 다양한 훈련을 통해 언제 어디서든 인지 저하 속도를 늦출 수 있습니다.

***

### 자가진단

25개의 설문 문항을 제공하며, 이를 통해 현재 본인이 청력으로 인해 생활이 불편한지 알아볼 수 있고 결과를 통해 병원 방문이 권유되는지 조언을 받을 수 있습니다.

아래 코드는 저희 홈페이지의 자가진단 페이지에서 설문조사를 wix의 html 코드 요소 추가로 작성한 것의 일부입니다.

```javaScript
// 자가진단 총 점수 계산 함수
function calculateScore(){
          var totalScore = 0;
          var radios = document.querySelectorAll('input[type="radio"]:checked');
          var errorElements = document.querySelectorAll('.error');

          // 문항 각각의 radio에서 선택된 value값 불러와 합산
          radios.forEach(function (radio) {
            totalScore += parseInt(radio.value);
          });

          // 문항 각각의 radio에서 체크가 안된 문항 error 표시, 전부 체크 되었으면 총 점수 표기
          var allRadios = document.querySelectorAll('input[type="radio"]');
          allRadios.forEach(function (radio) {
            var groupName = radio.getAttribute('name');
            var checkedRadios = document.querySelectorAll('input[name="' + groupName + '"]:checked');
            // 체크 여부 판단
            if (checkedRadios.length === 0) {
              var errorElement = document.getElementById('error-' + groupName);
              if (errorElement) {
                errorElement.style.display = 'inline';
              }
              totalScore = NaN;
            } else {
              var errorElement = document.getElementById('error-' + groupName);
              if (errorElement) {
                errorElement.style.display = 'none';
              }
            }
          });

          // 위에서 얻은 totalScore의 상태에 따른 text화
          if (!isNaN(totalScore)) {
            document.getElementById('totalScore').innerText = "총 점수 : " + totalScore + "점";
          } else {
            document.getElementById('totalScore').innerText = "체크되지 않은 항목이 있습니다.";
          }
}
```

<br/><br/>

+ error 표기 (빨간 *)


<img src="https://github.com/gnpark2/NeuroHEAR/assets/55909071/ea0dc18f-c182-4b3a-bbd0-b043173eb2ba" width="400" height="350">

<br/><br/>

+ 총 점수 표기


<img src="https://github.com/gnpark2/NeuroHEAR/assets/55909071/6fd40514-c863-4f79-9ae7-9f2eceab1607" width="400" height="350">

<br/><br/>

+ 결과 보기 팝업


<img src="https://github.com/gnpark2/NeuroHEAR/assets/55909071/95f8e3e0-3047-4b9e-87fa-c5b532c6c61d" width="400" height="400">



***

### 기초훈련

치매 예방을 위해 작업 기억 촉진 과제를 제공합니다.

아래 코드는 저희 홈페이지의 기본 훈련 페이지에서 wix의 html 코드 요소 추가로 작성한 것의 일부입니다.

```javaScript
      //html의 요소들과 연결
      const numberDisplay = document.getElementById('numberDisplay');
      const notion = document.getElementById('notion');
      const question = document.getElementById('question');
      const playButton = document.getElementById('playButton');
      const yesButton = document.getElementById('yesButton');
      const noButton = document.getElementById('noButton');
      const result = document.getElementById('result');
      const answer = document.getElementById('answer');

      //숫자 음성 파일
      var audioFiles = [
        'https://static.wixstatic.com/mp3/8cecc1_75216b17b77d470b8ac160e238c4cb2a.wav',
        'https://static.wixstatic.com/mp3/8cecc1_93551c75a4204773ad7dd8ccae12f3a9.wav',
        'https://static.wixstatic.com/mp3/8cecc1_810743c4945c4f4f87f15058c32108f7.wav',
        'https://static.wixstatic.com/mp3/8cecc1_d3a9d9993f0145dd931971a5618b7eaa.wav',
        'https://static.wixstatic.com/mp3/8cecc1_3e5b11916bd44a43b4c3f71a312b7977.wav',
        'https://static.wixstatic.com/mp3/8cecc1_98b56d95c79e484894cf221241616047.wav',
        'https://static.wixstatic.com/mp3/8cecc1_46dc3391794b40428c06f024c8bfb6cb.wav',
        'https://static.wixstatic.com/mp3/8cecc1_049c4b8bf3404d52824a1fe63135e25c.wav',
        'https://static.wixstatic.com/mp3/8cecc1_37af5b5bd11a48f5855d00a29aaf28a9.wav',
        'https://static.wixstatic.com/mp3/8cecc1_2c73088560c0496fa0e4c1d527a3b25d.wav'
      ];
      var audioElements = [];

      // 배열을 무작위로 섞는 함수
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      // 시작하기 버튼과 상호작용 함수
      function playAudios() {
        numberDisplay.style.visibility = 'hidden';
        question.style.display = 'none';
        result.style.display = 'none';
        result.style.visibility = 'hidden';
        answer.style.display = 'none';
        playButton.style.visibility = 'hidden';

        notion.innerHTML = "소리가 안들리면 볼륨을 높여주세요.";
        notion.style.display = 'block';

        var shuffledAudio = shuffle([...audioFiles]);
        var selectedIndexes = shuffledAudio.slice(0, 3);

        // 오디오 요소 생성하여 배열에 추가
        selectedIndexes.forEach(audioUrl => {
          var audio = new Audio(audioUrl);
          audioElements.push(audio);
        });

        var delay = 1200; // 1.2초 딜레이
        var index = 0;

        // 다음 오디오 재생 함수
        function playNextAudio() {
          if (index < audioElements.length) {
            audioElements[index].play();
            index++;
            setTimeout(playNextAudio, delay);
          } else {
            displayNumber();
          }
        }

        // 재생 함수 호출
        playNextAudio();
      }

      // 무작위 숫자 관련 시각화 제어 함수
      function displayNumber(){
        var randomNumber = Math.floor(Math.random() * 10);
        numberDisplay.innerHTML = randomNumber;
        question.innerHTML = "앞서 들린 숫자에 보이는 숫자("+randomNumber+")가 있었나요?";
        notion.style.display = 'none';
        question.style.display = "block";
        numberDisplay.style.visibility = 'visible';
        yesButton.style.visibility = 'visible';
        yesButton.style.display = "block";
        noButton.style.visibility = 'visible';
        noButton.style.display = "block";
        result.style.visibility = 'hidden';
        yesButton.setAttribute("data-random-number", randomNumber);
      }

      // 정답과 반응 제어 함수
      function checkAnswer(isYes){
        var randomNumber = parseInt(yesButton.getAttribute("data-random-number"));
        var audioIndexes = [];
        for (var i = 0; i < 3; i++){
          var audioUrl = audioElements[i].src;
          audioIndexes.push(audioFiles.indexOf(audioUrl));
        }
        answer.innerHTML = "방금 나온 숫자는 : "+ audioIndexes[0]+ ", "+ audioIndexes[1]+", "+audioIndexes[2]+ "입니다.";
        answer.style.display = 'block';
        result.style.display = 'block';
        result.style.visibility = 'visible';

        // 매개변수에 따른 정답 반응
        if(isYes){
          if(audioIndexes.includes(randomNumber)){
            result.innerHTML = "정답입니다!";
          } else {
            result.innerHTML = "오답입니다.";
          }
        } else {
          if(!audioIndexes.includes(randomNumber)){
            result.innerHTML = "정답입니다!";
          } else {
            result.innerHTML = "오답입니다.";
          }
        }
        yesButton.style.visibility = 'hidden';
        noButton.style.visibility = 'hidden';
        playButton.style.visibility = 'visible';
        audioElements.splice(0);
      }
```

<br/><br/>

+ 기본훈련 시작화면

<img src="https://github.com/gnpark2/NeuroHEAR/assets/55909071/1ef9e56a-fe52-479d-91e2-b4c61431a989" width="400" height="300">

<br/><br/>

+ 기본훈련 시작시 진행화면

<img src="https://github.com/gnpark2/NeuroHEAR/assets/55909071/b53af2f2-eab0-467f-81a5-59e2d85c8594" width="400" height="300">

<br/><br/>

+ 기본훈련 랜덤번호 제시

<img src="https://github.com/gnpark2/NeuroHEAR/assets/55909071/cce07861-ff44-4493-9eb7-7906c19b2783" width="400" height="300">

<br/><br/>

+ 기본훈련 정답선택 및 정답 나열

<img src="https://github.com/gnpark2/NeuroHEAR/assets/55909071/e93f95d2-9792-43f8-90e6-4ac6f7c813a6" width="400" height="300">


***

### 심화훈련

기초 훈련과 같은 형식에 소음을 추가하여 더욱 고도화된 상황속에서 훈련을 할 수 있습니다.

아래 코드는 저희 홈페이지의 소음 훈련 페이지에서 훈련을 wix의 html 코드 요소 추가로 작성한 것의 일부입니다.

```javaScript
      //html의 요소들과 연결
      const numberDisplay = document.getElementById('numberDisplay');
      const notion = document.getElementById('notion');
      const question = document.getElementById('question');
      const playButton = document.getElementById('playButton');
      const yesButton = document.getElementById('yesButton');
      const noButton = document.getElementById('noButton');
      const result = document.getElementById('result');
      const answer = document.getElementById('answer');

      //숫자 음성 파일
      var audioFiles = [
        'https://static.wixstatic.com/mp3/8cecc1_75216b17b77d470b8ac160e238c4cb2a.wav',
        'https://static.wixstatic.com/mp3/8cecc1_93551c75a4204773ad7dd8ccae12f3a9.wav',
        'https://static.wixstatic.com/mp3/8cecc1_810743c4945c4f4f87f15058c32108f7.wav',
        'https://static.wixstatic.com/mp3/8cecc1_d3a9d9993f0145dd931971a5618b7eaa.wav',
        'https://static.wixstatic.com/mp3/8cecc1_3e5b11916bd44a43b4c3f71a312b7977.wav',
        'https://static.wixstatic.com/mp3/8cecc1_98b56d95c79e484894cf221241616047.wav',
        'https://static.wixstatic.com/mp3/8cecc1_46dc3391794b40428c06f024c8bfb6cb.wav',
        'https://static.wixstatic.com/mp3/8cecc1_049c4b8bf3404d52824a1fe63135e25c.wav',
        'https://static.wixstatic.com/mp3/8cecc1_37af5b5bd11a48f5855d00a29aaf28a9.wav',
        'https://static.wixstatic.com/mp3/8cecc1_2c73088560c0496fa0e4c1d527a3b25d.wav'
      ];
      var audioElements = [];

      // 배열을 무작위로 섞는 함수
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      // 시작하기 버튼과 상호작용 함수
      function playAudios() {
        numberDisplay.style.visibility = 'hidden';
        question.style.display = 'none';
        result.style.display = 'none';
        result.style.visibility = 'hidden';
        answer.style.display = 'none';
        playButton.style.visibility = 'hidden';

        notion.innerHTML = "소리가 안들리면 볼륨을 높여주세요.";
        notion.style.display = 'block';

        var shuffledAudio = shuffle([...audioFiles]);
        var selectedIndexes = shuffledAudio.slice(0, 3);

        // 오디오 요소 생성하여 배열에 추가
        selectedIndexes.forEach(audioUrl => {
          var audio = new Audio(audioUrl);
          audioElements.push(audio);
        });

        var delay = 1200; // 1.2초 딜레이
        var index = 0;
        var noiseAudio = new Audio('https://static.wixstatic.com/mp3/8cecc1_9610805c627045259a3e9f9c73b7e06a.wav'); // 노이즈 파일

        // 다음 오디오 재생 함수
        function playNextAudio() {
          if (index < audioElements.length) {
            audioElements[index].play();
            noiseAudio.play();
            index++;
            setTimeout(playNextAudio, delay);
          } else {
            noiseAudio.pause();
            displayNumber();
          }
        }

        // 재생 함수 호출
        playNextAudio();
      }

      // 무작위 숫자 관련 시각화 제어 함수
      function displayNumber(){
        var randomNumber = Math.floor(Math.random() * 10);
        numberDisplay.innerHTML = randomNumber;
        question.innerHTML = "앞서 들린 숫자에 보이는 숫자("+randomNumber+")가 있었나요?";
        notion.style.display = 'none';
        question.style.display = "block";
        numberDisplay.style.visibility = 'visible';
        yesButton.style.visibility = 'visible';
        yesButton.style.display = "block";
        noButton.style.visibility = 'visible';
        noButton.style.display = "block";
        result.style.visibility = 'hidden';
        yesButton.setAttribute("data-random-number", randomNumber);
      }

      // 정답과 반응 제어 함수
      function checkAnswer(isYes){
        var randomNumber = parseInt(yesButton.getAttribute("data-random-number"));
        var audioIndexes = [];
        for (var i = 0; i < 3; i++){
          var audioUrl = audioElements[i].src;
          audioIndexes.push(audioFiles.indexOf(audioUrl));
        }
        answer.innerHTML = "방금 나온 숫자는 : "+ audioIndexes[0]+ ", "+ audioIndexes[1]+", "+audioIndexes[2]+ "입니다.";
        answer.style.display = 'block';
        result.style.display = 'block';
        result.style.visibility = 'visible';

        // 매개변수에 따른 정답 반응
        if(isYes){
          if(audioIndexes.includes(randomNumber)){
            result.innerHTML = "정답입니다!";
          } else {
            result.innerHTML = "오답입니다.";
          }
        } else {
          if(!audioIndexes.includes(randomNumber)){
            result.innerHTML = "정답입니다!";
          } else {
            result.innerHTML = "오답입니다.";
          }
        }
        yesButton.style.visibility = 'hidden';
        noButton.style.visibility = 'hidden';
        playButton.style.visibility = 'visible';
        audioElements.splice(0);
      }
```

<br/><br/>

+ 소음훈련 시작화면

<img src="https://github.com/gnpark2/NeuroHEAR/assets/55909071/e4838427-16d3-4e5a-9b5b-66bc938c7b76" width="400" height="300">

<br/><br/>

+ 소음훈련 시작시 진행화면

<img src="https://github.com/gnpark2/NeuroHEAR/assets/55909071/23cf8af3-2d49-4751-a23e-6724e4511d36" width="400" height="300">

<br/><br/>

+ 소음훈련 랜덤번호 제시

<img src="https://github.com/gnpark2/NeuroHEAR/assets/55909071/b27b4210-a721-4e27-9a80-e4576eb6b09d" width="700" height="300">

<br/><br/>

+ 소음훈련 정답선택 및 정답 나열

<img src="https://github.com/gnpark2/NeuroHEAR/assets/55909071/67e1217e-1563-4439-a103-72b4ce62719e" width="500" height="300">


***

완성한 wix의 사이트 : [NeuroHEAR](https://gnpark2.wixsite.com/my-site-1)
