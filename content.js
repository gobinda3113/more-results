(async () => {
  const { num: target, enabled } = await chrome.storage.sync.get(["num", "enabled"]);
  if (enabled === false) return;
  if (!target || target <= 10) return;

  const url = new URL(location.href);
  const q = url.searchParams.get("q");
  if (!q) return;
  if ((parseInt(url.searchParams.get("start")) || 0) > 0) return;

  function getRealHref(a) {
    const r = a.getAttribute("href") || "";
    if (r.startsWith("http://") || r.startsWith("https://"))
      return r.includes("google.com/") ? "" : r;
    if (r.startsWith("/url?")) {
      const u = new URLSearchParams(r.split("?")[1]).get("q") || "";
      return u.includes("google.com/") ? "" : u;
    }
    return "";
  }

  function getResults(root) {
    const list = root.querySelector("#rso") || root.querySelector("#search");
    if (!list) return { list: null, items: [] };
    const items = [];
    for (const child of list.children) {
      if (child.tagName !== "DIV") continue;
      const anchor = child.querySelector("a:has(h3)");
      if (!anchor) continue;
      const href = getRealHref(anchor);
      if (!href) continue;
      items.push({ el: child, href, title: anchor.querySelector("h3")?.textContent?.trim() || "" });
    }
    return { list, items };
  }

  await new Promise(resolve => {
    let t = 0;
    const c = () => {
      if (document.querySelector("#rso") || document.querySelector("#search")) resolve();
      else if (t++ > 40) resolve();
      else setTimeout(c, 250);
    };
    setTimeout(c, 500);
  });

  const { list, items: initial } = getResults(document);
  if (!list || initial.length === 0) return;

  const seen = new Set(initial.map(i => i.href));
  const needed = Math.min(target, 100);
  if (seen.size >= needed) return;

  let nextStart = 10;
  let failedCount = 0;
  let loading = false;

  const status = document.createElement("div");
  status.textContent = "Loading more results...";
  status.style.cssText = "text-align:center;padding:16px;color:#5f6368;font:13px/1.4 sans-serif";
  status.style.display = "none";
  list.after(status);

  async function fetchNext() {
    if (loading || nextStart >= 100 || seen.size >= needed || failedCount > 1) return;
    loading = true;
    status.style.display = "block";
    await new Promise(r => setTimeout(r, 400 + Math.random() * 400));
    try {
      const res = await fetch(`/search?q=${encodeURIComponent(q)}&start=${nextStart}`, { credentials: "same-origin" });
      if (!res.ok) { loading = false; return; }
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const { items: fetched } = getResults(doc);
      let added = 0;
      for (const f of fetched) {
        if (seen.has(f.href)) continue;
        seen.add(f.href);
        added++;
        list.appendChild(f.el.cloneNode(true));
        if (seen.size >= needed) break;
      }
      if (added === 0) { failedCount++; loading = false; status.style.display = "none"; return; }
      failedCount = 0;
      nextStart += 10;
    } catch {
      failedCount++;
    }
    loading = false;
    if (seen.size >= needed) status.style.display = "none";
  }

  let scrollTimer;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2500) {
        fetchNext();
      }
    }, 300);
  }, { passive: true });

  fetchNext();
})();