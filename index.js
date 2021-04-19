const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
require('dotenv').config();

// Read a token from the environment variables
const token = process.env.SLACK_OAUTH_TOKEN;
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
// Initialize
const web = new WebClient(token);
let conversationId = "D01U8JSJMNK";

// (async () => {

//     // Post a message to the channel, and await the result.
//     // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
//     const result = await web.chat.postMessage({
//       text: 'Hello world!',
//       channel: conversationId,
//     });
  
//     // The result contains an identifier for the message, `ts`.
//     console.log(`Successfully send message ${result.ts} in conversation ${conversationId}`);
//   })();

const slackEvents = createEventAdapter(slackSigningSecret);
const port = process.env.PORT || 9999;

slackEvents.on('message', (event) => {
    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
  });
  
  (async () => {
    const server = await slackEvents.start(port);
    console.log(`Listening for events on ${server.address().port}`);
  })();
