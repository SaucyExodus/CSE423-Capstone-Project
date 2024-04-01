## CSE 423 Capstone Project

This is the start to our Task Management App which runs on Cloud Functions for Firebase.

Team Collaborator:
* Gage Cates
* Hunter Smith
* Annalise LaCourse
* Veda Valiveti

## Setup

Install node version 15.x or later for npm commands.

```
npm install -g firebase-tools
firebase login
firebase functions:config:set slack.signing_secret=xxx
firebase functions:config:set slack.bot_token=xoxb-111-111-xxx
```

## How to deploy
```
firebase deploy
```
