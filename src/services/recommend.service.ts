import { axios_auth } from '@/config/axios-auth';
import ResponseData from '@/types/response.type';
import { GetRecommendationsResponse } from './types/recommend-response';
import { ListPostRes } from './types/get-list-post-by-status-reponse';

// Backend response format
interface BackendRecommendResponse {
  success: boolean;
  data: ListPostRes[];
  total: number;
  processingTimeMs: number;
}

export class RecommendService {
  /**
   * Get personalized recommendations for authenticated user
   * @param limit - Number of recommendations to fetch (default: 100)
   */
  async getRecommendations(limit: number = 100): Promise<GetRecommendationsResponse> {
    try {
      const response = await axios_auth.get<BackendRecommendResponse>(
        '/api/recommend',
        {
          params: { limit }
        }
      );

      // Backend returns: { success: true, data: [...posts], total: X, processingTimeMs: Y }
      if (response.data.success && response.data.data) {
        return {
          posts: response.data.data,
          total: response.data.total || 0,
          processingTimeMs: response.data.processingTimeMs || 0
        };
      }

      // Handle non-success response
      console.warn('[RecommendService] Non-success response:', response.data);
      return {
        posts: [],
        total: 0,
        processingTimeMs: 0
      };
    } catch (error) {
      // Silent fail - don't break UX if recommendation service is down
      console.error('[RecommendService] Failed to fetch recommendations:', error);
      return {
        posts: [],
        total: 0,
        processingTimeMs: 0
      };
    }
  }

  /**
   * Health check for recommendation service
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios_auth.get<ResponseData<{ status: string }>>(
        '/api/recommend/health'
      );
      return response.data.status === 200;
    } catch (error) {
      console.error('[RecommendService] Health check failed:', error);
      return false;
    }
  }
}

export const recommendService = new RecommendService();

