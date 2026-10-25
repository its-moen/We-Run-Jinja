# Checkpoint 3: run the site from a Google Sheet

Your club admins edit rows in a Google Sheet. The website reads them. Nobody touches code.

## Set up (about 10 minutes)
1. Go to sheets.google.com and create a blank sheet called **We Run Jinja content**.
2. Easiest start: upload `WRJ_Sheet_Template.xlsx` to Google Drive, open it with Google Sheets. It already has every tab with the current sample content.
   Or: open Extensions > Apps Script, paste `Code.gs`, run `setupSheets()` once to create empty tabs with headers.
3. Open Extensions > Apps Script and paste everything from `Code.gs` (replace the sample code). Save.
4. Click **Deploy > New deployment > Web app**. Execute as: **Me**. Who has access: **Anyone**. Deploy and allow access.
5. Copy the **Web app URL**. Open `js/data/settings.js` and paste it into `sheet.url`.
6. Reload the site. Content now comes from the sheet. Form submissions appear in a new tab called **submissions**.

## How it behaves
- If the sheet is slow or offline, the site shows the content in `js/data/*.js` (nothing breaks).
- Content is cached on each visitor's phone for `cacheMinutes` (default 10), so edits appear within about 10 minutes.
- After you edit the Apps Script code you must make a **new deployment version** for changes to go live.

## Tabs (one row per item)
athletes, records, performances, routes, schedule, events, groups, activities, founders, developers, credits, alumni, chain, news, promos, faq, gallery, media, socials, settings.
(`media` holds films AND photos. The old tab name `videos` still works.)

## Column rules
| Rule | Example |
|---|---|
| `show` = FALSE hides a row without deleting it | FALSE |
| Dots make nested fields | columns `country.name` and `country.code`, `pb.5K` |
| Dates as text | `2026-11-14` (format the column as Plain text) |
| Times as text | `06:30` |
| `links` (founders, developers, credits) | `instagram:https://instagram.com/x|linkedin:https://linkedin.com/in/y` |
| `points` (routes) | `10,44;22,38;35,42` (x,y from 0-100 and 0-60) |
| `marks` (routes) | `2:2 km|5:6 km` (point number : label) |
| `main` (schedule) | TRUE for the main weekly run |
| photos | file path such as `assets/athletes/alex.jpg` |
| `type` + `youtubeId` / `src` (media) | `youtube` + the part after `v=`, or `file` + a video path, or `image` + a photo path |
| `center` (routes) | `0.4372,33.2159` (lat,lng) |
| `landmarks` (routes) | `Source of the Nile:0.4189,33.2184:Water stop|Bujagali Falls:0.4985,33.1430:Turnaround` |
| `path` (routes) | `0.4372,33.2159;0.4380,33.2140;...` exact GPS points |
| `polyline` (routes) | an encoded polyline pasted from Strava or Google, easiest way to get an exact route |

## settings tab (path, value)
Any value in the site dictionaries can be changed by path. Starters included: `settings.whatsapp.number`, `site.contact.email`, `site.contact.phone`, `content.hero.text`, `settings.heroVideo.src` and more. Add rows for other paths as needed.

## Privacy
Only publish names, photos and results for members who agreed. Do not put birthdays, phone numbers or photos of children in the sheet unless the parent or guardian has agreed. The `submissions` tab holds visitor details, so keep the sheet private (only the web app URL is public).
