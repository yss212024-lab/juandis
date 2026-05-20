# 🎬 Video Project Intake Form

A friendly, one-page intake form for student video clients. It works as a
**creative brief + light statement of work** — capturing scope, style, assets,
timeline, and budget in one place. Submissions are saved straight to a
**Google Sheet**, and the site is ready to **deploy on Vercel**.

```
intake-form/
├── index.html     ← the form (the whole website — open it to preview)
├── Code.gs        ← Google Apps Script that saves answers to your Sheet
├── vercel.json    ← deployment config
└── README.md      ← you are here
```

You can open `index.html` right now to see and test the form. It runs in
**demo mode** (a yellow banner shows) until you connect a Google Sheet.

---

## Step 1 — Create the Google Sheet

1. Go to **sheets.google.com** and create a blank spreadsheet.
   Name it anything, e.g. *"Video Project Briefs."*
2. In the menu, click **Extensions → Apps Script**.
3. Delete any sample code, then **paste in everything from `Code.gs`**.
4. Click the **Save** icon (💾).

## Step 2 — Deploy the script & connect the form

1. In the Apps Script editor, click **Deploy → New deployment**.
2. Click the gear ⚙️ next to "Select type" and choose **Web app**.
3. Set:
   - **Description:** Intake form
   - **Execute as:** *Me*
   - **Who has access:** *Anyone*
4. Click **Deploy**, then **Authorize access** and allow the permissions
   (choose your Google account → *Advanced* → *Go to project* → *Allow*).
5. Copy the **Web app URL** — it looks like
   `https://script.google.com/macros/s/AKfy..../exec`
6. Open **`index.html`**, find the `CONFIG` line near the bottom, and paste
   your URL between the quotes:
   ```js
   const SCRIPT_URL = "https://script.google.com/macros/s/AKfy..../exec";
   ```
7. Save. The yellow demo banner disappears — submissions now land in a
   **"Responses"** tab in your Sheet automatically.

> Tip: submit one test entry yourself and check the Sheet to confirm it works.

## Step 3 — Deploy on Vercel

**Easiest way (no coding tools needed):**

1. Go to **vercel.com** and sign in (a free account is fine).
2. Click **Add New → Project → Deploy** and **drag the `intake-form` folder**
   into the upload area (or upload the files).
3. Vercel gives you a live link like `your-form.vercel.app`. Done — share it
   with clients!

**Using GitHub (optional):** push this folder to a GitHub repo, then in Vercel
choose **Import Project** and select it. Every future edit you push goes live
automatically.

---

## Editing the form later

- **Change questions, options, or wording** → edit `index.html`. The Sheet
  adds new columns by itself, so you don't need to touch `Code.gs`.
- **Change colors/fonts** → edit the `:root` variables at the top of the
  `<style>` block in `index.html`.
- After any change, re-upload to Vercel (or push to GitHub).

## Troubleshooting

| Problem | Fix |
|---|---|
| Yellow demo banner still shows | The `SCRIPT_URL` still has `PASTE_...` in it — paste your real URL. |
| Form submits but Sheet is empty | Re-check the Apps Script deployment is set to **Anyone** access; redeploy if needed. |
| Changed `Code.gs` but nothing updates | Use **Deploy → Manage deployments → Edit → New version** to publish changes. |

---

Made for student creators. Keep it simple, keep it kind. 💛
