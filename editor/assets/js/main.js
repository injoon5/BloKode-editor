const blokode = document.createElement('div')

const parseHTML = (html) => {
    let t = document.createElement('template');
    t.innerHTML = html;
    return t.content.cloneNode(true);
}

console.stdlog = console.log.bind(console)
console.stderror = console.error.bind(console)
console.stdinfo = console.info.bind(console)
console.stdwarn = console.warn.bind(console)
console.logs = []
console.log = function () {
    console.logs.push(`log|${(new Date()).timeNow()} | ${Array.from(arguments)}`)
    console.stdlog.apply(console, arguments)
}
console.error = function () {
    console.logs.push(`error|${(new Date()).timeNow()} | ${Array.from(arguments)}`)
    console.stderror.apply(console, arguments)
}
console.info = function () {
    console.logs.push(`info|${(new Date()).timeNow()} | ${Array.from(arguments)}`)
    console.stdinfo.apply(console, arguments)
}
console.warn = function () {
    console.logs.push(`warn|${(new Date()).timeNow()} | ${Array.from(arguments)}`)
    console.stdwarn.apply(console, arguments)
}


Date.prototype.timeNow = function () {
    return `${((this.getHours() < 10) ? '0' : '') + this.getHours()}:${((this.getMinutes() < 10) ? '0' : '') + this.getMinutes()}:${((this.getSeconds() < 10) ? '0' : '') + this.getSeconds()}`
}

