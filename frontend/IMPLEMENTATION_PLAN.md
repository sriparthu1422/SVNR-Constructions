# Implementation Plan: Connect Forms to Excel (Google Sheets)

This plan outlines how to send data from your website's contact forms directly to a Google Sheet. This is a robust, serverless solution perfect for your project structure.

## Goal

Automatically save form submissions from "Upcoming Projects", "Live Project Details", and "Book Site Visit" forms into a centralized Google Sheet.

## 1. Google Sheet & Backend Setup (User Action Required)

Since this requires access to your Google Account, you will need to perform these steps manually.

### Step 1.1: Create the Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new sheet.
2. Name it `SVNR Website Leads`.
3. In the first row, add these exact headers (case-sensitive):
   - `Timestamp`
   - `FormSource` (To know which form they used)
   - `Name`
   - `Phone`
   - `Email`
   - `Message`
   - `Project`
   - `Date` (For site visits)

### Step 1.2: Add the Script

1. In the Google Sheet, go to **Extensions** > **Apps Script**.
2. Delete any code in the editor and paste the following:

```javascript
/* Google Apps Script to handle Form Submissions */
const SHEET_NAME = "Sheet1";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(SHEET_NAME);

    const headers = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    const newRow = headers.map(function (header) {
      if (header === "Timestamp") {
        return new Date();
      }
      return e.parameter[header] || "";
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", row: nextRow }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: e }),
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

### Step 1.3: Deploy as Web App

1. Click **Deploy** > **New deployment**.
2. **Select type**: Web app.
3. **Description**: "Contact Form API".
4. **Execute as**: `Me` (your email).
5. **Who has access**: `Anyone` (Important! This allows your website to send data).
6. Click **Deploy**.
7. **Copy the Web App URL** (It starts with `https://script.google.com/macros/s/...`).

## 2. Frontend Code Changes (I will implement this)

I will create a reusable utility and update your forms to send data to this URL.

### Proposed Changes

1.  **Create `src/utils/googleSheets.js`**:
    - A helper function that takes form data and posts it to your Script URL.
    - I will use a placeholder URL `YOUR_WEB_APP_URL_HERE` which you can replace later.

2.  **Update Components**:
    - `src/pages/projects/UpcomingProjects.jsx`
    - `src/pages/projects/LiveProjectDetails.jsx`
    - `src/components/common/BookSiteVisitModal.jsx`
    - Connect their `onSubmit` handlers to the new helper function.
    - Add loading states and success/error notifications.

## 3. Verification Plan

### Manual Verification

1.  Once you replace the URL, try filling out each form.
2.  Check the Google Sheet to see if a new row appears.
3.  Check the browser console/network tab for success response.

### Automated Test (Mock)

- I can run a unit test ensuring the `submitToGoogleSheet` function formats the data correctly before sending.
