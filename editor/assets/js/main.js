(async() => {
    const lang = new Object
    const kr = await (await fetch('lang/kr.js')).text()
    const en = await (await fetch('lang/en.js')).text()
    eval(`${kr}\n${en}`)
    const bloKode = await (await fetch('blokode.html')).text()
    const bloKodeJS = await (await fetch('assets/js/blokode.js')).text()
    const bloKodeBlock = await (await fetch('assets/js/blocks.js')).text()
    document.getElementById('blokode').innerHTML = bloKode
    eval(`${bloKodeJS}\n${bloKodeBlock}`)
    tmripple.init()
})()