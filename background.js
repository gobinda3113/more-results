const DEFAULT_NUM = 100;

chrome.runtime.onInstalled.addListener(async () => {
  const { num, enabled } = await chrome.storage.sync.get(["num", "enabled"]);
  if (!num) await chrome.storage.sync.set({ num: DEFAULT_NUM });
  if (enabled === undefined) await chrome.storage.sync.set({ enabled: true });
});