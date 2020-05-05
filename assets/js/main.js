(async() => {
    const bloKode = await (await fetch('blokode.html')).text()
    const bloKodeJS = await (await fetch('assets/js/blokode.js')).text()
    const bloKodeBlock = await (await fetch('assets/js/blocks.js')).text()
    document.getElementById('blokode').innerHTML = bloKode
    eval(`${bloKodeJS}\n${bloKodeBlock}`)
    tmripple.init()
})()