# Routine Planner — GitHub Pages v31

v21 adds **Shared Family Calendar** sync.

## What it does

A parent and child can use different devices but access the same routine.

### Parent mode
- create the shared calendar
- edit activity order and content
- change duration / start time / priority / warnings
- add/remove motivation items
- change templates
- see task progress synced back from the child device

### Kid mode
- receive the routine created by the parent
- start / pause / reset activity timers
- mark activities done
- choose and run motivation
- use the “I’m stuck” supports
- send task progress back to the shared calendar

Devices automatically check for updates about every 8 seconds.

## Calendar access

Creating a shared calendar gives you a random Calendar Code such as:

`ABCD-2345`

The child joins using the Calendar Code.

Parent devices use:
- Calendar Code
- Parent PIN

Keep the Parent PIN private.

## Deployment

Upload the CONTENTS of this `github-pages` folder to the root of the existing GitHub repository and commit.

Then redeploy the updated `cloudflare-worker` folder as well. The Worker URL stays the same.

## Existing notifications

Activity and Motivation background notifications are preserved.

The Worker URL defaults to:

`https://routine-planner-notifications.routineplanner-ot.workers.dev`


## v22 updates

- Added calculated **End Time** for each task using Start time + Duration.
- Added an icon picker for newly created custom activities.
- Existing routines, templates, progress and Shared Family Calendar data remain compatible.
- Existing custom activities keep their current icon; older items without one continue to fall back to ⭐.
- No Cloudflare Worker redeploy is required for these two changes.


## v23 update — Parent Comments

When a device is connected in **Parent mode**, each activity now has a Parent Comment box.

- Parent can type a note under any activity.
- The comment is synced through the existing Shared Family Calendar.
- Kid mode shows the Parent Comment as read-only.
- Standalone mode does not show Parent Comments.
- Existing users and existing routines are preserved; old tasks simply receive an empty `parentComment` field automatically.
- No Cloudflare backend redeploy is required because the existing shared calendar already syncs the task state.


## v24 update — Change planner name

A new **Change name** button appears beside the planner title.

- Changes only the display/profile name on that device.
- Keeps the same profile ID.
- Existing routines, templates, progress, custom activities, notifications and local planner data are preserved.
- Shared Family Calendar data is not deleted or recreated.
- No Cloudflare backend redeploy is required.


## v25 update — Expanded Activity Bank

The Activity Bank now includes:
- many more built-in activities and emojis
- category filter chips
- activity search
- a much larger grouped emoji picker for custom activities
- a separate **My activities** category for custom activities

Existing routines, templates, progress, custom activities, notifications and Shared Family Calendar data are preserved.

This is a frontend-only update. No Cloudflare Worker redeploy is required.


## v26 update — Task-specific “I’m stuck” guides

All **98 built-in Activity Bank tasks** now have their own prepared step-by-step instructions.

Examples:
- Shower → get towel/clothes → check water → wash → rinse → dry/dress
- Homework → choose task → get materials → read first instruction → do one section → check/pack away
- Laundry → collect clothes → sort → load machine → start cycle → move to drying
- Bus / public transport → check route → get travel card → go to stop → board/tap on → get off at correct stop

The generic helper is now reserved for **custom activities** that do not have a prepared guide.

For built-in tasks, the prepared guide takes priority even if an older app version previously saved a generic breakdown.

Existing routines, templates, progress, custom activities, notifications, parent comments, names and Shared Family Calendar data remain compatible.

This is a frontend-only update. No Cloudflare Worker redeploy is required.


## v27 — Actionable support tools
The old “Tools that may help” section is replaced by **What might help me right now?** inside the “I’m stuck” flow.

Six focused supports remain:
- 🚀 Just start for 5 minutes
- 1️⃣ One step at a time
- 🎧 Make my space easier
- ⏸️ Take a planned break
- 🙋 Ask for help
- 👥 Work with someone nearby

They are now actionable: real 5-minute and break timers, current-task next-step guidance, a workspace checklist, self-advocacy phrases, and a body-doubling script. “This helps me” saves useful strategies in My Support Toolkit.

Older equivalent tool selections are migrated. Redundant cards are removed because timer, warning, First–Then and reminders already exist elsewhere.

Also includes HTML escaping for parent comments as a small robustness improvement.

Frontend only: no Cloudflare redeploy required.


## v29 — Personalisation, safety and family collaboration

This cumulative release includes the planned v28 and v29 improvements.

### v28 functions included
- Parent / standalone users can customise the step-by-step instructions for each task.
  - Add, delete and reorder steps.
  - Save custom steps for that task.
  - Reset to the prepared default.
- Safer destructive actions:
  - confirmations for clear / delete actions
  - temporary Undo for removed routine tasks, removed custom activities, cleared routines and deleted templates
