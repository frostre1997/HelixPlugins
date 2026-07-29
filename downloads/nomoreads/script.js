console.log("nomoreads has been loaded");

// Additional ad removal via DOM
function removeAds() {
  const selectors = [
    '[class*="ad"]', '[id*="ad"]',
    '.adsbygoogle', '.ad-container',
    'iframe[src*="doubleclick"]',
    'iframe[src*="googleadservices"]'
  ];
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.remove());
  });
}
// Run on load and after dynamic changes
setTimeout(removeAds, 500);
const observer = new MutationObserver(removeAds);
observer.observe(document.body, { childList: true, subtree: true });
