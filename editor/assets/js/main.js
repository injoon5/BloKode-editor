const blokode = document.createElement('div')

const parseHTML = (html) => {
    let t = document.createElement('template');
    t.innerHTML = html;
    return t.content.cloneNode(true);
}

const BloKode = {
    components: {
        header: parseHTML('<header><div class="headerInner"><div class="logo"><a href="/">BloKode</a><a href="/new">editor</a></div><button>test</button></div></header>'),
        blockList: parseHTML('<div class="blockList"></div>'),
        playground: parseHTML('<div class="playground"></div>'),
    },
    block: {
        event: (c) => {
            return parseHTML(`<div class="block event">${c}</div>`)
        },
        basic: (c) => {
            return parseHTML(`<div class="block basic">${c}</div>`)
        },
    },
}

blokode.append(BloKode.components.header)
blokode.getElementsByTagName('header')[0].append(BloKode.components.blockList)
blokode.append(BloKode.components.playground)

let playground = blokode.getElementsByClassName('playground')[0],
    blockList = blokode.getElementsByClassName('blockList')[0]

blockList.append(BloKode.block.event('test'))
blockList.append(BloKode.block.basic('test'))
blockList.append(BloKode.block.basic('tes'))

blokode.getElementsByTagName('a')[0].style.fontSize = '2rem'
blokode.getElementsByTagName('a')[1].style.fontSize = '1.8rem'
blokode.getElementsByTagName('a')[0].style.color = '#3C82F4'
blokode.getElementsByTagName('a')[1].style.color = '#000000'
blokode.getElementsByTagName('a')[1].style.marginLeft = '5px'

document.getElementById('blokode').append(blokode)

window.addEventListener('load', () => {
    blokode.getElementsByClassName('playground')[0].style.marginTop = `${blokode.getElementsByTagName('header')[0].clientHeight + 15}px`
})

new Sortable(blockList, {
    group: {
        name: 'shared',
        pull: 'clone',
        put: false
    },
    animation: 150,
    sort: false
})

new Sortable(playground, {
    group: 'shared',
    animation: 150
})