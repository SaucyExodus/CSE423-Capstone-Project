const { App } = require('@slack/bolt');

const createNewTaskModal = async ({ trigger_id }) => {
    try {
        await App.client.views.open({
            trigger_id,
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
    
    } catch (error) {
        console.error(error);
    }
};

module.exports = { createNewTaskModal };
