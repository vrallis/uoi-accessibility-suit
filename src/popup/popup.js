document.addEventListener('DOMContentLoaded', () => {
  // Localize all text
  document.getElementById('extName').textContent =
    chrome.i18n.getMessage('extensionName');
  document.getElementById('tabBtnEcourse').textContent =
    chrome.i18n.getMessage('tabEcourse');
  document.getElementById('tabBtnModip').textContent =
    chrome.i18n.getMessage('tabModip');
  document.getElementById('expandAllBtn').textContent =
    chrome.i18n.getMessage('expandAllLabel');
  document.getElementById('layoutFixLabel').textContent =
    chrome.i18n.getMessage('settingsLayoutFix');
  document.getElementById('a11yFixLabel').textContent =
    chrome.i18n.getMessage('settingsA11yFix');

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
    });
  });

  // eCourse: Expand All
  document.getElementById('expandAllBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'expandAll' });
      }
    });
  });

  // MODIP: load saved settings (both default to enabled)
  const layoutCheckbox = document.getElementById('layoutFix');
  const a11yCheckbox = document.getElementById('a11yFix');

  chrome.storage.local.get(['layoutFix', 'a11yFix'], (result) => {
    layoutCheckbox.checked = result.layoutFix !== false;
    a11yCheckbox.checked = result.a11yFix !== false;
  });

  layoutCheckbox.addEventListener('change', () => {
    chrome.storage.local.set({ layoutFix: layoutCheckbox.checked });
  });

  a11yCheckbox.addEventListener('change', () => {
    chrome.storage.local.set({ a11yFix: a11yCheckbox.checked });
  });
});
