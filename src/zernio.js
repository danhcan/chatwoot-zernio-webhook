import Zernio from '@zernio/node';

let zernioClient;

function getZernioClient() {
  if (!zernioClient) {
    const apiKey = process.env.ZERNIO_API_KEY;
    if (!apiKey) {
      throw new Error('ZERNIO_API_KEY not set in environment');
    }
    zernioClient = new Zernio(apiKey);
  }
  return zernioClient;
}

export async function postToZernio({ platform, content, conversationId }) {
  try {
    const client = getZernioClient();

    console.log(`Posting to Zernio [${platform}]:`, content);

    const result = await client.post({
      platform,
      content,
      metadata: {
        chatwootConversationId: conversationId,
      },
    });

    console.log('Zernio post successful:', result);
    return result;
  } catch (error) {
    console.error('Error posting to Zernio:', error);
    throw error;
  }
}

export async function getZernioAnalytics(postId) {
  try {
    const client = getZernioClient();
    const analytics = await client.analytics.get(postId);
    return analytics;
  } catch (error) {
    console.error('Error getting Zernio analytics:', error);
    throw error;
  }
}
