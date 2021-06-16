let debugMode = false;

chrome.runtime.onMessage.addListener((message) => {
  if (message.event === "debug-change") {
    debugMode = message.value;
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = new URL(details.url);

    if (debugMode) {
      if (!url.searchParams.has('debug')) {
        url.searchParams.append('debug', true);
        return { redirectUrl: url.toString() };
      }
    }

    return;
  }, 
  { urls: ['*://*.openlibrary.org/*'] },
  ['blocking']
);
