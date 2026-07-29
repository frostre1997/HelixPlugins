console.log("EasyShots has been loaded");

// Inject the button
const btn = document.createElement('button');
btn.className = 'helix-screenshot-btn';
btn.innerHTML = 'Screenshotted';
btn.onclick = function() {
  // This calls the Helix native API (if available)
  if (window.Helix && window.Helix.takeScreenshot) {
    window.Helix.takeScreenshot();
  } else {
    // Fallback: show a message
    alert('EasyShots requires Helix Browser to use the screenshot.');
  }
};
document.body.appendChild(btn);
