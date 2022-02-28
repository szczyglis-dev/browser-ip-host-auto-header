let json = JSON.stringify([
  {ip: 'http://40.114.177.156', host: 'duckduckgo.com', enabled: true}
]);
let hostsList;
let isInitialized = false;

function getHost(url) {
  let hostname;

  if (url.indexOf("//") > -1) {
    hostname = url.split('/')[2];
  } else {
    hostname = url.split('/')[0];
  }
  hostname = hostname.split(':')[0];
  hostname = hostname.split('?')[0];

  return hostname;
}

browser.runtime.onInstalled.addListener(() => {
  browser.storage.sync.set({ json });
  browser.storage.sync.set({ isInitialized });
});

browser.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    browser.storage.sync.get('json', function(items) {
      if (typeof items.json !== "undefined") {
          let list = JSON.parse(items.json);
          hostsList = list;
      }
  });

  if (typeof hostsList !== "undefined") {
      let currentHost = getHost(details.url);
      for (let i = 0; i < hostsList.length; i++) {
        let storedIp = getHost(hostsList[i].ip);
        if (storedIp === currentHost && hostsList[i].enabled === true) {
          details.requestHeaders.push({
              name: 'Host',
              value: hostsList[i].host,
          });
        }
      }
  }
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["<all_urls>"] },
  [
    'blocking',
    'extraHeaders', 
    'requestHeaders'
  ]
);