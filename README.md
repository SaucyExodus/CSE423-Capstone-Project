## CSE 423 Capstone Project

This is the start to our Task Management App which runs on Cloud Functions for Firebase.

Team Collaborator:
* Gage Cates
* Hunter Smith
* Annalise LaCourse
* Veda Valiveti

## Setup

Install node version 15.x or later for npm commands. Then install Firebase CLI using this command.
```
npm install -g firebase-tools
```

After Node and Firebase is installed successfully, clone the repository and follow these commands for folder setup. 
```
firebase login
cd functions
npm install
~~firebase functions:config:set slack.signing_secret=xxx~~
~~firebase functions:config:set slack.bot_token=xoxb-111-111-xxx~~
```

## How to deploy
```
firebase deploy
```
