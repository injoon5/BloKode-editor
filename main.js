(async() => {
    const bloKode = await (await fetch('blokode.html')).text()
    const bloKodeJS = await (await fetch('blokode.js')).text()
    const bloKodeBlock = await (await fetch('blocks.js')).text()
    document.getElementById('blokode').innerHTML = bloKode
    eval(`${bloKodeJS}\n${bloKodeBlock}`)
    tmripple.init()
})()