chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveToNotion') {
    saveToNotion(request.jobDetails)
      .then((result) => sendResponse({ success: true }))
      .catch((error) => sendResponse({ success: false, error: error.message }));
    return true;
  }
});

async function saveToNotion(jobDetails) {
  const { notionKey, databaseId } = await chrome.storage.local.get([
    'notionKey',
    'databaseId',
  ]);

  if (!notionKey || !databaseId) {
    throw new Error(
      'Notion API key or Database ID not found. Please configure in extension settings.'
    );
  }

  const response = await fetch(`https://api.notion.com/v1/pages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${notionKey}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: jobDetails.jobTitle,
              },
            },
          ],
        },
        Company: {
          rich_text: [
            {
              text: {
                content: jobDetails.company,
              },
            },
          ],
        },
        Location: {
          rich_text: [
            {
              text: {
                content: jobDetails.location,
              },
            },
          ],
        },
        Status: {
          select: {
            name: jobDetails.status,
          },
        },
        'Date Applied': {
          date: {
            start: jobDetails.dateApplied,
          },
        },
        URL: {
          url: jobDetails.jobUrl,
        },
        Description: {
          rich_text: [
            {
              text: {
                content: jobDetails.description.substring(0, 2000), // Notion has a limit on text length
              },
            },
          ],
        },
        'Employment Type': {
          rich_text: [
            {
              text: {
                content: jobDetails.employmentType,
              },
            },
          ],
        },
        Notes: {
          rich_text: [
            {
              text: {
                content: jobDetails.notes || '',
              },
            },
          ],
        },
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to save to Notion');
  }

  return await response.json();
}
