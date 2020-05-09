const lines = new Array
let lineNum = 0, language, tmpClipboard = ''
$('.context').hide()

console.stdlog = console.log.bind(console);
console.logs = [];
console.log = function () {
    console.logs.push(Array.from(arguments));
    console.stdlog.apply(console, arguments);
}

if (localStorage.getItem('lang')) {
    language = localStorage.getItem('lang')
} else {
    localStorage.setItem('lang', 'en')
    language = localStorage.getItem('lang')
}

const run = () => {
    for (let i = 0; i < $('.line .block').length; i++) {
        blockCode[$('.line .block').eq(i)[0].classList[1]]($($('.line .block').eq(i)[0].getElementsByTagName('input')).val())
    }
}

const save = () => {

}

const deleteLine = (e) => {
    $(`.${e.target.parentNode.classList[0]} .block`).remove()
}

const langs = () => {
    $('.run').text(lang[language.toUpperCase()].run)
    $('.toggleBlock').text(lang[language.toUpperCase()].toggleBlockOpen)
    $('.save').text(lang[language.toUpperCase()].save)
    $('.language option').eq(0).text(lang[language.toUpperCase()].lang.en)
    $('.language option').eq(1).text(lang[language.toUpperCase()].lang.kr)
    $('.darkmodeToggle').text(lang[language.toUpperCase()].toggleDarkmode)

    for (let i = 0; i < $('.bloKategory div').length; i++) {
        for (let j = 0; j < $('.bloKategory').length; j++) {
            $('.bloKategory div').eq(i).html(lang[language.toUpperCase()].blocks[$('.bloKategory').eq(j)[0].classList[1]][$('.bloKategory div').eq(i)[0].classList[1]])
        }
    }
}

const addBlocks = (name, category) => {
    if (typeof $(`.${category}Category`).eq(0)[0] == 'undefined') {
        $('.blocks').append(`<div class="bloKategory ${category}Category"></div>`)
    }
    for (let i in name) {
        $(`.${category}Category`).append(`<div><div class="block ${name[i]}" draggable="true" ondragstart="event.dataTransfer.setData('text/plain', null)" data-function="${name[i]}()"></div></div>`)
    }
}

let blockList
for (const i in Object.keys(lang[language.toUpperCase()].blocks[Object.keys(lang[language.toUpperCase()].blocks)])) {
    blockList = Object.keys(lang[language.toUpperCase()].blocks[Object.keys(lang[language.toUpperCase()].blocks)])
}
addBlocks(blockList, 'test')

const events = () => {
    $('.run').on('click', (e) => {
        run()
    })
    $('.save').on('click', (e) => {
        save()
    })
    $('.line-number').on('click', (e) => {
        deleteLine(e)
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
    $('.block input').on('keydown', (e) => {
        $(e.target).width($('.calcText').text($(e.target).val() + 5).width())
    })
    
    document.addEventListener('contextmenu', (e) => {
        $('.context').hide()
        if (typeof e.target.classList[0] == 'undefined') return
        if (e.target.classList[0] == 'block') {
            $('.context').html(`<div class="item copy">복사</div><div class="item runThis">이 코드만 실행</div><div class="item delThis">이 코드 삭제</div>`)
            $('.delThis').on('click', () => {
                deleteLine(e)
                $('.context').hide()
            })
            $('.runThis').on('click', () => {
                blockCode[e.target.classList[1]]($(`.${e.target.classList[1]} input`).val())
                $('.context').hide()
            })
            $('.copy').on('click', () => {
                tmpClipboard = e.target.classList[1]
                $('.context').hide()
            })
            $('.context').show()
            $('.context').css('left', e.clientX)
            $('.context').css('top', e.clientY)
            e.preventDefault()
        } else if (e.target.classList[0] == 'line') {
            $('.context').html(`<div class="item paste">붙여넣기</div><div class="item delThis">이 라인 삭제</div>`)
            $('.delThis').on('click', () => {
                deleteLine(e)
                $('.context').hide()
            })
            $('.copy').on('click', () => {
                tmpClipboard = e.target.classList[1]
                $('.context').hide()
            })
            $('.paste').on('click', () => {
                $(e.target).append(`<div><div class="block ${tmpClipboard} dragged" draggable="true" ondragstart="event.dataTransfer.setData('text/plain', null)" data-function="${tmpClipboard}()" data-animation="ripple" style="height: 16px; margin-left: 46px;">${lang[language.toUpperCase()].blocks.testCategory[tmpClipboard]}</div></div>`)
                $($(e.target)[0].getElementsByTagName('input')).width($('.calcText').text($($(e.target)[0].getElementsByTagName('input')).val() + 5).width())
                $('.block input').on('keydown', (e) => {
                    $(e.target).width($('.calcText').text($(e.target).val() + 5).width())
                })
                $('.context').hide()
            })
            $('.context').show()
            $('.context').css('left', e.clientX)
            $('.context').css('top', e.clientY)
            e.preventDefault()
        }
    })
    document.addEventListener('click', (e) => {
        if (e.target.parentNode.classList[0] == 'context') return
        $('.context').hide()
    })

}

for (let i = 0; i < document.getElementsByClassName('block').length; i++) {
    document.getElementsByClassName('block')[i].setAttribute('data-animation', 'ripple')
}

for (let i = 0; i < document.getElementsByClassName('block').length; i++) {
    let dragged, clone
    $(document).on('dragstart', (event) => {
        dragged = event.target
        if (dragged.classList[0] != 'block') return
        clone = $(dragged).clone()
        if (dragged.parentNode.classList[0] != 'line') {
            $(event.target.parentNode).append(clone.addClass('hidden'))
        }
        event.target.style.opacity = 0.5
    })
    $(document).on('dragend', (event) => {
        if (dragged.classList[0] != 'block') return
        event.target.classList.add('dragged')
        event.target.style.marginLeft = '46px'
        event.target.style.opacity = ''
    })
    $(document).on('dragover', (event) => {
        if (dragged.classList[0] != 'block') return
        event.preventDefault()
    })
    $(document).on('drop', (event) => {
        if (dragged.classList[0] != 'block') return
        if (event.target.classList[0] == 'blocks' || (event.target.classList[0] == 'block' && event.target.parentNode.parentNode.parentNode.classList[0] == 'blocks')) {
            dragged.parentNode.removeChild(dragged)
            return
        }
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
    $('.block input').width($('.calcText').text($('.block input').val() + 5).width())
    events()
})