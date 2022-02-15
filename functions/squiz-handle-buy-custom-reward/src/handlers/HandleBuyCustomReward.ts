import { applyBadge } from '../tools/applyBadge';
import { isValidMessage } from '../tools/isValidMessage';

// Notification request headers
const MESSAGE_TYPE = 'Twitch-Eventsub-Message-Type';

// Notification message types
const MESSAGE_TYPE_VERIFICATION = 'webhook_callback_verification';
const MESSAGE_TYPE_NOTIFICATION = 'notification';
const MESSAGE_TYPE_REVOCATION = 'revocation';

exports.handleBuyCustomReward = async (req: any) => {
  const success = isValidMessage(req);
  if (success) {
    // Get JSON object from body, so you can process the message.
    const notification = JSON.parse(req.body);

    if (MESSAGE_TYPE_NOTIFICATION === req.headers[MESSAGE_TYPE]) {
      const { user_id: userId, broadcaster_user_id: streamerId, reward } = notification.event;
      console.log('reward.id', reward.id, 'userId', userId, 'streamerId', streamerId);
      await applyBadge(reward.id, userId, streamerId);
      return { statusCode: 204 };
    } else if (MESSAGE_TYPE_VERIFICATION === req.headers[MESSAGE_TYPE]) {
      return { statusCode: 200, body: notification.challenge };
    } else if (MESSAGE_TYPE_REVOCATION === req.headers[MESSAGE_TYPE]) {
      console.log(`${notification.subscription.type} notifications revoked!`);
      console.log(`reason: ${notification.subscription.status}`);
      return { statusCode: 204 };
    } else {
      console.log(`Unknown message type: ${req.headers[MESSAGE_TYPE]}`);
      return { statusCode: 204 };
    }
  } else {
    console.log('403'); // Signatures didn't match.
    return { statusCode: 403 };
  }
};
