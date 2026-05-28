function handleFolderExpansion(folder) {
  const button = folder.querySelector('button');
  const folderContainer = folder.nextElementSibling;

  if (folderContainer && folderContainer.classList.contains('expanded')) {
    const isHidden = folderContainer.style.display === 'none';
    folderContainer.style.display = isHidden ? '' : 'none';
    if (button) {
      button.textContent = isHidden ? '▲' : '▼';
      button.setAttribute('aria-expanded', String(isHidden));
    }
    return;
  }

  const folderLink = folder.querySelector('.activityinstance a');
  if (!folderLink) return;
  const folderUrl = folderLink.getAttribute('href');

  const loadingElement = document.createElement('div');
  loadingElement.textContent = chrome.i18n.getMessage('loadingText');
  folder.after(loadingElement);

  fetch(folderUrl)
    .then(response => response.text())
    .then(data => {
      loadingElement.remove();

      const newFolderContainer = document.createElement('div');
      newFolderContainer.classList.add('folder-container', 'expanded');

      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      const fileLinks = doc.querySelectorAll('.fp-filename-icon a');

      if (fileLinks.length === 0) {
        newFolderContainer.textContent = chrome.i18n.getMessage('noFilesMessage');
      } else {
        fileLinks.forEach(fileLinkElement => {
          const fileEntry = document.createElement('div');
          fileEntry.className = 'uoi-file-entry';

          const linkElement = document.createElement('a');
          linkElement.setAttribute('href', fileLinkElement.getAttribute('href'));

          const iconImg = fileLinkElement.querySelector('img.icon');
          if (iconImg) {
            const rawSrc = iconImg.getAttribute('src');
            if (rawSrc) {
              const img = document.createElement('img');
              img.src = new URL(rawSrc, folderUrl).href;
              img.alt = '';
              img.width = 24;
              img.height = 24;
              linkElement.appendChild(img);
            }
          }

          const nameSpan = document.createElement('span');
          nameSpan.textContent = fileLinkElement.textContent.trim();
          linkElement.appendChild(nameSpan);

          fileEntry.appendChild(linkElement);
          newFolderContainer.appendChild(fileEntry);
        });
      }

      folder.after(newFolderContainer);

      if (button) {
        button.textContent = '▲';
        button.setAttribute('aria-expanded', 'true');
      }
    })
    .catch(error => {
      console.error('Error fetching folder content:', error);
      loadingElement.remove();
      const errorElement = document.createElement('div');
      errorElement.textContent = chrome.i18n.getMessage('errorMessage');
      folder.after(errorElement);
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

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'expandAll') {
    document.querySelectorAll('.activity.folder.modtype_folder').forEach(folder => {
      const container = folder.nextElementSibling;
      if (!container || !container.classList.contains('expanded')) {
        handleFolderExpansion(folder);
      }
    });
  }
});
