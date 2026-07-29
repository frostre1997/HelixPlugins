// Load plugins from JSON
fetch('plugins.json')
    .then(response => {
        if (!response.ok) throw new Error('Failed to load plugins');
        return response.json();
    })
    .then(plugins => {
        renderPlugins(plugins);
        setupSearch(plugins);
    })
    .catch(error => {
        document.getElementById('pluginGrid').innerHTML = `
            <div class="loading" style="color:#d32f2f;">
                ⚠️ Could not load plugins. Please try again later.
            </div>
        `;
        console.error('Error loading plugins:', error);
    });

// Render plugin cards
function renderPlugins(plugins) {
    const grid = document.getElementById('pluginGrid');
    if (!plugins || plugins.length === 0) {
        grid.innerHTML = `<div class="loading">No plugins available yet.</div>`;
        return;
    }
    grid.innerHTML = plugins.map(plugin => `
        <div class="plugin-card" data-id="${plugin.id}">
            <div class="card-header">
                <div class="card-icon">${plugin.icon || '🧩'}</div>
                <div class="card-title">
                    <h3>${plugin.name}</h3>
                    <span class="version">v${plugin.version}</span>
                </div>
            </div>
            <div class="description">${plugin.description}</div>
            <div class="author">by ${plugin.author}</div>
            <div class="tags">
                ${plugin.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
            </div>
            <div class="card-footer">
                <span class="installed-badge" id="badge-${plugin.id}" style="display:none;">✅ Installed</span>
                <a href="${plugin.downloadUrl}" class="download-btn" onclick="trackInstall('${plugin.id}')">Download</a>
            </div>
        </div>
    `).join('');

    // Check for installed plugins (simulate by checking localStorage)
    plugins.forEach(plugin => {
        const installed = localStorage.getItem(`helix_plugin_${plugin.id}`) === 'true';
        if (installed) {
            document.getElementById(`badge-${plugin.id}`).style.display = 'inline-block';
        }
    });
}

// Track installs (for demo)
function trackInstall(pluginId) {
    localStorage.setItem(`helix_plugin_${pluginId}`, 'true');
    const badge = document.getElementById(`badge-${pluginId}`);
    if (badge) badge.style.display = 'inline-block';
    console.log(`Plugin ${pluginId} installed`);
}

// Search functionality
function setupSearch(plugins) {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.plugin-card');
        let visibleCount = 0;
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            const match = text.includes(query);
            card.style.display = match ? 'flex' : 'none';
            if (match) visibleCount++;
        });
        const grid = document.getElementById('pluginGrid');
        const noResult = grid.querySelector('.no-result');
        if (visibleCount === 0 && query.length > 0) {
            if (!noResult) {
                const msg = document.createElement('div');
                msg.className = 'loading no-result';
                msg.textContent = '🔍 No plugins found. Try a different search.';
                grid.appendChild(msg);
            }
        } else {
            if (noResult) noResult.remove();
        }
    });
      }
