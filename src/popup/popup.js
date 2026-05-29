const STRINGS = {
  el: {
    extensionName: 'Σουίτα Προσβασιμότητας ΠΙ',
    tabEcourse: 'eCourse',
    tabModip: 'MODIP',
    expandAllLabel: 'Επέκταση Όλων των Φακέλων',
    collapseAllLabel: 'Σύμπτυξη Όλων των Φακέλων',
    settingsLayoutFix: 'Διορθώσεις Εμφάνισης',
    settingsA11yFix: 'Μεγάλο Κείμενο & Αριθμοί',
    tooltipEcourse: 'Επεκτείνει τα περιεχόμενα φακέλων στη σελίδα eCourse χωρίς άνοιγμα νέας καρτέλας.',
    tooltipModip: 'Διορθώνει εμφάνιση και προσβασιμότητα στα ερωτηματολόγια MODIP.',
    helpChar: '?',
  },
  en: {
    extensionName: 'UoI Accessibility Suite',
    tabEcourse: 'eCourse',
    tabModip: 'MODIP',
    expandAllLabel: 'Expand All Folders',
    collapseAllLabel: 'Collapse All Folders',
    settingsLayoutFix: 'Layout Fixes',
    settingsA11yFix: 'Large Text & Numbers',
    tooltipEcourse: 'Expands folder contents inline on the eCourse page without opening a new tab.',
    tooltipModip: 'Fixes layout and accessibility issues in MODIP questionnaires.',
    helpChar: '?',
  },
};

let expandMode = true;

function setExpandMode(allExpanded) {
  expandMode = !allExpanded;
  const t = STRINGS[document.documentElement.lang] || STRINGS.el;
  document.getElementById('expandAllBtn').textContent = allExpanded ? t.collapseAllLabel : t.expandAllLabel;
}

function render(lang) {
  const t = STRINGS[lang] || STRINGS.el;
  document.documentElement.lang = lang;

  document.getElementById('extName').textContent = t.extensionName;
  document.getElementById('tabLabelEcourse').textContent = t.tabEcourse;
  document.getElementById('tabLabelModip').textContent = t.tabModip;
  document.getElementById('expandAllBtn').textContent = expandMode ? t.expandAllLabel : t.collapseAllLabel;
  document.getElementById('layoutFixLabel').textContent = t.settingsLayoutFix;
  document.getElementById('a11yFixLabel').textContent = t.settingsA11yFix;

  const helpEcourse = document.getElementById('helpEcourse');
  helpEcourse.textContent = t.helpChar;
  helpEcourse.setAttribute('data-tooltip', t.tooltipEcourse);

  const helpModip = document.getElementById('helpModip');
  helpModip.textContent = t.helpChar;
  helpModip.setAttribute('data-tooltip', t.tooltipModip);

  // Toggle button shows the OTHER language (clicking it switches to that language)
  document.getElementById('langToggle').textContent = lang === 'el' ? 'EN' : 'EL';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('extVersion').textContent = 'v' + chrome.runtime.getManifest().version;

  const browserLang = chrome.i18n.getUILanguage().startsWith('el') ? 'el' : 'en';

  // Load saved language preference, fall back to browser language
  chrome.storage.local.get(['lang'], (result) => {
    const lang = result.lang || browserLang;
    render(lang);
  });

  // Tooltip show/hide
  const tooltip = document.getElementById('tooltip');
  document.querySelectorAll('.tab-help').forEach(el => {
    el.addEventListener('mouseenter', () => {
      tooltip.textContent = el.getAttribute('data-tooltip');
      tooltip.classList.add('visible');
    });
    el.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
    });
  });

  // Language toggle
  document.getElementById('langToggle').addEventListener('click', () => {
    const current = document.documentElement.lang;
    const next = current === 'el' ? 'en' : 'el';
    chrome.storage.local.set({ lang: next });
    render(next);
  });

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

  // eCourse: query initial state
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getState' }, (response) => {
        if (chrome.runtime.lastError) return;
        if (response) setExpandMode(response.allExpanded);
      });
    }
  });

  // eCourse: Expand / Collapse All
  document.getElementById('expandAllBtn').addEventListener('click', () => {
    const action = expandMode ? 'expandAll' : 'collapseAll';
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action }, (response) => {
          if (chrome.runtime.lastError) {
            console.warn(action + ' message failed:', chrome.runtime.lastError.message);
            return;
          }
          if (response) setExpandMode(response.allExpanded);
        });
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
