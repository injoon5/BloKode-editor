BloKode.block.scripts = {
    start: {
        skeleton: 'event',
        template: '시작',
        func: () => {
            console.log('test')
        },
    },
    log: {
        skeleton: 'basic',
        template: '콘솔에<input value="Hello, world!">로그',
        func: (input) => {
            console.log(input)
        },
    },
    alert: {
        skeleton: 'basic',
        template: '<input value="Hello, world!">경고',
        func: (input) => {
            alert(input)
        },
    },
     newtab: {
        skeleton: 'basic',
        template: '새탭 열기. URL:<input value="about:blank1">',
        func: (input) => {
            
                
                window.open(input);
        }
        },
    },
}
