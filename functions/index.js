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

// Define your Kanban board
let kanbanBoard = {
    columns: {
        todo: [],
        inProgress: [],
        done: []
    }
};

// Handle '/add-task' command to add a task to the Kanban board
app.command('/add-task', async ({ command, ack, say }) => {
    await ack();

    const task = command.text;
    kanbanBoard.columns.todo.push(task);

    await say(`Task "${task}" added to TODO column`);
});

// Handle '/move-task' command to move a task from one column to another
app.command('/move-task', async ({ command, ack, say }) => {
    await ack();

    const [task, targetColumn] = command.text.split(' ');

    for (const column in kanbanBoard.columns) {
        const index = kanbanBoard.columns[column].indexOf(task);
        if (index !== -1) {
            kanbanBoard.columns[column].splice(index, 1);
            break;
        }
    }

    kanbanBoard.columns[targetColumn].push(task);

    await say(`Task "${task}" moved to ${targetColumn.toUpperCase()} column`);
});

// Handle '/show-board' command to display the current state of the Kanban board
app.command('/show-board', async ({ ack, say }) => {
    await ack();

    let boardText = `*Kanban Board:*\n`;

    for (const column in kanbanBoard.columns) {
        boardText += `${column.toUpperCase()}\n`;
        if (kanbanBoard.columns[column].length === 0) {
            boardText += '\t No tasks\n';
        } else {
            boardText += kanbanBoard.columns[column].map(task => `\t- ${task}`).join('\n') + '\n';
        }
    }

    await say(boardText);
});

exports.myBot = functions.https.onRequest(expressReceiver.app);