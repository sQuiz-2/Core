import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || '';

// Notification request headers
const TWITCH_MESSAGE_ID = 'Twitch-Eventsub-Message-Id';
const TWITCH_MESSAGE_TIMESTAMP = 'Twitch-Eventsub-Message-Timestamp';

export function getSecret() {
  return WEBHOOK_SECRET;
}

// Build the message used to get the HMAC.
export function getHmacMessage(request: any) {
  return (
    request.headers[TWITCH_MESSAGE_ID] + request.headers[TWITCH_MESSAGE_TIMESTAMP] + request.body
  );
}

// Get the HMAC.
export function getHmac(secret: any, message: any) {
  return crypto.createHmac('sha256', secret).update(message).digest('hex');
}

// Verify whether our hash matches the hash that Twitch passed in the header.
export function verifyMessage(hmac: any, verifySignature: any) {
  return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(verifySignature));
}
