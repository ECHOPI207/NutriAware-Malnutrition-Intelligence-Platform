// Session management for anonymous user tracking

const SESSION_KEY = 'nutriaware_session_id';

/**
 * Get or create a session ID for anonymous user tracking
 * @returns {string} UUID session identifier
 */
export function getSessionId(): string {
  // Check if session ID exists in localStorage
  let sessionId = localStorage.getItem(SESSION_KEY);

  // If not, create a new one
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }

  return sessionId;
}

/**
 * Clear the current session ID (useful for testing or reset)
 */
export function clearSessionId(): void {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Check if a session ID exists
 * @returns {boolean} True if session exists
 */
export function hasSession(): boolean {
  return localStorage.getItem(SESSION_KEY) !== null;
}
