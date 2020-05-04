const lines = new Array


for (let i = 0; i < document.getElementsByClassName('block').length; i++) {
    document.getElementsByClassName('block')[i].setAttribute('data-animation', 'ripple')
}


for (let i = 0; i < document.getElementsByClassName('block').length; i++) {
    let dragged, color
    $(document).on('dragstart', (event) => {
        dragged = event.target
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
    })
}

$(() => {
    for (let i = 0; i < $('.line').length; i++) {
        lines.push(false)
        $('.line').eq(i).append(`<div class="line-number">${Number(i) + 1}</div>`)
        
        if (i % 2 == 0) {
            $('.line').eq(i).css('background-color', '#eee')
            $('.line-number').eq(i).css('background-color', '#fff')
        } else {
            $('.line').eq(i).css('background-color', '#fff')
            $('.line-number').eq(i).css('background-color', '#eee')
        }
    }
    $('.line').height($('.blocks .bloKategory div').eq(0).innerHeight())
    $('.blocks .bloKategory div').height($('.blocks .bloKategory div').eq(0).height())
    $('.line').eq(0).css('border-radius', '10px 10px 0 0')
    $('.line').eq($('.line').length - 1).css('border-radius', '0 0 10px 10px')
    $('.line-number').eq(0).css('border-radius', '10px 0 0 0')
    $('.line-number').eq($('.line-number').length - 1).css('border-radius', '0 0 0 10px')
    $('.line-number').height($('.blocks .bloKategory div').eq(0).innerHeight())
    $('.line-number').width($('.blocks .bloKategory div').eq(0).innerHeight())
    $('.line-number').on('click', (e) => {
        deleteBlock(Number(e.target.innerText) - 1)
    })
})