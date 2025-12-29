// Messaging service implementation using local storage
// Stores messages locally for offline capability

export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  read: boolean;
}

export const messagingService = {
  async sendMessage(message: Omit<Message, 'id' | 'timestamp'>): Promise<void> {
    // Persist message to local storage
    try {
      const messages = JSON.parse(localStorage.getItem('messages') || '[]');
      messages.push({
        ...message,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('messages', JSON.stringify(messages.slice(-50))); // Keep last 50 messages
    } catch (error) {
      }
  },

  async getMessages(): Promise<Message[]> {
    try {
      const messages = JSON.parse(localStorage.getItem('messages') || '[]');
      return messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    } catch (error) {
      return [];
    }
  }
};