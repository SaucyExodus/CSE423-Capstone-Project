const { App } = require('@slack/bolt');

const kanbanBoardModal = async ({ trigger_id, client }) => {
    try {
        await client.views.open({
            trigger_id,
            view: {
                "type": "modal",
                "title": {
                    "type": "plain_text",
                    "text": "Kanban Board",
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
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Hello! This is a placeholder for the Kanban board UI to ensure the button is working properly. To add the UI here, go to the file kanban_board.js in the commands folder."
                        }
                    }
                ]
            }
    });
    
    } catch (error) {
        console.error(error);
    }
};

module.exports = { kanbanBoardModal };
