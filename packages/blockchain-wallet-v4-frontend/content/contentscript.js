const injected = chrome.runtime.getURL('injected.js');
const script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', injected);
document.body.appendChild(script);

const connect = chrome.runtime.connect(null, {name: "test"});

connect.onMessage.addListener(function(message){
    console.log("messageFromExtension", message)
})

connect.postMessage({
    msg: 'hello from site'
});
