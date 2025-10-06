// content.js
(() => {
  const SITE = location.hostname.replace(/^www\./i, "");
  const TITLE = document.title || "";
  const URL = location.href;

  function send(type) {
    try {
      chrome.runtime.sendMessage({
        type,
        site: SITE,
        title: TITLE,
        url: URL,
        ts: Date.now()
      });
    } catch (e) {
      // fallback (for debugging when running without extension environment)
      console.warn("send message failed", e);
    }
  }

  // Inform background that the page loaded
  window.addEventListener("load", () => send("content-loaded"));

  // Visibility changes (user switches tabs/minimizes)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") send("tab-visible");
    else send("tab-hidden");
  });

  // Focus/blur (extra safety)
  window.addEventListener("focus", () => send("tab-visible"));
  window.addEventListener("blur", () => send("tab-hidden"));

  // Ensure we notify on unload
  window.addEventListener("beforeunload", () => send("tab-unload"));

  // Allow background or popup to request current page info
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg?.type === "get-site-info") {
      sendResponse({ site: SITE, title: TITLE, url: URL, ts: Date.now() });
    }
  });
})();
