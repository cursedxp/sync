const rateLimit = new Map<string, { count: number; resetTime: number }>();

const WINDOW_DURATION = 24 * 60 * 60 * 1000; //24 hours
const MAX_REQUESTS = 5;

export default function rateLimitEmail(email: string) {
  const now = Date.now();
  const emailRecord = rateLimit.get(email);

  if (!emailRecord) {
    rateLimit.set(email, { count: 1, resetTime: now + WINDOW_DURATION });
    return true;
  }

  if (now > emailRecord.resetTime) {
    rateLimit.set(email, { count: 1, resetTime: now + WINDOW_DURATION });
    return true;
  }

  if (emailRecord.count >= MAX_REQUESTS) {
    return false;
  }

  emailRecord.count++;
  rateLimit.set(email, emailRecord);
  return true;
}

setInterval(() => {
  const now = Date.now();
  rateLimit.forEach((record, email) => {
    if (now > record.resetTime) {
      rateLimit.delete(email);
    }
  });
}, WINDOW_DURATION);
