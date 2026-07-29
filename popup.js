const VALUES = [10, 20, 30, 40, 50, 60, 80, 100];

(async () => {
  const { num, enabled } = await chrome.storage.sync.get(["num", "enabled"]);

  const toggle = document.getElementById("toggle");
  const dot = document.getElementById("statusDot");
  const text = document.getElementById("statusText");
  const isOn = enabled !== false;

  function setStatus(on) {
    toggle.checked = on;
    dot.className = "status-dot" + (on ? "" : " off");
    text.textContent = on ? "Active" : "Inactive";
  }
  setStatus(isOn);

  toggle.addEventListener("change", async () => {
    setStatus(toggle.checked);
    await chrome.storage.sync.set({ enabled: toggle.checked });
  });

  const container = document.getElementById("options");
  for (const v of VALUES) {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "num";
    radio.value = v;
    if (v === num) radio.checked = true;
    radio.addEventListener("change", async () => {
      await chrome.storage.sync.set({ num: v });
    });
    label.appendChild(radio);
    label.appendChild(document.createTextNode(v));
    container.appendChild(label);
  }
})();