const BloKode = {
    components: {
        header: parseHTML('<header><div class="headerInner"><div class="logo"><a href="/">BloKode</a><a href="/editor">editor</a></div><button class="run">실행</button><button class="showConsole">콘솔 보기</button></div></header>'),
        blockList: parseHTML('<div class="blockList"></div>'),
        playground: parseHTML('<div class="playground"></div>'),
        context: parseHTML('<div class="context"></div>'),
        console: parseHTML('<div class="console"></div><div class="dim"></div>'),
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

const showConsole = () => {
    let consoleElement = blokode.getElementsByClassName('console')[0]
    consoleElement.innerHTML = '<div class="title">콘솔</div>'
    consoleElement.style.display = 'flex'
    blokode.getElementsByClassName('dim')[0].style.display = 'flex'
    for (const i in console.logs) {
        let content = console.logs[i].split('|')
        let type = content.shift()
        consoleElement.append(parseHTML(`<div class="${type}">${content.join('|')}</div>`))
    }
}

blokode.append(BloKode.components.header)
blokode.getElementsByTagName('header')[0].append(BloKode.components.blockList)
blokode.append(BloKode.components.playground)

let playground = blokode.getElementsByClassName('playground')[0],
    blockList = blokode.getElementsByClassName('blockList')[0],
    tmpClipboard = '';

(async () => {
    eval(await (await fetch('/editor/assets/js/blocks.js')).text())

    for (const i in BloKode.block.scripts) {
        blockList.append(BloKode.block[BloKode.block.scripts[i].skeleton](i))
    }

    blokode.getElementsByClassName('playground')[0].style.marginTop = `${blokode.getElementsByTagName('header')[0].clientHeight + 15}px`
    blokode.getElementsByClassName('playground')[0].style.height = `calc(100vh - ${blokode.getElementsByTagName('header')[0].clientHeight + 15}px)`

    blokode.append(BloKode.components.console)
    blokode.append(BloKode.components.context)
    blokode.getElementsByClassName('console')[0].style.display = 'none'
    blokode.getElementsByClassName('dim')[0].style.display = 'none'
    blokode.getElementsByClassName('context')[0].style.display = 'none'

    blokode.getElementsByClassName('dim')[0].addEventListener('click', () => {
        blokode.getElementsByClassName('console')[0].style.display = 'none'
        blokode.getElementsByClassName('dim')[0].style.display = 'none'
        blokode.getElementsByClassName('context')[0].style.display = 'none'
    })

    document.addEventListener('contextmenu', (e) => {
        if (typeof e.target.classList[0] == 'undefined') return
        if (e.target.classList[0] == 'block' && e.target.parentNode.classList[0] != 'blocks' && e.target.parentNode.classList[0] != 'playground') {
            blokode.getElementsByClassName('context')[0].innerHTML = '<div class="copy">복사</div><div class="runThis">이 코드 실행</div>'
            blokode.getElementsByClassName('context')[0].style.display = 'flex'
            blokode.getElementsByClassName('context')[0].style.left = `${e.clientX}px`
            blokode.getElementsByClassName('context')[0].style.top = `${e.clientY}px`

            blokode.getElementsByClassName('context')[0].getElementsByClassName('copy')[0].addEventListener('click', () => {
                tmpClipboard = e.target.classList[2]
            })
            blokode.getElementsByClassName('context')[0].getElementsByClassName('runThis')[0].addEventListener('click', () => {
                BloKode.block.scripts[e.target.classList[2]].func(e.target.getElementsByTagName('input')[0].value)
            })
        } else if (e.target.parentNode.classList[0] == 'blocks' || e.target.parentNode.classList[0] == 'playground') {
            blokode.getElementsByClassName('context')[0].innerHTML = '<div class="copy">복사</div><div class="delThis">삭제</div><div class="runThis">이 코드 실행</div>'
            blokode.getElementsByClassName('context')[0].style.display = 'flex'
            blokode.getElementsByClassName('context')[0].style.left = `${e.clientX}px`
            blokode.getElementsByClassName('context')[0].style.top = `${e.clientY}px`

            blokode.getElementsByClassName('context')[0].getElementsByClassName('copy')[0].addEventListener('click', () => {
                tmpClipboard = e.target.classList[2]
            })
            blokode.getElementsByClassName('context')[0].getElementsByClassName('runThis')[0].addEventListener('click', () => {
                BloKode.block.scripts[e.target.classList[2]].func(e.target.getElementsByTagName('input')[0].value)
            })
            blokode.getElementsByClassName('context')[0].getElementsByClassName('delThis')[0].addEventListener('click', () => {
                e.target.remove()
            })
        } else if (e.target.classList[0] == 'playground') {
            blokode.getElementsByClassName('context')[0].innerHTML = '<div class="copy">복사</div><div class="del">모두 삭제</div><div class="runAll">실행</div>'
            blokode.getElementsByClassName('context')[0].style.display = 'flex'
            blokode.getElementsByClassName('context')[0].style.left = `${e.clientX}px`
            blokode.getElementsByClassName('context')[0].style.top = `${e.clientY}px`

            blokode.getElementsByClassName('context')[0].getElementsByClassName('copy')[0].addEventListener('click', () => {
                tmpClipboard = e.target.classList[2]
            })
            blokode.getElementsByClassName('context')[0].getElementsByClassName('runAll')[0].addEventListener('click', () => {
                for (let i = 0; i < playground.getElementsByClassName('event').length; i++) {
                    for (let j = 0; j < playground.getElementsByClassName('event')[i].getElementsByClassName('blocks')[0].getElementsByClassName('block').length; j++) {
                        BloKode.block.scripts[playground.getElementsByClassName('event')[i].getElementsByClassName('blocks')[0].getElementsByClassName('block')[j].classList[2]].func(playground.getElementsByClassName('event')[i].getElementsByClassName('blocks')[0].getElementsByClassName('block')[j].getElementsByTagName('input')[0].value)
                    }
                }
            })
            blokode.getElementsByClassName('context')[0].getElementsByClassName('del')[0].addEventListener('click', () => {
                e.target.innerHTML = ''
            })
        }
        e.preventDefault()
    })
    document.addEventListener('click', () => {
        blokode.getElementsByClassName('context')[0].style.display = 'none'
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

blokode.getElementsByClassName('showConsole')[0].addEventListener('click', () => {
    showConsole()
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