- Duplicate a routine template.
- Edit an activity after it has been added to My Sequence:
  - change its displayed name
  - change its emoji
  - the original built-in step guide is retained through `baseLabel`

### v29 functions included
- Support feedback:
  - 👍 Yes
  - 😐 A little
  - 👎 Not really
  - feedback counts appear in My Support Toolkit
- Activity favourites:
  - star frequently used activities
  - a new ⭐ Favourites filter
- Parent–child negotiation in Shared Family Calendar:
  - Kid mode can request: Do it later / More time / Help / Break first
  - Parent mode can Agree or Dismiss
  - agreeing can move the task later, add 10 minutes, add a 5-minute break, or acknowledge help
  - requests are stored inside the existing `taskBreakdownProgress` object so the current family-sync backend can carry them without a Cloudflare schema change
- Advanced controls are grouped under **⚙️ Settings & connections** to keep the main routine screen less cluttered.

### Compatibility
Existing routines, templates, progress, custom activities, child name, parent comments, notifications, task-specific “I’m stuck” guides and Shared Family Calendar remain compatible.

This is a frontend-only release. No Cloudflare Worker redeploy is required.

### v29.1 robustness notes included in this package
- My Support Toolkit selections are mirrored into `taskBreakdownProgress.__selectedSupports`, allowing Kid-mode selections to travel through the current restricted family-sync merge.
- User-editable task text is escaped in the new support-card displays.
- Removing a routine item also clears its old step/request data, and Undo restores it.


## v30 — Personalised Environment Setup

The **🎧 Make my space easier** support is now fully customisable.

### New features
- Existing checklist items now include visual emoji cues.
- Every item can be edited and reordered.
- Families can add their own personalised environmental supports.
- Custom supports can choose an emoji and use personalised wording.
- Custom supports can be removed with confirmation + Undo.
- Any item can have an optional photo added from the device.
- Photos are compressed and stored locally on that device only.
- Emoji + text + order + usual-setup choices are stored inside `taskBreakdownProgress.__spaceSetup`, so they can travel through the current family-sync structure.
- Families can save a **⭐ My usual setup** and re-tick those items quickly.

### Important photo behaviour
Photos do **not** sync between devices in v30. This avoids putting large image data inside the shared routine JSON. The synced representation remains the emoji + text version.

### Compatibility
V30 keeps the same profile/local-storage keys as V29 and preserves existing routines, templates, parent comments, task-specific steps, support feedback, favourites, Family Calendar, notifications and child name.

Frontend only — no Cloudflare Worker redeploy is required.


## v31 — Multilingual Edition

V31 adds one in-app language selector with:
- English
- 简体中文
- 繁體中文

### How it works
- The language choice is saved locally on each device.
- Parent and child devices can use different languages while sharing the same Family Calendar.
- Built-in Activity Bank labels are language-neutral internally and displayed in the device language.
- All 98 built-in “I’m stuck” guides have English, Simplified Chinese and Traditional Chinese versions.
- User-created content is not automatically rewritten:
  - custom activity names
  - parent comments
  - custom task names
  - custom “I’m stuck” steps
  - personalised environment-support wording
- Shared Family Calendar data remains compatible with earlier versions.

### Traditional Chinese
Traditional Chinese uses child-friendly wording with some Hong Kong-friendly terminology where appropriate.

### Simplified Chinese
Simplified Chinese uses Simplified characters and common everyday wording.

### Compatibility
V31 preserves the existing V9 profile/data keys and all V30 features, including:
- personalised environment setup
- optional local photos
- favourites
- support feedback
- custom “I’m stuck” steps
- parent–child negotiation
- Shared Family Calendar
- notifications and timers

Frontend only — no Cloudflare Worker redeploy is required.


## v31.1 — Multilingual display fix

Fixes dynamic English text that could remain visible after switching to Simplified or Traditional Chinese.

Corrected areas include:
- empty My Sequence message
- no-task message in “I’m stuck”
- “Your saved supports” heading
- all fallback / selected support suggestions

The empty-sequence message now uses a translated data attribute instead of CSS hard-coded text, so it changes correctly with the selected language.

No Cloudflare Worker update is required.

## v33 — Daily Use, Child Focus & OT Review

V33 is cumulative and includes the planned V32 and V33 improvements.

### V32 included
- Start a new day: archives meaningful progress, then resets daily statuses/timers while keeping the routine.
- Child Focus Mode: hides the Activity Bank and advanced controls and shows only the current + next unfinished task.
- App version / reload latest.
- Translation completeness check across core UI plus 98 Activity Bank labels and 98 task guides.

### V33 included
- Daily History / OT Review: completion, task statuses, stuck-helper use, support strategies tried, and an optional reflection note.
- Optional custom-text language versions (English / 简体中文 / 繁體中文).
- Browser-native automatic translation is attempted only where the browser exposes a Translator API; manual language versions always remain available.
- Richer personalised photos for custom Activity Bank items and individual routine tasks. Photos are local to the device and are not sent through Family Sync.

