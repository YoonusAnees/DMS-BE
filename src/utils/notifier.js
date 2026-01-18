// services/notifier.js
import axios from 'axios';

class NotifierService {
  constructor() {
    this.apiKey = process.env.NOTIFIER_API_KEY;
    this.baseURL = process.env.NOTIFIER_BASE_URL || 'https://api.notifer.com/v1';
  }

  async sendSMS(to, message) {
    try {
      const response = await axios.post(
        `${this.baseURL}/sms/send`,
        {
          to,
          message,
          sender_id: process.env.NOTIFIER_SENDER_ID,
          route: 'transactional' // or 'promotional'
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Notifer SMS error:', error);
      throw error;
    }
  }
}

export default new NotifierService();