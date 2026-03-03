/**
 * Tests for IndexedDB Activity Queue
 * Tests offline storage and sync functionality
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { activityQueueDB } from '../src/services/activityQueueDB';

// Mock IndexedDB for testing
class MockIDBDatabase {
  objectStoreNames = {
    contains: vi.fn(() => true)
  };
  transaction = vi.fn();
  close = vi.fn();
}

class MockIDBRequest {
  result: any = null;
  error: any = null;
  onsuccess: ((event: any) => void) | null = null;
  onerror: ((event: any) => void) | null = null;
}

class MockIDBTransaction {
  objectStore = vi.fn();
}

class MockIDBObjectStore {
  add = vi.fn();
  get = vi.fn();
  getAll = vi.fn();
  delete = vi.fn();
  put = vi.fn();
  clear = vi.fn();
  count = vi.fn();
  createIndex = vi.fn();
}

describe('ActivityQueueDB', () => {
  let mockDB: MockIDBDatabase;
  let mockStore: MockIDBObjectStore;
  let mockTransaction: MockIDBTransaction;

  beforeEach(() => {
    // Setup mocks
    mockDB = new MockIDBDatabase();
    mockStore = new MockIDBObjectStore();
    mockTransaction = new MockIDBTransaction();
    
    mockTransaction.objectStore.mockReturnValue(mockStore);
    mockDB.transaction.mockReturnValue(mockTransaction);

    // Mock indexedDB.open
    const mockOpenRequest = new MockIDBRequest();
    mockOpenRequest.result = mockDB;
    
    vi.spyOn(indexedDB, 'open').mockReturnValue(mockOpenRequest as any);
    
    // Trigger onsuccess immediately
    setTimeout(() => {
      if (mockOpenRequest.onsuccess) {
        mockOpenRequest.onsuccess({ target: mockOpenRequest } as any);
      }
    }, 0);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('add', () => {
    it('should add an activity to the queue', async () => {
      const activity = {
        userId: 'user123',
        activityType: 'tool_access',
        metadata: { toolName: 'BMI Calculator' }
      };

      const mockAddRequest = new MockIDBRequest();
      mockStore.add.mockReturnValue(mockAddRequest);

      const addPromise = activityQueueDB.add(activity);

      // Trigger success
      setTimeout(() => {
        if (mockAddRequest.onsuccess) {
          mockAddRequest.onsuccess({} as any);
        }
      }, 0);

      const id = await addPromise;

      expect(id).toMatch(/^activity_\d+_[a-z0-9]+$/);
      expect(mockStore.add).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
          activity,
          timestamp: expect.any(Number),
          retryCount: 0
        })
      );
    });

    it('should handle add errors gracefully', async () => {
      const activity = {
        userId: 'user123',
        activityType: 'tool_access',
        metadata: {}
      };

      const mockAddRequest = new MockIDBRequest();
      mockAddRequest.error = new Error('Add failed');
      mockStore.add.mockReturnValue(mockAddRequest);

      const addPromise = activityQueueDB.add(activity);

      // Trigger error
      setTimeout(() => {
        if (mockAddRequest.onerror) {
          mockAddRequest.onerror({} as any);
        }
      }, 0);

      await expect(addPromise).rejects.toThrow();
    });
  });

  describe('getAll', () => {
    it('should retrieve all pending activities', async () => {
      const mockActivities = [
        {
          id: 'activity_1',
          activity: { userId: 'user1', activityType: 'tool_access' },
          timestamp: Date.now(),
          retryCount: 0
        },
        {
          id: 'activity_2',
          activity: { userId: 'user2', activityType: 'result_generation' },
          timestamp: Date.now(),
          retryCount: 1
        }
      ];

      const mockGetAllRequest = new MockIDBRequest();
      mockGetAllRequest.result = mockActivities;
      mockStore.getAll.mockReturnValue(mockGetAllRequest);

      const getAllPromise = activityQueueDB.getAll();

      // Trigger success
      setTimeout(() => {
        if (mockGetAllRequest.onsuccess) {
          mockGetAllRequest.onsuccess({} as any);
        }
      }, 0);

      const activities = await getAllPromise;

      expect(activities).toEqual(mockActivities);
      expect(activities).toHaveLength(2);
    });

    it('should return empty array on error', async () => {
      const mockGetAllRequest = new MockIDBRequest();
      mockGetAllRequest.error = new Error('GetAll failed');
      mockStore.getAll.mockReturnValue(mockGetAllRequest);

      const getAllPromise = activityQueueDB.getAll();

      // Trigger error
      setTimeout(() => {
        if (mockGetAllRequest.onerror) {
          mockGetAllRequest.onerror({} as any);
        }
      }, 0);

      const activities = await getAllPromise;

      expect(activities).toEqual([]);
    });
  });

  describe('remove', () => {
    it('should remove an activity from the queue', async () => {
      const activityId = 'activity_123';

      const mockDeleteRequest = new MockIDBRequest();
      mockStore.delete.mockReturnValue(mockDeleteRequest);

      const removePromise = activityQueueDB.remove(activityId);

      // Trigger success
      setTimeout(() => {
        if (mockDeleteRequest.onsuccess) {
          mockDeleteRequest.onsuccess({} as any);
        }
      }, 0);

      await removePromise;

      expect(mockStore.delete).toHaveBeenCalledWith(activityId);
    });
  });

  describe('updateRetryCount', () => {
    it('should update retry count for an activity', async () => {
      const activityId = 'activity_123';
      const existingActivity = {
        id: activityId,
        activity: { userId: 'user1', activityType: 'tool_access' },
        timestamp: Date.now(),
        retryCount: 0
      };

      const mockGetRequest = new MockIDBRequest();
      mockGetRequest.result = existingActivity;
      mockStore.get.mockReturnValue(mockGetRequest);

      const mockPutRequest = new MockIDBRequest();
      mockStore.put.mockReturnValue(mockPutRequest);

      const updatePromise = activityQueueDB.updateRetryCount(activityId, 2);

      // Trigger get success
      setTimeout(() => {
        if (mockGetRequest.onsuccess) {
          mockGetRequest.onsuccess({} as any);
        }
      }, 0);

      // Trigger put success
      setTimeout(() => {
        if (mockPutRequest.onsuccess) {
          mockPutRequest.onsuccess({} as any);
        }
      }, 10);

      await updatePromise;

      expect(mockStore.put).toHaveBeenCalledWith(
        expect.objectContaining({
          id: activityId,
          retryCount: 2
        })
      );
    });
  });

  describe('count', () => {
    it('should return the count of pending activities', async () => {
      const mockCountRequest = new MockIDBRequest();
      mockCountRequest.result = 5;
      mockStore.count.mockReturnValue(mockCountRequest);

      const countPromise = activityQueueDB.count();

      // Trigger success
      setTimeout(() => {
        if (mockCountRequest.onsuccess) {
          mockCountRequest.onsuccess({} as any);
        }
      }, 0);

      const count = await countPromise;

      expect(count).toBe(5);
    });

    it('should return 0 on error', async () => {
      const mockCountRequest = new MockIDBRequest();
      mockCountRequest.error = new Error('Count failed');
      mockStore.count.mockReturnValue(mockCountRequest);

      const countPromise = activityQueueDB.count();

      // Trigger error
      setTimeout(() => {
        if (mockCountRequest.onerror) {
          mockCountRequest.onerror({} as any);
        }
      }, 0);

      const count = await countPromise;

      expect(count).toBe(0);
    });
  });

  describe('clear', () => {
    it('should clear all activities from the queue', async () => {
      const mockClearRequest = new MockIDBRequest();
      mockStore.clear.mockReturnValue(mockClearRequest);

      const clearPromise = activityQueueDB.clear();

      // Trigger success
      setTimeout(() => {
        if (mockClearRequest.onsuccess) {
          mockClearRequest.onsuccess({} as any);
        }
      }, 0);

      await clearPromise;

      expect(mockStore.clear).toHaveBeenCalled();
    });
  });
});
