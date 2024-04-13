
const appHomeOpenedCallback = async ({ event, client }) => {
    if (event.tab !== 'home'){
        // Only sends responds on app home.
        return;
    }

    try {

        const result = client.views.publish({

            user_id: event.user,

            view: {
                type: 'home',
                callback_id: 'home_view',

                blocks: [
                    {
                        "type": "header",
                        "text": {
                            "type": "plain_text",
                            "text": "Here's what you can do with Project Tracker:"
                        }
                    },
                    {
                        "type": "actions",
                        "elements": [
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Create New Task",
                                    "emoji": true
                                },
                                "style": "primary",
                                "value": "create_task",
                                "action_id":"create_task"
                            },
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Create New Project",
                                    "emoji": true
                                },
                                "value": "create_project"
                            },
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Help",
                                    "emoji": true
                                },
                                "value": "help"
                            }
                        ]
                    },
                    {
                        "type": "context",
                        "elements": [
                            {
                                "type": "image",
                                "image_url": "https://api.slack.com/img/blocks/bkb_template_images/placeholder.png",
                                "alt_text": "placeholder"
                            }
                        ]
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Your Configurations*"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "divider"
                    }

                ]
            }
        });
    }

    catch (error) {
        console.error(error);
    }
};

module.exports = { appHomeOpenedCallback };