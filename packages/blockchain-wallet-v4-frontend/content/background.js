chrome.runtime.onConnect.addListener(function (port) {
    console.log('connected to: ', port);
  
    port.postMessage({
      msg: 'hello from popup'
    });

    port.onMessage.addListener(function(message){
        console.log("messageFromSite", message)
    })
  });
