# Expense Tracker

A simple and responsive personal finance app for tracking daily spending, monitoring monthly totals, and visualizing expense trends with charts.

## About the Repository

This repository contains a front-end expense tracker built with HTML, CSS, and JavaScript. It allows users to add, edit, and delete expenses, keep everything saved in the browser using `localStorage`, and review summaries through dashboard cards and chart-based analytics.

## Features

- Add new expenses with title, amount, category, and date
- Edit existing transactions inline
- Delete transactions from the list
- Dashboard summary cards for:
  - total expense
  - current month spending
  - total transaction count
- Statistics page with:
  - pie chart by category
  - line chart for expense trend over time
  - bar chart for transaction frequency by category
- Persistent data using browser localStorage
- Responsive layout for desktop, tablet, and mobile screens

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Chart.js
- Font Awesome

## Project Structure

```text
Expense Tracker/
├── index.html
├── add.html
├── stat.html
├── index.css
├── index.js
├── README.md
└── .github/
    └── workflows/
        └── deploy.yml
```

## How to Run Locally

### Option 1: Open directly

Open the project folder in a browser and launch `index.html` directly.

### Option 2: Use a local web server

From the project folder, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## How the App Works

1. Enter a new expense from the Add Expense page.
2. The transaction is stored in the browser's `localStorage`.
3. The dashboard automatically updates totals and summary values.
4. The Statistics page generates charts from the saved expense data.
5. You can edit or delete entries anytime from the dashboard table.

## Deployment to GitHub Pages

This project is a static website, so GitHub Pages is the easiest deployment option.

### Method 1: Manual deployment

1. Push the project to a GitHub repository.
2. Open your repository on GitHub.
3. Go to Settings > Pages.
4. Under Source, select "Deploy from a branch".
5. Choose the `main` branch and the `/root` folder.
6. Save the configuration.
7. Your site will be available at:

```text
https://<your-username>.github.io/<your-repo-name>/
```

### Method 2: GitHub Actions deployment

A workflow file is included in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) for automatic deployment.

1. Push the project to GitHub.
2. In the repository, go to Settings > Pages.
3. Set the source to GitHub Actions.
4. GitHub will deploy the site automatically on every push to `main`.

## Notes

- Data is stored in the browser, so it is local to each device/browser.
- Clearing browser storage will remove saved expenses.
- This is a front-end-only project and does not use a database or backend service.

## License

This project is open for educational and personal use.
