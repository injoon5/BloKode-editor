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
    popup: {
        skeleton: 'basic',
        template: '<input value="Hello, world!">경고',
        func: (input) => {
            var name = "popup";
            var option = "width = 500, height = 500, top = 100, left = 200, location = no"
            window.open(input, name, option);
        },
    },
}
