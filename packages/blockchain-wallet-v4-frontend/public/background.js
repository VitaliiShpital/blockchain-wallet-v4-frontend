// chrome.runtime.onInstalled.addListener(function() {
//     chrome.tabs.create({ url: chrome.runtime.getURL('https://login.blockchain.com/signup') });
// });

chrome.runtime.onMessageExternal.addListener(
  function(data, sender, sendResponse) {
    const popupURL = chrome.runtime.getURL('index.html/#/loader')

    let createdTabId;
    chrome.tabs.create({ url: popupURL }, function(tab){
      createdTabId = tab.id
    });

    chrome.tabs.onUpdated.addListener(function (tabId, info) {
      if (createdTabId === tabId && info.status === 'complete') {
        chrome.tabs.sendMessage(tabId, {greeting: "hello"}, function(){});
      }
    })
  });
