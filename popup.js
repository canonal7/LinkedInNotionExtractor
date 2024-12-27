document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const notionKeyInput = document.getElementById('notionKey');
  const databaseIdInput = document.getElementById('databaseId');
  const saveSettingsBtn = document.getElementById('saveSettings');
  const saveToNotionBtn = document.getElementById('saveToNotion');
  const statusDiv = document.getElementById('status');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const jobPreviewDiv = document.getElementById('job-preview');
  const noJobMessageDiv = document.getElementById('no-job-message');
  const notesInput = document.getElementById('preview-notes');

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tabContents.forEach((content) => content.classList.remove('active'));

      tab.classList.add('active');
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Load saved settings
  chrome.storage.local.get(['notionKey', 'databaseId'], (result) => {
    if (result.notionKey) notionKeyInput.value = result.notionKey;
    if (result.databaseId) databaseIdInput.value = result.databaseId;
  });

  // Save settings
  saveSettingsBtn.addEventListener('click', () => {
    const notionKey = notionKeyInput.value.trim();
    const databaseId = databaseIdInput.value.trim();

    if (!notionKey || !databaseId) {
      showStatus('Please fill in all fields', 'error');
      return;
    }

    chrome.storage.local.set({ notionKey, databaseId }, () => {
      showStatus('Settings saved successfully!', 'success');
    });
  });

  // Format date function
  function formatDate(date) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // Check if we're on a LinkedIn job page and load job details
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const tab = tabs[0];

    if (!tab.url.includes('linkedin.com/jobs')) {
      jobPreviewDiv.style.display = 'none';
      noJobMessageDiv.style.display = 'block';
      return;
    }

    noJobMessageDiv.style.display = 'none';
    jobPreviewDiv.style.display = 'block';

    // Get job details
    chrome.tabs.sendMessage(tab.id, { action: 'getJobDetails' }, (response) => {
      if (chrome.runtime.lastError || !response) {
        showStatus('Error: Could not get job details', 'error');
        return;
      }

      // Update preview
      document.getElementById('preview-title').textContent = response.jobTitle;
      document.getElementById('preview-company').textContent = response.company;
      document.getElementById('preview-location').textContent =
        response.location;
      document.getElementById('preview-employment-type').textContent =
        response.employmentType;
      document.getElementById('preview-application-date').textContent =
        formatDate(new Date());
    });
  });

  // Save to Notion
  saveToNotionBtn.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    chrome.tabs.sendMessage(tab.id, { action: 'getJobDetails' }, (response) => {
      if (chrome.runtime.lastError) {
        showStatus('Error: Could not get job details', 'error');
        return;
      }

      // Add application date and notes to the response
      response.dateApplied = new Date().toISOString();
      response.notes = notesInput.value.trim();

      chrome.runtime.sendMessage(
        {
          action: 'saveToNotion',
          jobDetails: response,
        },
        (response) => {
          if (response.success) {
            showStatus('Job saved to Notion!', 'success');
            notesInput.value = ''; // Clear notes after successful save
          } else {
            showStatus(`Error: ${response.error}`, 'error');
          }
        }
      );
    });
  });

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = 'block';
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 3000);
  }
});
