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
        template: '콘솔에<input placeholder="Hello, world!">로그',
        func: (input) => {
            console.log(input)
        },
    },
}