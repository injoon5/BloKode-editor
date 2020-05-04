(async() => {
    const bloKode = await (await fetch('blokode.html')).text()
    const bloKodeJS = await (await fetch('blokodeVanilla.js')).text()
    document.getElementById('blokode').innerHTML = bloKode
    eval(bloKodeJS)
    tmripple.init()
})()