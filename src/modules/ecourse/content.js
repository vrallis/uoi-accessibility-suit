function fetchAndExpand(folder, onDone) {
  const button = folder.querySelector('button');
  const folderLink = folder.querySelector('.activityinstance a');
  if (!folderLink) { if (onDone) onDone(); return; }
  const folderUrl = folderLink.getAttribute('href');

  const loadingEl = document.createElement('div');
  loadingEl.textContent = chrome.i18n.getMessage('loadingText');
  folder.after(loadingEl);

  fetch(folderUrl)
    .then(r => r.text())
    .then(data => {
      loadingEl.remove();

      const container = document.createElement('div');
      container.classList.add('folder-container', 'expanded');

      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      const fileLinks = doc.querySelectorAll('.fp-filename-icon a');

      if (fileLinks.length === 0) {
        container.textContent = chrome.i18n.getMessage('noFilesMessage');
      } else {
        fileLinks.forEach(fileLinkEl => {
          const fileEntry = document.createElement('div');
          fileEntry.className = 'uoi-file-entry';

          const link = document.createElement('a');
          link.setAttribute('href', fileLinkEl.getAttribute('href'));

          const iconImg = fileLinkEl.querySelector('img.icon');
          if (iconImg) {
            const rawSrc = iconImg.getAttribute('src');
            if (rawSrc) {
              const img = document.createElement('img');
              img.src = new URL(rawSrc, folderUrl).href;
              img.alt = '';
              img.width = 24;
              img.height = 24;
              link.appendChild(img);
            }
          }

          const nameSpan = document.createElement('span');
          nameSpan.textContent = fileLinkEl.textContent.trim();
          link.appendChild(nameSpan);

          fileEntry.appendChild(link);
          container.appendChild(fileEntry);
        });
      }

      folder.after(container);
      if (button) { button.textContent = '▲'; button.setAttribute('aria-expanded', 'true'); }
    })
    .catch(err => {
      console.error('Error fetching folder content:', err);
      loadingEl.remove();
      const errorEl = document.createElement('div');
      errorEl.textContent = chrome.i18n.getMessage('errorMessage');
      folder.after(errorEl);
    })
    .finally(() => { if (onDone) onDone(); });
}

function handleFolderExpansion(folder) {
  const button = folder.querySelector('button');
  const container = folder.nextElementSibling;

  if (container && container.classList.contains('expanded')) {
    const isHidden = container.style.display === 'none';
    container.style.display = isHidden ? '' : 'none';
    if (button) {
      button.textContent = isHidden ? '▲' : '▼';
      button.setAttribute('aria-expanded', String(isHidden));
    }
    return;
  }

  fetchAndExpand(folder);
}

function checkAllExpanded() {
  const folders = [...document.querySelectorAll('.activity.folder.modtype_folder')];
  if (folders.length === 0) return false;
  return folders.every(folder => {
    const container = folder.nextElementSibling;
    return container && container.classList.contains('expanded') && container.style.display !== 'none';
  });
}

document.querySelectorAll('.activity.folder.modtype_folder').forEach(folder => {
  const expandButton = document.createElement('button');
  expandButton.textContent = '▼';
  expandButton.style.cursor = 'pointer';
  expandButton.setAttribute('aria-label', chrome.i18n.getMessage('expandButtonLabel'));
  expandButton.setAttribute('aria-expanded', 'false');
  expandButton.addEventListener('click', function () {
    handleFolderExpansion(folder);
  });

  const activityInstance = folder.querySelector('.activityinstance');
  if (activityInstance) {
    activityInstance.appendChild(expandButton);
  } else {
    folder.prepend(expandButton);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'expandAll') {
    const folders = [...document.querySelectorAll('.activity.folder.modtype_folder')];
    const pending = [];

    folders.forEach(folder => {
      const container = folder.nextElementSibling;
      if (container && container.classList.contains('expanded')) {
        if (container.style.display === 'none') {
          container.style.display = '';
          const btn = folder.querySelector('button');
          if (btn) { btn.textContent = '▲'; btn.setAttribute('aria-expanded', 'true'); }
        }
      } else {
        pending.push(new Promise(resolve => fetchAndExpand(folder, resolve)));
      }
    });

    Promise.all(pending).then(() => sendResponse({ allExpanded: checkAllExpanded() }));
    return true;
  }

  if (message.action === 'collapseAll') {
    document.querySelectorAll('.folder-container.expanded').forEach(container => {
      container.style.display = 'none';
      const folder = container.previousElementSibling;
      if (folder) {
        const btn = folder.querySelector('button');
        if (btn) { btn.textContent = '▼'; btn.setAttribute('aria-expanded', 'false'); }
      }
    });
    sendResponse({ allExpanded: false });
    return true;
  }

  if (message.action === 'getState') {
    sendResponse({ allExpanded: checkAllExpanded() });
    return true;
  }
});
