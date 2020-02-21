let appId = 'abc';
const button = document.querySelector('button');

function add(n1: number, n2: number, /*n3: number*/) {
    if (n1 + n2 > 0) {
        return n1 + n2;
    }
    return; // here we have to return undefined
}

function clickHandler(message: string) {
    // let userName = 'Max';
    console.log('Clicked! ' + message);
}
// a comment
if (button) {
    button.addEventListener('click', clickHandler.bind(null, "You're welcome"));
}
