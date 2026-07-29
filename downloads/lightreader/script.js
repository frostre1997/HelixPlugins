console.log("Lightreader has been loaded");

// Simple reader mode toggle
function toggleReaderMode() {
  document.body.classList.toggle('reader-active');
  const btn = document.querySelector('.helix-reader-btn');
  if (btn) {
    btn.textContent = document.body.classList.contains('reader-active') 
      ? ' Exit Reader' 
      : ' Lightreader Mode';
  }
}

// Inject toggle button
const btn = document.createElement('button');
btn.className = 'helix-lightreader-btn';
btn.textContent = ' Reader Mode';
Object.assign(btn.style, {
  position: 'fixed',
  top: '20px',
  right: '20px',
  zIndex: '9999',
  background: '#6200ee',
  color: '#fff',
  border: 'none',
  borderRadius: '30px',
  padding: '10px 18px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(98, 0, 238, 0.4)'
});
btn.onclick = toggleLightreaderMode;
document.body.appendChild(btn);
