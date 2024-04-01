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

app.error(console.log);

app.command('/echo-from-firebase', async ({ command, ack, say }) => {

    await ack();

    await say(`You said "${command.text}"`)
})

exports.myBot = functions.https.onRequest(expressReceiver.app);
