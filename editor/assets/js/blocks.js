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
     popup: {
        skeleton: 'basic',
        template: '팝업창 열기. URL:<input value="about:blank"> 제목:<title value="Hello, world!">',
        func: (input) => {
            function popup(){
            var url = input;
            var name = title;
            var option = "width = 500, height = 500, top = 100, left = 200, location = no"
            window.open(url, name, option);
        }
        },
    },
}
