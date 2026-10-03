# Routine Planner — GitHub Pages v23

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
