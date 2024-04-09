
const appHomeOpenedCallback = async ({ event, say }) => {
    if (event.tab !== 'home'){
        // Only sends responds on app home.
        return;
    }

    // Send message to user when open app. 
    // Place holder as we will add the UI by using this event.
    say(`Hello world and <@${event.user}>!`)


};

module.exports = { appHomeOpenedCallback };