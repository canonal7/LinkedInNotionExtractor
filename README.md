# LinkedIn to Notion Job Tracker

<div align="center">
  <img src="banner.svg" alt="LinkedIn to Notion Job Tracker" width="100%">
</div>

<p align="center">
  A Chrome extension that helps you track your job applications by saving LinkedIn job posts directly to your Notion workspace.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#setup-instructions">Setup</a> •
  <a href="#usage">Usage</a> •
  <a href="#troubleshooting">Troubleshooting</a>
</p>

<p align="center">
  Built with ❤️ by <a href="https://can-onal.com">Can Önal</a>
</p>

## About the Author

This extension is developed by [Can Önal](https://can-onal.com), a software developer passionate about creating tools that enhance productivity and streamline workflows. Visit my website [can-onal.com](https://can-onal.com) to learn more about my other projects and professional experience.

## Features

- 🔄 One-click save from LinkedIn to Notion
- 👀 Preview job details before saving
- 📝 Add personal notes to each application
- 📊 Maintains a clean database in Notion
- 📅 Automatically tracks application dates
- 🎯 Sets application status
- 🔒 Secure API key storage

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the extension directory

## Setup Instructions

### 1. Get your Notion API Key

1. Go to [Notion Developers](https://developers.notion.com/)
2. Click "View my integrations"
3. Click "New integration"
4. Give it a name (e.g., "LinkedIn Job Tracker")
5. Select the workspace where you'll create your job applications database
6. Click "Submit" to create the integration
7. Copy the "Internal Integration Token" (starts with `secret_`)

### 2. Create and Prepare your Notion Database

1. Open Notion and create a new page
2. Type `/database` and select "Table - Full page"
3. Name your database (e.g., "Job Applications")
4. Add the following properties (exact names are important):
   - Title (default, already exists)
   - Company (Text)
   - Location (Text)
   - Status (Select)
     - Add options: Applied, Interview, Rejected, Offer, Not Started
   - Date Applied (Date)
   - URL (URL)
   - Description (Text)
   - Employment Type (Text)
   - Notes (Text) - For storing your comments about the application
5. Share the database with your integration:
   - Click "Share" in the top right
   - Click "Add connections"
   - Search for and select your integration name
   - Click "Invite"
6. Get your Database ID from the URL:
   ```
   https://notion.so/workspace/83jf72h3-example-id-here?v=...
                           └─────── Database ID ───────┘
   ```

### 3. Configure the Extension

1. Click the extension icon in Chrome toolbar
2. Go to the "Settings" tab
3. Enter your Notion API key and Database ID
4. Click "Save Settings"

## Usage

### 1. Preview Job Details

- Navigate to any LinkedIn job posting
- Click the extension icon
- Review the job details in the "Job Preview" tab:
  - Job Title
  - Company
  - Location
  - Employment Type
  - Application Date (automatically set to today)
  - Notes (optional field for your comments)

### 2. Add Notes and Save

- Review the job details in the preview
- Add any notes about the application (e.g., "Applied with custom cover letter", "Referral from John")
- Click "Save to Notion"
- The job will be saved to your database with:
  - Status set to "Applied"
  - Application date set to today's date
  - Your notes and all other details from LinkedIn

## Troubleshooting

### Extension Issues

- Make sure Developer Mode is enabled in Chrome
- Try reloading the extensions page
- Ensure all files are in the correct directory
- Check Chrome's console for any error messages

### Notion Connection Issues

- Verify your API key starts with `secret_`
- Make sure your database is properly shared with the integration
- Confirm all required database properties exist with exact names
- Check that your Database ID is correct (32 characters, including hyphens)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [LinkedIn](https://www.linkedin.com/) for their job posting platform
- [Notion](https://www.notion.so/) for their excellent API
- All contributors who help improve this project
