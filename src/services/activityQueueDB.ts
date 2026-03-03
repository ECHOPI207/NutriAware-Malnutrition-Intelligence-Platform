/**
 * IndexedDB wrapper for activity queue
 * Provides persistent storage for activities when offline
 */

const DB_NAME = 'nutriaware_activity_queue';
const DB_VERSION = 1;
const STORE_NAME = 'pending_activities';

export interface QueuedActivity {
  id: string;
  activity: any;
  timestamp: number;
  retryCount: number;
}

class ActivityQueueDB {
  private db: IDBDatabase | null = null;
  private initPromise: Promise<void> | null = null;

  /**
   * Initialize the IndexedDB database
   */
  private async init(): Promise<void> {
    if (this.db) return;
    
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('[ActivityQueueDB] Failed to open database:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('[ActivityQueueDB] Database opened successfully');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          objectStore.createIndex('timestamp', 'timestamp', { unique: false });
          console.log('[ActivityQueueDB] Object store created');
        }
      };
    });

    return this.initPromise;
  }

  /**
   * Add an activity to the queue
   */
  async add(activity: any): Promise<string> {
    try {
      await this.init();
      
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const id = `activity_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      const queuedActivity: QueuedActivity = {
        id,
        activity,
        timestamp: Date.now(),
        retryCount: 0
      };

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add(queuedActivity);

        request.onsuccess = () => {
          console.log('[ActivityQueueDB] Activity added to queue:', id);
          resolve(id);
        };

        request.onerror = () => {
          console.error('[ActivityQueueDB] Failed to add activity:', request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('[ActivityQueueDB] Error adding activity:', error);
      throw error;
    }
  }

  /**
   * Get all pending activities
   */
  async getAll(): Promise<QueuedActivity[]> {
    try {
      await this.init();
      
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
          const activities = request.result || [];
          console.log(`[ActivityQueueDB] Retrieved ${activities.length} pending activities`);
          resolve(activities);
        };

        request.onerror = () => {
          console.error('[ActivityQueueDB] Failed to get activities:', request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('[ActivityQueueDB] Error getting activities:', error);
      return [];
    }
  }

  /**
   * Remove an activity from the queue
   */
  async remove(id: string): Promise<void> {
    try {
      await this.init();
      
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = () => {
          console.log('[ActivityQueueDB] Activity removed from queue:', id);
          resolve();
        };

        request.onerror = () => {
          console.error('[ActivityQueueDB] Failed to remove activity:', request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('[ActivityQueueDB] Error removing activity:', error);
      throw error;
    }
  }

  /**
   * Update retry count for an activity
   */
  async updateRetryCount(id: string, retryCount: number): Promise<void> {
    try {
      await this.init();
      
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const getRequest = store.get(id);

        getRequest.onsuccess = () => {
          const activity = getRequest.result;
          if (activity) {
            activity.retryCount = retryCount;
            const updateRequest = store.put(activity);
            
            updateRequest.onsuccess = () => {
              console.log('[ActivityQueueDB] Retry count updated:', id, retryCount);
              resolve();
            };
            
            updateRequest.onerror = () => {
              console.error('[ActivityQueueDB] Failed to update retry count:', updateRequest.error);
              reject(updateRequest.error);
            };
          } else {
            resolve();
          }
        };

        getRequest.onerror = () => {
          console.error('[ActivityQueueDB] Failed to get activity for update:', getRequest.error);
          reject(getRequest.error);
        };
      });
    } catch (error) {
      console.error('[ActivityQueueDB] Error updating retry count:', error);
      throw error;
    }
  }

  /**
   * Clear all activities from the queue
   */
  async clear(): Promise<void> {
    try {
      await this.init();
      
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();

        request.onsuccess = () => {
          console.log('[ActivityQueueDB] Queue cleared');
          resolve();
        };

        request.onerror = () => {
          console.error('[ActivityQueueDB] Failed to clear queue:', request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('[ActivityQueueDB] Error clearing queue:', error);
      throw error;
    }
  }

  /**
   * Get the count of pending activities
   */
  async count(): Promise<number> {
    try {
      await this.init();
      
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.count();

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = () => {
          console.error('[ActivityQueueDB] Failed to count activities:', request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('[ActivityQueueDB] Error counting activities:', error);
      return 0;
    }
  }
}

// Export singleton instance
export const activityQueueDB = new ActivityQueueDB();
