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

+ error 표기


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

아래 코드는 저희 홈페이지의 기본 훈련 페이지에서 wix의 개발자 모드를 통해 js코드로 작성한 것의 일부입니다.

```javaScript
$w.onReady(function () {
    $w('#number').hide();
    $w('#result').hide();
    $w('#answer').hide();

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
        'https://static.wixstatic.com/mp3/8cecc1_2c73088560c0496fa0e4c1d527a3b25d.wav',
    ];

    const findIndex = new Array();

    // play버튼 클릭 이벤트 핸들링
    $w('#playButton').onClick(() => {
        $w('#playButton').hide();
        $w('#number').hide();
        $w('#result').hide();
        $w('#answer').hide();
        const shuffledAudioFiles = shuffle(audioFiles).slice(0, 3);

        audioFiles = [
            'https://static.wixstatic.com/mp3/8cecc1_75216b17b77d470b8ac160e238c4cb2a.wav',
            'https://static.wixstatic.com/mp3/8cecc1_93551c75a4204773ad7dd8ccae12f3a9.wav',
            'https://static.wixstatic.com/mp3/8cecc1_810743c4945c4f4f87f15058c32108f7.wav',
            'https://static.wixstatic.com/mp3/8cecc1_d3a9d9993f0145dd931971a5618b7eaa.wav',
            'https://static.wixstatic.com/mp3/8cecc1_3e5b11916bd44a43b4c3f71a312b7977.wav',
            'https://static.wixstatic.com/mp3/8cecc1_98b56d95c79e484894cf221241616047.wav',
            'https://static.wixstatic.com/mp3/8cecc1_46dc3391794b40428c06f024c8bfb6cb.wav',
            'https://static.wixstatic.com/mp3/8cecc1_049c4b8bf3404d52824a1fe63135e25c.wav',
            'https://static.wixstatic.com/mp3/8cecc1_37af5b5bd11a48f5855d00a29aaf28a9.wav',
            'https://static.wixstatic.com/mp3/8cecc1_2c73088560c0496fa0e4c1d527a3b25d.wav',
        ];

        for(let i = 0; i < 3; i++){
        findIndex[i] = audioFiles.indexOf(shuffledAudioFiles[i]);
        }

        const answer = findIndex.join();

        $w('#answer').text = answer;

        console.log(shuffledAudioFiles);
        console.log(findIndex);
        console.log(audioFiles);
        console.log($w('#audioPlayer1').src);
        console.log($w('#audioPlayer2').src);
        console.log($w('#audioPlayer3').src);

        // 오디오 재생 지연 시간 설정 (1.2초 간격)
        const delay = 1200;

        // 오디오 재생 함수
        let index = 0;
        function playNextAudio() {
            if (index < shuffledAudioFiles.length) {
                const selectedAudio = shuffledAudioFiles[index];
                setTimeout(() => {
                    $w(`#audioPlayer${index + 1}`).src = selectedAudio;
                    $w(`#audioPlayer${index + 1}`).play();
                    index++;
                    playNextAudio();
                }, delay);
            } else {
                // 모든 오디오 재생이 완료된 후에 사용자에게 보여지는 숫자 생성
                const randomNumber = Math.floor(Math.random() * 10);
                $w('#number').text = randomNumber.toString();

                setTimeout(() =>{
                    $w('#number').show();
                    $w('#audioPlayer3').stop();
                }, delay);
            }
        }
        // 재생 함수 호출
        playNextAudio();
        // audio 재생 완료 후 버튼 나타냄
        $w('#yesButton').show();
        $w('#noButton').show();
    });

    // '예' 버튼 클릭 이벤트 핸들링
    $w('#yesButton').onClick(() => {
        const displayedNumber = parseInt($w('#number').text);
        var isCorrect = true;
        for(let j = 0; j < 3; j++){
            if(findIndex[j] == displayedNumber){
                // 보여지는 숫자와 재생된 숫자가 같을 경우 stop
                isCorrect = true;
                break;
            } else {
                isCorrect = false;
            }
        }
        if (isCorrect) {
            $w('#result').text = '정답입니다!';
        } else {
            $w('#result').text = '오답입니다.';
        }
        $w('#yesButton').hide();
        $w('#noButton').hide();
        $w('#answer').show();
        $w('#playButton').show();
        $w('#result').show();
    });

    // '아니오' 버튼 클릭 이벤트 핸들링
    $w('#noButton').onClick(() => {
        const displayedNumber = parseInt($w('#number').text);
        var isCorrect = true;
        for(let j = 0; j < 3; j++){
            if(findIndex[j] == displayedNumber){
                // 보여지는 숫자와 재생된 숫자가 같을 경우 stop
                isCorrect = true;
                break;
            } else {
                isCorrect = false;
            }
        }
        if (!isCorrect) {
            $w('#result').text = '정답입니다!';
        } else {
            $w('#result').text = '오답입니다.';
        }
        $w('#yesButton').hide();
        $w('#noButton').hide();
        $w('#answer').show();
        $w('#playButton').show();
        $w('#result').show();
    });
});

