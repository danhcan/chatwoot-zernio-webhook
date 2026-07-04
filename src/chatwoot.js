import { postToZernio } from './zernio.js';

export async function handleChatwootWebhook(payload) {
  const { event, message_type, content, conversation, sender } = payload;

  console.log(`Processing event: ${event}`);

  switch (event) {
    case 'message_created':
      if (message_type === 'incoming') {
        await handleIncomingMessage({
          content,
          conversation,
          sender,
        });
      }
      break;

    case 'conversation_created':
      await handleNewConversation(conversation);
      break;

    case 'conversation_status_changed':
      await handleStatusChange(conversation);
      break;

    default:
      console.log(`Unhandled event type: ${event}`);
  }
}

async function handleIncomingMessage({ content, conversation, sender }) {
  console.log(`New message from ${sender?.name}: ${content}`);

  const platform = conversation?.meta?.sender?.social_profiles?.[0]?.type || 'unknown';

  if (['instagram', 'facebook', 'twitter', 'linkedin'].includes(platform)) {
    await postToZernio({
      platform,
      content: `Reply from support: ${content}`,
      conversationId: conversation?.id,
    });
  }
}

async function handleNewConversation(conversation) {
  console.log(`New conversation created: ${conversation?.id}`);
}

async function handleStatusChange(conversation) {
  console.log(`Conversation ${conversation?.id} status changed to: ${conversation?.status}`);
}
