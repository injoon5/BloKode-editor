const lines = new Array
let lineNum = 0, language

if (localStorage.getItem('lang')) {
    language = localStorage.getItem('lang')
} else {
    localStorage.setItem('lang', 'en')
    language = localStorage.getItem('lang')
}

const run = () => {
    for (let i = 0; i < $('.line .block').length; i++) {
        blockCode[$('.line .block').eq(i)[0].classList[1]]()
    }
}

const langs = () => {
    $('.run').text(lang[language.toUpperCase()].run)
    $('.toggleBlock').text(lang[language.toUpperCase()].toggleBlockOpen)
    $('.language option').eq(0).text(lang[language.toUpperCase()].lang.en)
    $('.language option').eq(1).text(lang[language.toUpperCase()].lang.kr)
}

const clickEvents = () => {
    $('.run').on('click', (e) => {
        run()
    })
    $('.line-number').on('click', (e) => {
        deleteLine()
    })
    $('.toggleBlock').on('click', (e) => {
        if (e.target.classList[1]) {
            $('.blocks').eq(0)[0].classList.add('hidden')
            e.target.classList.remove('red')
            e.target.innerHTML = lang[language.toUpperCase()].toggleBlockOpen
        } else {
            $('.blocks').eq(0)[0].classList.remove('hidden')
            e.target.classList.add('red')
            e.target.innerHTML = lang[language.toUpperCase()].toggleBlockClose
        }
    })
}

for (let i = 0; i < document.getElementsByClassName('block').length; i++) {
    document.getElementsByClassName('block')[i].setAttribute('data-animation', 'ripple')
}

for (let i = 0; i < document.getElementsByClassName('block').length; i++) {
    let dragged, clone
    $(document).on('dragstart', (event) => {
        dragged = event.target
        clone = $(dragged).clone()
        if (dragged.parentNode.classList[0] != 'line') {
            $(event.target.parentNode).append(clone.addClass('hidden'))
        }
        event.target.style.opacity = 0.5
    })
    $(document).on('dragend', (event) => {
        event.target.classList.add('dragged')
        event.target.style.marginLeft = '46px'
        event.target.style.opacity = ''
    })
    $(document).on('dragover', (event) => {
        event.preventDefault()
    })
    $(document).on('drop', (event) => {
        event.preventDefault()
        if (event.target.className == 'line') {
            dragged.parentNode.removeChild(dragged)
            event.target.appendChild(dragged)
        }
        if (dragged.parentNode.classList[0] != 'line') {
            $(event.target.parentNode).append(clone.addClass('hidden'))
        } else {
            clone.removeClass('hidden')
        }
    })
    break
}

$(window).on('scroll', () => {
    let scrollHeight = $(document).height()
    let scrollPosition = $(window).height() + $(window).scrollTop()
    if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
        console.log('test')
        $('.line').eq(lineNum).css('border-radius', '0')
        for (let i = 0; i < 50; i++) {
            $('.playground').append(`<div class="line"></div>`)
        }
        for (let i = lineNum; i < $('.line').length; i++) {
            lines.push(false)
            $('.line').eq(i).append(`<div class='line-number'>${Number(i) + 1}</div>`)

            if (i % 2 == 0) {
                $('.line').eq(i).css('background-color', '#eee')
                $('.line-number').eq(i).css('background-color', '#fff')
            } else {
                $('.line').eq(i).css('background-color', '#fff')
                $('.line-number').eq(i).css('background-color', '#eee')
            }
            lineNum++
        }
        $('.line-number').eq(lineNum).css('border-radius', '0 0 0 10px')
        $('.line').height('46px')
        $('.line-number').height('46px')
        $('.line-number').width('46px')
    }
})

$(document).on('click', () => {
    $('.playground').attr('style', `top: ${$('.sidePanel').height() + 10}px`)
})

$('.language').on('change', (e) => {
    localStorage.setItem('lang', e.target.value)
    window.location.reload()
})

$(() => {
    langs()
    for (let i = 0; i < 50; i++) {
        $('.playground').append(`<div class="line"></div>`)
    }
    for (let i = 0; i < $('.line').length; i++) {
        lines.push(false)
        $('.line').eq(i).append(`<div class='line-number'>${Number(i) + 1}</div>`)

        if (i % 2 == 0) {
            $('.line').eq(i).css('background-color', '#eee')
            $('.line-number').eq(i).css('background-color', '#fff')
        } else {
            $('.line').eq(i).css('background-color', '#fff')
            $('.line-number').eq(i).css('background-color', '#eee')
        }
        lineNum++
    }
    $('.line').height('46px')
    $('.block').height('16px')
    $('.line').eq(0).css('border-radius', '10px 10px 0 0')
    $('.line').eq(lineNum).css('border-radius', '0 0 10px 10px')
    $('.line-number').eq(0).css('border-radius', '10px 0 0 0')
    $('.line-number').eq(lineNum).css('border-radius', '0 0 0 10px')
    $('.line-number').height('46px')
    $('.line-number').width('46px')
    $('.playground').attr('style', `top: ${$('.sidePanel').height() + 10}px`)
    $('.language').height($('.run').eq(0)[0].clientHeight)
    $(`.language .${localStorage.getItem('lang')}`).attr('selected', 'true')
    clickEvents()
})