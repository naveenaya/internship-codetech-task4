let activeTab = null;
let startTime = null;
const siteTimes = {};

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await updateTime();
  const tab = await chrome.tabs.get(activeInfo.tabId);
  activeTab = new URL(tab.url).hostname;
  startTime = Date.now();
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    await updateTime();
    activeTab = new URL(tab.url).hostname;
    startTime = Date.now();
  }
});

async function updateTime() {
  if (!activeTab || !startTime) return;
  const duration = (Date.now() - startTime) / 1000; // in seconds
  siteTimes[activeTab] = (siteTimes[activeTab] || 0) + duration;
  await chrome.storage.local.set({ siteTimes });
  console.log("Updated:", siteTimes);
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "getData") {
    sendResponse(siteTimes);
  }
});
