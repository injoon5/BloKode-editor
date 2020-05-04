const lines = new Array, blocks = new Array

const run = () => {
  for (let i in blocks) {
    blockCode[blocks[i]]()
  }
}

for (let i = 0; i < document.getElementsByClassName('block').length; i++) {
    document.getElementsByClassName('block')[i].setAttribute('data-animation', 'ripple')
}


for (let i = 0; i < document.getElementsByClassName('block').length; i++) {
    let dragged, block, category
    $(document).on('dragstart', (event) => {
        dragged = event.target
        block = event.target.classList[1]
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
        blocks.push(block)
    })
    break
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
    $('.line').height('46px')
    $('.block').height('16px')
    $('.line').eq(0).css('border-radius', '10px 10px 0 0')
    $('.line').eq($('.line').length - 1).css('border-radius', '0 0 10px 10px')
    $('.line-number').eq(0).css('border-radius', '10px 0 0 0')
    $('.line-number').eq($('.line-number').length - 1).css('border-radius', '0 0 0 10px')
    $('.line-number').height('46px')
    $('.line-number').width('46px')
    $('.line-number').on('click', (e) => {
        deleteBlock(Number(e.target.innerText) - 1)
    })
    $('.run').on('click', (e) => {
      run()
    })
})