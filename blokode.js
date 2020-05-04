/*
    BloKode :
    왜 만든건지 모르겠는 블록코딩 사이트이빈다.
    매우를 넘어서 너무 지나치게 코드가 심플(?)하빈다.
    https://blokode.thoratica.tech

    기본적인 코드 정리는 blokode_copy.js 를 참고하세요.
*/

const lines = new Array

// 클릭 했을 떄 퍼지는 효과 비슷한거 나는거 (touchmyripple)
$('.block').attr('data-animation', 'ripple')

// jQuery UI 코드
$('.block').draggable({
    stop: (e) => {
        autoMatch(e)
    }
})
$('.block').on('mousedown', (e) => {
    for (let i in lines) {
        lines[i] = false
    }
})

//  어떻게 하지...?
//  https://blokode.thoratica.tech 들어가보시면 뭔가 될 것 같으면서 안됩니다.
//  (콘솔 로그) (컨트롤 누르고 누르시면 열리는ㄷ) (저는 Alt..) (앗) (저는 커맨드)
//  처음엔 돼서 희망을 주다가
//  순서를 바꾸면 이상하게 꼬여버립니다.
const autoMatch = (e) => {
    for (let i in lines) {
        for (let j = 0; j < $('.block').length; j++) {
            if ($('.block').eq(j).offset().top == $('.line').eq(i).offset().top) {
                lines[i] = $('.block').attr('class').split(' ')[0]
            }
        }

        // .block의 clientY <= i번쨰 .line 엘리먼트의 top + 54 && clientY >= i번째 .line 일레먼트의 top
        if (e.clientY <= $('.line').eq(i).offset().top + 54 && e.clientY >= $('.line').eq(i).offset().top) {
            // 해당 라인에 이미 코드가 있으면 원래 자리로 되돌려놓음(?)
            if (lines[i]) return $(`.${e.target.classList[0]}`).eq(0).offset({ top: 'unset', left: 'unset' })

            // 라인에 놨으면 블록의 top을 line의 top과 맞추고, 블록의 left를 line의 left + 54(54px은 .line-number의 너비)에 맞추는거
            $(`.${e.target.classList[0]}`).eq(0).offset({ top: $('.line').eq(i).offset().top, left: $('.line').eq(i).offset().left + 54 })
            // lines를 .block에 있는 class들 중 1번째(0번째) 불러오기
            lines[i] = e.target.classList[0]
            console.log(lines)
        }
    }
}

/*
<div class="blocks">
    <div class="bloKategory testCategory">
        <div class="annyonghasalbup" data-function="hello()">안녕하살법!</div>
        <div class="test" data-function="test()">test</div>
    </div>
</div>

이렇게 할 예정이빈다.
*/

/* 이제 안 쓸 예정
setInterval(() => {
    for (let i = 0; i < $('.line').length; i++) {
        for (let j = 0; j < $('.block').length; j++) {
            if ($('.block').eq(j).offset().top != $('.line').eq(j).offset().top) {
                lines[i] = false
            }
        }
    }
}, 100)*/

//라인 번호 클릭하면 해당 라인에 있는 코드 삭제
const deleteBlock = (num) => {
    lines[num] = false
    for (let i = 0; i < $('.block').length; i++) {
        if ($('.block').eq(i).offset().top == $('.line').eq(num).offset().top) {
            $(`.block`).eq(i).offset({ top: 0, left: 0 })
        }
    }
}

// .consoleLogLines (button) 눌렀을 때
$('.consoleLogLines').on('click', () => {
    // lines 로그
    console.log(lines)
})

// 건들 필요 없음
$(() => {
    // .line 엘리먼트 수(9개)만큼 반복
    for (let i = 0; i < $('.line').length; i++) {
        // lines에 false로 항목 만들기(.line 엘리먼트 수(9개)만큼 추가)
        lines.push(false)
        // 라인 넘버 표시하기
        $('.line').eq(i).append(`<div class="line-number">${Number(i) + 1}</div>`)

        // 홀짝 구별
        if (i % 2 == 0) {
            // 짝수 줄은 배경 #eee, 라인 배경 #fff
            $('.line').eq(i).css('background-color', '#eee')
            $('.line-number').eq(i).css('background-color', '#fff')
        } else {
            // 홀수 줄은 반대
            $('.line').eq(i).css('background-color', '#fff')
            $('.line-number').eq(i).css('background-color', '#eee')
        }
    }
    // 라인 높이는 블록 높이랑 똑같이
    $('.line').height($('.block').eq(0).innerHeight())
    // 블록 높이는 블록들 중 첫 번째 블록이랑 똑같이
    $('.block').height($('.block').eq(0).height())
    // 맨 위에 있는 라인은 윗부분 꼭짓점 둥글게
    $('.line').eq(0).css('border-radius', '10px 10px 0 0')
    // 맨 아래에 있는 라인은 아랫부분 꼭짓점 둥글게
    $('.line').eq($('.line').length - 1).css('border-radius', '0 0 10px 10px')
    // 맨 위 라인 넘버는 윗부분 왼쪽 둥글게
    $('.line-number').eq(0).css('border-radius', '10px 0 0 0')
    // 맨 아래 라인 넘버는 아랫부분 왼쪽 둥글게
    $('.line-number').eq($('.line-number').length - 1).css('border-radius', '0 0 0 10px')

    // 라인 넘버 높이는 블록 높이(=라인 높이)랑 똑같이
    $('.line-number').height($('.block').eq(0).innerHeight())
    // 라인 넘버 너비도 높이랑 똑같이(정사각형으로)
    $('.line-number').width($('.block').eq(0).innerHeight())
    // 라인 넘버 클릭했을 때
    $('.line-number').on('click', (e) => {
        // 해당 라인에 있는 블록 삭제
        deleteBlock(Number(e.target.innerText) - 1)
    })
}) // 이상 건들 필요 없는 코드들 주석.