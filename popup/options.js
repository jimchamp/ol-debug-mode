const debugCheckbox = document.querySelector('#debug-checkbox');

initialize();

function initialize() {
  chrome.storage.local.get(null, (results) => {
    console.log(results);
    debugCheckbox.checked = results.debug || false;
  });
}

function updateBackgroundService() {
  chrome.runtime.sendMessage({
    event: 'debug-change',
    value: debugCheckbox.checked
  });
};

debugCheckbox.addEventListener('change', () => {
  chrome.storage.local.set({'debug': debugCheckbox.checked})
  updateBackgroundService();
});

updateBackgroundService();
