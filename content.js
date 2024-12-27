// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getJobDetails') {
    const jobDetails = extractJobDetails();
    sendResponse(jobDetails);
  }
  return true;
});

function extractJobDetails() {
  // Get job title - using the h1 element inside the job-title div
  const jobTitle =
    document
      .querySelector('.job-details-jobs-unified-top-card__job-title h1')
      ?.textContent.trim() || '';

  // Get company name
  const company =
    document
      .querySelector('.job-details-jobs-unified-top-card__company-name a')
      ?.textContent.trim() || '';

  // Get location - first span in the primary description container
  const locationElement = document.querySelector(
    '.job-details-jobs-unified-top-card__primary-description-container .t-black--light span'
  );
  const location = locationElement?.textContent.trim() || '';

  // Get employment type - from the job insight section
  const employmentTypeElement = document.querySelector(
    '.job-details-jobs-unified-top-card__job-insight span[dir="ltr"]'
  );
  const employmentType = employmentTypeElement?.textContent.trim() || '';

  // Get job description
  const description =
    document
      .querySelector('.jobs-description-content__text')
      ?.textContent.trim() || '';

  // Get the job URL
  const jobUrl = window.location.href;

  return {
    jobTitle,
    company,
    location,
    description,
    jobUrl,
    employmentType,
    status: 'Applied',
    dateApplied: new Date().toISOString(),
  };
}
