// Extension start
console.log('WaterlooWorksPlus started!');

// Listener for newly loaded WaterlooWorks pages
function onMsgListener(request, sender) {
  if (request.buildForm) {
    chrome.tabs.executeScript(sender.tab.id, { code: decodeURI(request.buildForm) });
  }
}

// Register listener
chrome.runtime.onMessage.addListener(onMsgListener);
