document.getElementById("view").addEventListener("click", () => {
  chrome.tabs.create({ url: "dashboard/index.html" });
});
