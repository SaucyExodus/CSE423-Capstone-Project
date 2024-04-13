const functions = require('firebase-functions');
const config = functions.config();

const { App, ExpressReceiver } = require('@slack/bolt');
const { registerListeners } = require('./listeners');


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
registerListeners(app);

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

app.action('create_task', async ({ body, ack, client }) => {
    // Acknowledge the action
    await ack();
    console.log(body)
    try {
      // Call views.update with the built-in client
      await client.views.update({
          // Pass the view_id
          view_id: body.view.id,
          // Pass the current hash to avoid race conditions
          hash: body.view.hash,
          // View payload with updated blocks
   
          /* body of the view */
          view: {
            "type": "modal",
            "title": {
                "type": "plain_text",
                "text": "Create new task",
                "emoji": true
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true
            },
            "close": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": true
            },
            "blocks": [
                {
                    "type": "divider"
                },
                {
                    "type": "input",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "plain_text_input-action",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Enter your task here",
                            "emoji": true
                        }
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "New task",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "element": {
                        "type": "multi_users_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select users",
                            "emoji": true
                        },
                        "action_id": "multi_users_select-action"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Assign user",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "element": {
                        "type": "datepicker",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select a date",
                            "emoji": true
                        },
                        "action_id": "datepicker-action"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Due date ",
                        "emoji": true
                    },
                    "optional": true
                },
                {
                    "type": "input",
                    "element": {
                        "type": "timepicker",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select time",
                            "emoji": true
                        },
                        "action_id": "timepicker-action"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Time",
                        "emoji": true
                    },
                    "optional": true
                }
            ]
        }
    });
}
      catch (error) {
        console.error(error);
      }
  });

exports.myBot = functions.https.onRequest(expressReceiver.app);