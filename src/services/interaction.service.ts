import { axios_auth } from '@/config/axios-auth';

export interface LogContactRequest {
  postId: number;
}

export interface LogContactResponse {
  success: boolean;
  message: string;
}

class InteractionService {
  /**
   * Log contact interaction when user views phone number
   */
  async logContact(postId: number): Promise<LogContactResponse> {
    try {
      const response = await axios_auth.post<LogContactResponse>(
        '/api/interactions/contact',
        { postId }
      );
      return response.data;
    } catch (error) {
      // Silent fail - don't break UX
      console.error('Failed to log contact interaction:', error);
      return {
        success: false,
        message: 'Failed to log interaction'
      };
    }
  }
}

export const interactionService = new InteractionService();