V33 keeps the existing `otRoutinePlannerV9App_...` storage key and current Family Calendar backend structure. No Cloudflare Worker redeploy is required.


## v33.1 — Collapsible Daily History

Daily History is now designed to reduce visual overload.

- The whole **Daily History / OT Review** section is collapsed by default.
- The collapsed header only shows the number of saved records and a **View history** control.
- Opening Daily History shows a compact list of saved days.
- Each saved day is also collapsed by default.
- A daily row shows only a brief summary:
  - date
  - completed tasks / percentage
  - “I’m stuck” use count
  - a compact support-use indicator
- **Show details** expands that one day to reveal task status, support details, notes and delete.
- Reopening the app starts with history collapsed again.
- Focus Mode continues to hide Daily History completely.

All existing V33 history data remains compatible. This is a frontend-only update and does not require a Cloudflare Worker redeploy.


## v33.2 — Photo UX Fix

The custom-activity photo experience has been redesigned.

### Before adding an activity
- Choosing a photo now shows an immediate preview.
- The raw browser filename is no longer the main interface.
- **Choose photo** changes to **Change photo** once a picture is selected.
- **Remove photo** clears the pending photo before the activity is created.
- Keeping no photo is always allowed; the selected emoji remains the fallback visual.

### After the activity is added
- Custom Activity Bank cards keep a visible thumbnail when a photo exists.
- Tapping the 🖼️ button opens a larger photo-management panel.
- The panel shows the photo clearly and offers:
  - Choose / Change photo
  - Remove photo
  - Close photo options
- Removing a photo keeps the custom activity and falls back to its emoji.

Photos continue to be compressed and stored only on the current device. They are not placed in Shared Family Calendar JSON.

V33.2 keeps all V33.1 data and features. No Cloudflare Worker redeploy is required.


## v33.3 — Time + Support Feedback UX

### End Time
- End Time is now displayed inside the same task-settings row as Start Time.
- It uses the same field size, border, colour and typography as the other task fields.
- End Time is read-only and continues to calculate automatically from Start Time + Duration.
- It now always uses a 12-hour display with AM / PM, e.g. `02:31 PM`.

### Support feedback
- “Did this help?” is no longer permanently shown on every support card.
- “This helps me” remains the separate action for saving a strategy to My Support Toolkit.
- Feedback appears only after the support has actually been used:
  - after the 5-minute start timer finishes
  - after a planned break finishes
  - after One step at a time is used
  - after an Ask for help phrase is used
  - after “Done setting up” for Make my space easier
  - after “I tried this” for Work with someone nearby
- My Support Toolkit no longer shows rating counts, reducing visual clutter.
- Daily History / OT Review keeps support-use details and now stores the contextual 👍 / 😐 / 👎 feedback for that day.

V33.3 preserves the same app storage key, existing routines, Family Calendar, photos, history and all V33.2 features. No Cloudflare Worker redeploy is required.


## V34 — Parent I’m Stuck Alerts + Support Toolkit UX

- Parent-mode devices can optionally turn on **I’m Stuck alerts** for that specific Parent device.
- The setting is OFF by default and requires background notifications on that Parent device.
- When a Kid-mode device presses **Break it down** in the I’m Stuck helper, the V34 Cloudflare backend can notify opted-in Parent devices.
- The backend applies a 10-minute per-task cooldown to avoid repeated alerts.
- The child sees a brief transparent confirmation only when a Parent notification was actually sent or was recently sent.
- **My Support Toolkit** now appears inside the I’m Stuck area, directly above **What might help me right now?**
- Saved supports now have an explicit **Remove** action with Undo.
- The support card also clearly shows **In My Toolkit · tap to remove** when already selected.
- Existing routines, templates, support feedback, Family Calendar data, photos and local storage keys remain compatible.

Requires the V34 Cloudflare Worker backend for Parent I’m Stuck push alerts.


## V34.1 — Photo Picker Reliability Fix

- Custom Activity photo picker now uses a native label-to-file-input trigger instead of relying only on a programmatic hidden-input click.
- Explicitly supports JPG/JPEG, PNG, WebP and GIF.
- Mac screenshots (PNG) are supported.
- Uses `createImageBitmap()` where available, with a browser `Image` fallback.
- Shows “Reading photo…” while processing.
- Shows the selected filename when the preview is ready.
- Shows a clear error if the browser cannot read the photo instead of silently doing nothing.
- Existing custom-activity, task and environment photo flows use the same improved decoder.
- HEIC/HEIF may still depend on browser support; JPG/PNG/WebP are recommended.
- No Cloudflare Worker update is required.
