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
        template: '<input value="Hello, world!">경고',
        func: (input) => {
            window.open(input);
        },
    },
    popup: {
        skeleton: 'basic',
        template: '<input value="Hello, world!">경고',
        func: (input) => {
            window.open(input, '팝업', 'top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no');
        },
    },
}