// 배열을 무작위로 섞는 함수
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

```

<br/>
+ 기본훈련 시작화면


<img src="https://github.com/gnpark2/NeuroHEAR/assets/55909071/e4bcea9a-08d2-4923-95da-b8fe14505887" width="400" height="300">

<br/>
+ 기본훈련 랜덤번호 제시


<img src="https://github.com/gnpark2/NeuroHEAR/assets/55909071/6e468596-c7c8-47f5-ab4f-00161b73fd3b" width="400" height="300">

<br/>
+ 기본훈련 정답선택 및 정답 나열


<img src="https://github.com/gnpark2/NeuroHEAR/assets/55909071/4cb91015-848f-4984-8e9e-468b6505e540" width="400" height="300">


***

### 심화훈련

기초 훈련과 같은 형식에 소음을 추가하여 더욱 고도화된 상황속에서 훈련을 할 수 있습니다.

아래 코드는 저희 홈페이지의 소음 훈련 페이지에서 훈련을 wix의 html 코드 요소 추가로 작성한 것의 일부입니다.

```javaScript
const numberDisplay = document.getElementById('numberDisplay');
      const playButton = document.getElementById('playButton');
      const yesButton = document.getElementById('yesButton');
      const noButton = document.getElementById('noButton');
      const result = document.getElementById('result');
      const answer = document.getElementById('answer');

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

      function playAudios() {
        numberDisplay.style.visibility = 'hidden';
        result.style.display = 'none';
        result.style.visibility = 'hidden';
        answer.style.display = 'none';
        playButton.style.visibility = 'hidden';

        var shuffledAudio = shuffle([...audioFiles]);
        var selectedIndexes = shuffledAudio.slice(0, 3);

        // 오디오 요소 생성하여 배열에 추가
        selectedIndexes.forEach(audioUrl => {
          var audio = new Audio(audioUrl);
          audioElements.push(audio);
        });

        var delay = 1200; // 1.2초 딜레이
        var index = 0;
        var noiseAudio = new Audio('https://static.wixstatic.com/mp3/8cecc1_9610805c627045259a3e9f9c73b7e06a.wav'); // noise 파일 불러오기

        // 재생 함수 호출
        playNextAudio();

        // 오디오 재생 함수
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
      }

      // 무작위 숫자 관련 시각화 제어 함수
      function displayNumber(){
        var randomNumber = Math.floor(Math.random() * 10);
        numberDisplay.innerHTML = randomNumber;
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

<br/>
+ 소음훈련 시작화면


<img src="https://github.com/gnpark2/NeuroHEAR/assets/55909071/06c9feac-2ce2-4528-81db-152e1e281000" width="400" height="300">

<br/>
+ 소음훈련 랜덤번호 제시


<img src="https://github.com/gnpark2/NeuroHEAR/assets/55909071/51673a22-4669-417b-a393-69a087d90939" width="700" height="300">

<br/>
+ 소음훈련 정답선택 및 정답 나열


<img src="https://github.com/gnpark2/NeuroHEAR/assets/55909071/6ffaece5-6c0a-46d4-a3b4-029d6645cf42" width="500" height="300">


***

완성한 wix의 사이트 : (링크)
