const functions = require('firebase-functions');
const config = functions.config();

const { App, ExpressReceiver } = require('@slack/bolt');
const expressReceiver = new ExpressReceiver({
    signingSecret: config.slack.signing_secret,
    endpoints: '/events',
    processBeforeResponse: true,
});

const app = new App({
    receiver: expressReceiver,
    token: config.slack.token,
    processBeforeResponse: true,
});

// Error handler
app.error(console.log);

// Handle '/echo-from-firebase' command
app.command('/echo-from-firebase', async ({ command, ack, say }) => {
    // Acknowledge command request
    await ack();
    // Responds with writing in chat.    
    await say(`You said "${command.text}"`)
})

exports.myBot = functions.https.onRequest(expressReceiver.app);
