import { getHmac, getHmacMessage, getSecret, verifyMessage } from './crypto';

// Notification request headers
const TWITCH_MESSAGE_SIGNATURE = 'Twitch-Eventsub-Message-Signature';

// Prepend this string to the HMAC that's created from the message
const HMAC_PREFIX = 'sha256=';

export function isValidMessage(req: any) {
  const secret = getSecret();
  const message = getHmacMessage(req);
  const hmac = HMAC_PREFIX + getHmac(secret, message); // Signature to compare
  if (verifyMessage(hmac, req.headers[TWITCH_MESSAGE_SIGNATURE]) === true) {
    return true;
  } else {
    return false;
  }
}
