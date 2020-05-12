const blokode = document.createElement('div')

const parseHTML = (html) => {
    let t = document.createElement('template');
    t.innerHTML = html;
    return t.content.cloneNode(true);
}

const BloKode = {
    components: {
        header: parseHTML('<header><div class="headerInner"><div class="logo"><a href="/">BloKode</a><a href="/editor">editor</a></div><button class="run">실행</button></div></header>'),
        blockList: parseHTML('<div class="blockList"></div>'),
        playground: parseHTML('<div class="playground"></div>'),
        context: parseHTML('<div class="context"></div>'),
    },
    block: {
        event: (c) => {
            return parseHTML(`<div class="block event ${c}">${BloKode.block.scripts[c].template}<div class="blocks"></div></div>`)
        },
        basic: (c) => {
            return parseHTML(`<div class="block basic ${c}">${BloKode.block.scripts[c].template}</div>`)
        },
    },
}

blokode.append(BloKode.components.header)
blokode.getElementsByTagName('header')[0].append(BloKode.components.blockList)
blokode.append(BloKode.components.playground)

let playground = blokode.getElementsByClassName('playground')[0],
    blockList = blokode.getElementsByClassName('blockList')[0];

(async () => {
    eval(await (await fetch('/editor/assets/js/blocks.js')).text())

    blockList.append(BloKode.block.event('start'))
    blockList.append(BloKode.block.basic('log'))

    blokode.getElementsByClassName('playground')[0].style.marginTop = `${blokode.getElementsByTagName('header')[0].clientHeight + 15}px`
    blokode.getElementsByClassName('playground')[0].style.height = `calc(100vh - ${blokode.getElementsByTagName('header')[0].clientHeight + 15}px)`

    for (let i = 0; i < blokode.getElementsByClassName('block').length; i++) {
        blokode.getElementsByClassName('block')[i].addEventListener('contextmenu', (e) => {
            e.preventDefault()
            blokode.append(BloKode.components.context)
            blokode.getElementsByClassName('context')[0].style.left = `${e.clientX}px`
            blokode.getElementsByClassName('context')[0].style.top = `${e.clientY}px`
        })
    }
    document.querySelectorAll('div').forEach((el) => {
        el.addEventListener('click', () => {
            console.log(el)
        })
    })
})()

blokode.getElementsByTagName('a')[0].style.fontSize = '2rem'
blokode.getElementsByTagName('a')[1].style.fontSize = '1.8rem'
blokode.getElementsByTagName('a')[0].style.color = '#3C82F4'
blokode.getElementsByTagName('a')[1].style.color = '#000000'
blokode.getElementsByTagName('a')[1].style.marginLeft = '5px'

playground.append(parseHTML('<div class="noblock"><div class="title">아직 블록이 없어요!</div><div class="content">상단에 있는 초록색 이벤트 블록을 끌어와 시작해보세요.</div></div>'))

document.getElementById('blokode').append(blokode)


blokode.getElementsByClassName('run')[0].addEventListener('click', () => {
    for (let i = 0; i < playground.getElementsByClassName('event').length; i++) {
        for (let j = 0; j < playground.getElementsByClassName('event')[i].getElementsByClassName('blocks')[0].getElementsByClassName('block').length; j++) {
            BloKode.block.scripts[playground.getElementsByClassName('event')[i].getElementsByClassName('blocks')[0].getElementsByClassName('block')[j].classList[2]].func(playground.getElementsByClassName('event')[i].getElementsByClassName('blocks')[0].getElementsByClassName('block')[j].getElementsByTagName('input')[0].value)
        }
    }
})

new Sortable(blockList, {
    group: {
        name: 'shared',
        pull: 'clone',
        put: false
    },
    onStart: (e) => {
        if (typeof blokode.getElementsByClassName('noblock')[0] != 'undefined') {
            blokode.getElementsByClassName('noblock')[0].remove()
        }
    },
    animation: 150,
    sort: false
})

new Sortable(playground, {
    group: 'shared',
    animation: 150,
    onAdd: (e) => {
        if (e.clone.classList[1] != 'event') {
            e.item.remove()
            return
        }

        let target

        for (const i in blokode.getElementsByClassName('event')) {
            if (blokode.getElementsByClassName('event')[i] == e.item) {
                target = blokode.getElementsByClassName('event')[i]
                break
            }
        }

        new Sortable(target.getElementsByClassName('blocks')[0], {
            group: 'shared',
            onAdd: (e) => {
                if (e.clone.classList[1] == 'event') {
                    e.item.remove()
                    return
                }
            }
        })
    },
})