BloKode.block.scripts = {
    start: {
        skeleton: 'event',
        template: 'ㄱㄱ',
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
        template: '<input value="Hello, world!">새탭에서 열기',
        func: (input) => {
            window.open(input);
        },
    },
    custom: {
        skeleton: 'basic',
        template: '<input value="hello">js ',
        func: (input) => {
            input
        },
    },
}
