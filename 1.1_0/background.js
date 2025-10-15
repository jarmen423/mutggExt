let tokenRedirectRegex = /http:\/\/127\.0\.0\.1\/success(-dev)?\?code=(.*?)$/;
const HOSTNAME = "https://www.mut.gg";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    let match = tab.url.match(tokenRedirectRegex);
    if (match) {
        let authCode = match[2];
        chrome.tabs.query({currentWindow: true, active: true}, (tabInfo) => {
            chrome.tabs.update(tab.id, {url: `${HOSTNAME}/binder?code=${authCode}`});
        });
    }
});

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    if (request) {
        if (request.message) {
            if (request.message === "version") {
                sendResponse({version: "1.0"});
            }
        }
    }
    return true;
});