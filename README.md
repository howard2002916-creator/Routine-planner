# Routine Planner — GitHub Pages v29

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
