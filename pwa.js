/* Nexus Prima PWA v1.1. Installs only after a user action. */
(() => {
  'use strict';
  const panel = document.getElementById('np-pwa-install');
  const summary = panel ? panel.querySelector('summary') : null;
  const button = document.getElementById('np-pwa-install-button');
  const help = document.getElementById('np-pwa-install-help');
  const status = document.getElementById('np-pwa-install-status');
  const standalone = window.matchMedia('(display-mode: standalone)');
  let deferredPrompt = null;
  let installedThisSession = false;
  let installing = false;

  const isInstalled = () => standalone.matches || navigator.standalone === true || installedThisSession;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isMacSafari = !isIOS && /Mac/.test(navigator.platform) &&
    /Safari/.test(navigator.userAgent) && !/Chrome|Chromium|Edg|OPR/.test(navigator.userAgent);

  function syncUI() {
    if (panel) panel.hidden = isInstalled();
    if (button) {
      button.hidden = !deferredPrompt || isInstalled();
      button.disabled = installing;
    }
    if (summary) summary.textContent = isIOS ? 'Add to Home Screen'
      : isMacSafari ? 'Add to Dock'
      : deferredPrompt ? 'Install Nexus Prima' : 'Installation options';
    if (!help) return;
    if (isIOS) {
      help.textContent = 'Open in Safari, then tap Share → Add to Home Screen.';
    } else if (deferredPrompt) {
      help.textContent = 'Open Nexus Prima directly from your device.';
    } else if (isMacSafari) {
      help.textContent = 'In Safari, choose File → Add to Dock, if available.';
    } else {
      help.textContent = 'In your browser menu, choose Install app or Add to Home Screen, if available.';
    }
  }

  syncUI();

  window.addEventListener('beforeinstallprompt', event => {
    if (!panel || !summary || !button || isInstalled()) return;
    event.preventDefault();
    deferredPrompt = event;
    syncUI();
  });

  async function requestInstall() {
    if (!deferredPrompt || installing) return;
    const prompt = deferredPrompt;
    deferredPrompt = null;
    installing = true;
    if (status) status.textContent = '';
    if (button) button.disabled = true;
    try {
      // Keep prompt() inside the click's user-activation context.
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (status) status.textContent = choice.outcome === 'accepted'
        ? 'Installation requested. Follow your browser’s instructions.'
        : 'Installation cancelled. You can continue browsing.';
    } catch (_) {
      if (status) status.textContent = 'Use your browser’s menu to install Nexus Prima.';
    } finally {
      installing = false;
      if (panel && !isInstalled()) panel.open = true;
      syncUI();
    }
  }

  if (summary) summary.addEventListener('click', event => {
    if (installing) { event.preventDefault(); return; }
    if (!deferredPrompt) return; // Native details behavior reveals manual guidance.
    event.preventDefault();
    requestInstall();
  });
  if (button) button.addEventListener('click', requestInstall);

  window.addEventListener('appinstalled', () => {
    installedThisSession = true;
    deferredPrompt = null;
    syncUI();
  });
  if (standalone.addEventListener) standalone.addEventListener('change', syncUI);

  // Preserve the deployed service worker and its existing offline behavior.
  if ('serviceWorker' in navigator && window.isSecureContext) {
    const register = () => {
      navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' })
        .catch(error => console.warn('Nexus Prima offline support could not start:', error));
    };
    if (document.readyState === 'complete') register();
    else window.addEventListener('load', register, { once: true });
  }
})();
