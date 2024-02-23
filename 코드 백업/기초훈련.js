// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world
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

    // 버튼 클릭 이벤트 핸들링
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

        // 순차적으로 오디오 재생
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
        //숫자 audio 시작
        playNextAudio();
        $w('#yesButton').show();
        $w('#noButton').show();
    });

    // '예' 버튼 클릭 이벤트 핸들링
    $w('#yesButton').onClick(() => {
        const displayedNumber = parseInt($w('#number').text);
        var isCorrect = true;
        for(let j = 0; j < 3; j++){
            if(findIndex[j] == displayedNumber){
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
