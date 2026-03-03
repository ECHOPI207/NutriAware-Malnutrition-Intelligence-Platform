import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ActivityAction, ActivityEntry } from '../src/services/activityTracker';

// Mock Firebase functions
vi.mock('firebase/firestore', () => ({
    collection: vi.fn(),
    addDoc: vi.fn(),
    serverTimestamp: vi.fn(() => 'mock-timestamp'),
}));

vi.mock('../src/lib/firebase', () => ({
    db: {},
    auth: {
        currentUser: { uid: 'user123', email: 'test@example.com' }
    }
}));

import { logUserActivity } from '../src/services/activityTracker';
import { addDoc, collection } from 'firebase/firestore';

describe('ActivityTracker Module', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('logs an activity correctly when user is authenticated', async () => {
        const entry: ActivityEntry = {
            action: 'login',
            category: 'auth',
            details: 'Test login'
        };

        // We run it
        await logUserActivity(entry);

        // Expect addDoc to have been called with activity_logs collection and correct shaped data
        expect(addDoc).toHaveBeenCalledTimes(1);

        // Grab the arguments
        const args = vi.mocked(addDoc).mock.calls[0];
        const payload = args[1] as any;

        expect(payload).toMatchObject({
            user_id: 'user123',
            user_email: 'test@example.com',
            action_type: 'login',
            category: 'auth',
            details: 'Test login'
        });

        // It should also contain timestamp, path, agent
        expect(payload.timestamp).toBe('mock-timestamp');
        expect(payload.path).toBeDefined();
        expect(payload.user_agent).toBeDefined();
    });

    it('silently fails if auth.currentUser is null without throwing error', async () => {
        // Redefine auth mock for this isolate test
        const { auth } = await import('../src/lib/firebase');
        (auth as any).currentUser = null;

        const entry: ActivityEntry = { action: 'login', category: 'auth', details: 'No user' };

        // Ensure no throw
        await expect(logUserActivity(entry)).resolves.toBeUndefined();

        // AddDoc should NOT have been called
        expect(addDoc).not.toHaveBeenCalled();

        // Restore for other tests
        (auth as any).currentUser = { uid: 'user123', email: 'test@example.com' };
    });
});
