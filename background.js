chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    orderTabs();
  }
});

function orderTabs() {
  chrome.tabs.query({}, function (tabs) {
      var mapping_array = new Array();
      mapping_array = tabs.sort(function(a,b) {return (getTrimmedUrl(a.url) > getTrimmedUrl(b.url))
         ? 1 : ((getTrimmedUrl(b.url) > getTrimmedUrl(a.url)) ? -1 : 0);} );
      moveChromeTabs(mapping_array, tabs);
  });
}

function moveChromeTabs(mapping_array, tabs) {
  for(i=0; i<mapping_array.length; i++){
    for(j=0; j<tabs.length; j++){
      if (mapping_array[i] == tabs[j]){
        chrome.tabs.move(tabs[j].id, {index: i});
      }
    }
  }
}

function getTrimmedUrl(url) {
  var trimmedUrl = url
    .replace("https://" , "")
    .replace("http://" , "")
    .replace("www." , "");

  console.log(trimmedUrl);
  return trimmedUrl;
}
