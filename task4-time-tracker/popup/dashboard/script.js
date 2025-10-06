chrome.runtime.sendMessage({ type: "getData" }, (siteTimes) => {
  const tbody = document.querySelector("#data tbody");
  for (const [site, time] of Object.entries(siteTimes)) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${site}</td><td>${(time / 60).toFixed(1)}</td>`;
    tbody.appendChild(row);
  }
});
