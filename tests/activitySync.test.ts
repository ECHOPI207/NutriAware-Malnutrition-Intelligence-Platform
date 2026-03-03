/**
 * Tests for Activity Sync Functionality
 * Tests offline queue and automatic sync
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { syncPendingActivities } from '../src/services/activityTracker';
import { activityQueueDB } from '../src/services/activityQueueDB';

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  serverTimestamp: vi.fn(() => 'mock-timestamp'),
  Timestamp: class {
    static now() {
      return { seconds: Date.now() / 1000, nanoseconds: 0 };
    }
  }
}));

vi.mock('../src/lib/firebase', () => ({
  db: {},
  auth: {
    currentUser: { uid: 'user123', email: 'test@example.com' }
  }
}));

// Mock activityQueueDB
vi.mock('../src/services/activityQueueDB', () => ({
  activityQueueDB: {
    getAll: vi.fn(),
    remove: vi.fn(),
    updateRetryCount: vi.fn(),
    add: vi.fn(),
    count: vi.fn(),
    clear: vi.fn()
  }
}));

import { addDoc } from 'firebase/firestore';

describe('Activity Sync', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('syncPendingActivities', () => {
    it('should sync pending activities when online', async () => {
      const mockActivities = [
        {
          id: 'activity_1',
          activity: {
            userId: 'user123',
            activityType: 'tool_access',
            metadata: { toolName: 'BMI Calculator' }
          },
          timestamp: Date.now(),
          retryCount: 0
        },
        {
          id: 'activity_2',
          activity: {
            userId: 'user123',
            activityType: 'result_generation',
            metadata: { toolName: 'Meal Planner', resultType: 'meal_plan' }
          },
          timestamp: Date.now(),
          retryCount: 0
        }
      ];

      vi.mocked(activityQueueDB.getAll).mockResolvedValue(mockActivities);
      vi.mocked(addDoc).mockResolvedValue({ id: 'doc123' } as any);
      vi.mocked(activityQueueDB.remove).mockResolvedValue(undefined);

      await syncPendingActivities();

      // Should have synced both activities
      expect(addDoc).toHaveBeenCalledTimes(2);
      expect(activityQueueDB.remove).toHaveBeenCalledTimes(2);
      expect(activityQueueDB.remove).toHaveBeenCalledWith('activity_1');
      expect(activityQueueDB.remove).toHaveBeenCalledWith('activity_2');
    });

    it('should skip sync when offline', async () => {
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      });

      vi.mocked(activityQueueDB.getAll).mockResolvedValue([]);

      await syncPendingActivities();

      // Should not attempt to sync
      expect(activityQueueDB.getAll).not.toHaveBeenCalled();
      expect(addDoc).not.toHaveBeenCalled();
    });

    it('should skip activities that exceeded max retry count', async () => {
      const mockActivities = [
        {
          id: 'activity_1',
          activity: {
            userId: 'user123',
            activityType: 'tool_access',
            metadata: { toolName: 'BMI Calculator' }
          },
          timestamp: Date.now(),
          retryCount: 5 // Max retries exceeded
        }
      ];

      vi.mocked(activityQueueDB.getAll).mockResolvedValue(mockActivities);
      vi.mocked(activityQueueDB.remove).mockResolvedValue(undefined);

      await syncPendingActivities();

      // Should remove the activity without syncing
      expect(addDoc).not.toHaveBeenCalled();
      expect(activityQueueDB.remove).toHaveBeenCalledWith('activity_1');
    });

    it('should update retry count on sync failure', async () => {
      const mockActivities = [
        {
          id: 'activity_1',
          activity: {
            userId: 'user123',
            activityType: 'tool_access',
            metadata: { toolName: 'BMI Calculator' }
          },
          timestamp: Date.now(),
          retryCount: 0
        }
      ];

      vi.mocked(activityQueueDB.getAll).mockResolvedValue(mockActivities);
      vi.mocked(addDoc).mockRejectedValue(new Error('Network error'));
      vi.mocked(activityQueueDB.updateRetryCount).mockResolvedValue(undefined);

      await syncPendingActivities();

      // Should update retry count
      expect(activityQueueDB.updateRetryCount).toHaveBeenCalledWith('activity_1', 1);
      expect(activityQueueDB.remove).not.toHaveBeenCalled();
    });

    it('should handle empty queue gracefully', async () => {
      vi.mocked(activityQueueDB.getAll).mockResolvedValue([]);

      await syncPendingActivities();

      // Should not attempt any operations
      expect(addDoc).not.toHaveBeenCalled();
      expect(activityQueueDB.remove).not.toHaveBeenCalled();
    });

    it('should stop syncing when connection is lost during sync', async () => {
      const mockActivities = [
        {
          id: 'activity_1',
          activity: {
            userId: 'user123',
            activityType: 'tool_access',
            metadata: { toolName: 'BMI Calculator' }
          },
          timestamp: Date.now(),
          retryCount: 0
        },
        {
          id: 'activity_2',
          activity: {
            userId: 'user123',
            activityType: 'result_generation',
            metadata: { toolName: 'Meal Planner' }
          },
          timestamp: Date.now(),
          retryCount: 0
        }
      ];

      vi.mocked(activityQueueDB.getAll).mockResolvedValue(mockActivities);
      
      // First sync fails and goes offline
      vi.mocked(addDoc).mockImplementation(() => {
        Object.defineProperty(navigator, 'onLine', {
          writable: true,
          value: false
        });
        return Promise.reject(new Error('Network error'));
      });
      
      vi.mocked(activityQueueDB.updateRetryCount).mockResolvedValue(undefined);

      await syncPendingActivities();

      // Should only attempt first activity
      expect(addDoc).toHaveBeenCalledTimes(1);
      expect(activityQueueDB.updateRetryCount).toHaveBeenCalledTimes(1);
    });
  });

  describe('Offline Queue Behavior', () => {
    it('should queue activities when offline', async () => {
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      });

      vi.mocked(activityQueueDB.add).mockResolvedValue('activity_123');

      // Import after mocking to ensure mocks are in place
      const { trackToolAccess } = await import('../src/services/activityTracker');

      await trackToolAccess('BMI Calculator');

      // Should have queued the activity
      expect(activityQueueDB.add).toHaveBeenCalled();
    });
  });

  describe('localStorage Fallback', () => {
    it('should use localStorage as fallback when IndexedDB fails', async () => {
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      });

      // Mock IndexedDB failure
      vi.mocked(activityQueueDB.add).mockRejectedValue(new Error('IndexedDB failed'));

      // Mock localStorage
      const localStorageMock = {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
        removeItem: vi.fn()
      };
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true
      });

      const { trackToolAccess } = await import('../src/services/activityTracker');

      await trackToolAccess('BMI Calculator');

      // Should have used localStorage as fallback
      expect(localStorageMock.setItem).toHaveBeenCalled();
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'nutriaware_activity_fallback',
        expect.any(String)
      );
    });
  });
});
