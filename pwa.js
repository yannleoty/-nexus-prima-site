/* Nexus Prima PWA v1. No libraries, tracking, permissions or automatic prompts. */
(() => {
  'use strict';
  const panel = document.getElementById('np-pwa-install');
  const button = document.getElementById('np-pwa-install-button');
  const help = document.getElementById('np-pwa-install-help');
  const status = document.getElementById('np-pwa-install-status');
  const standalone = window.matchMedia('(display-mode: standalone)');
  let deferredPrompt = null;
  let installedThisSession = false;

  const isInstalled = () => standalone.matches || navigator.standalone === true || installedThisSession;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  function setHelp() {
    if (!help) return;
    if (isIOS) {
      help.textContent = 'On iPhone or iPad, open nexusprima.org in Safari, tap Share, then Add to Home Screen. If shown, turn on Open as Web App, then tap Add.';
    } else if (/Mac/.test(navigator.platform) && /Safari/.test(navigator.userAgent) && !/Chrome|Chromium|Edg/.test(navigator.userAgent)) {
      help.textContent = 'In a supported version of Safari on Mac, choose File or Share, then Add to Dock. You can also install with Chrome or Edge.';
    } else {
      help.textContent = 'Choose Install app or Add to Home Screen in your browser menu, if available. On a computer, look for the install icon in the address bar. Installation options depend on your browser.';
    }
  }

  function syncUI() {
    if (panel) panel.hidden = isInstalled();
    if (button) button.hidden = !deferredPrompt || isInstalled();
  }

  setHelp();
  syncUI();

  window.addEventListener('beforeinstallprompt', event => {
    // Without the controls, keep the browser's own installation behavior.
    if (!panel || !button || isInstalled()) return;
    event.preventDefault();
    deferredPrompt = event;
    if (help) help.textContent = 'Install Nexus Prima to open it directly from your device. No app store download is needed.';
    syncUI();
  });

  if (button) button.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    const prompt = deferredPrompt;
    deferredPrompt = null;
    button.disabled = true;
    try {
      // Called directly from the user's click, as required by supporting browsers.
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (status) status.textContent = choice.outcome === 'accepted'
        ? 'Installation requested. Follow your browser’s instructions.'
        : 'Installation cancelled. You can continue using the website.';
    } catch (_) {
      if (status) status.textContent = 'Use your browser’s menu to install Nexus Prima.';
    } finally {
      button.disabled = false;
      setHelp();
      syncUI();
    }
  });

  window.addEventListener('appinstalled', () => {
    installedThisSession = true;
    deferredPrompt = null;
    syncUI();
  });
  if (standalone.addEventListener) standalone.addEventListener('change', syncUI);

  if ('serviceWorker' in navigator && window.isSecureContext) {
    const register = () => {
      navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' })
        .catch(error => console.warn('Nexus Prima offline support could not start:', error));
    };
    if (document.readyState === 'complete') register();
    else window.addEventListener('load', register, { once: true });
  }
})();
