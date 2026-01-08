import { axios_auth } from '@/config/axios-auth';
import ResponseData from '@/types/response.type';
import { GetRecommendationsResponse } from './types/recommend-response';
import { ListPostRes } from './types/get-list-post-by-status-reponse';

// Backend response format
interface BackendRecommendResponse {
  success: boolean;
  recommendationLogId?: number;
  data: ListPostRes[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
  processingTimeMs: number;
}

export class RecommendService {
  /**
   * Get personalized recommendations for authenticated user
   * @param page - Page number (1-indexed)
   * @param pageSize - Number of items per page (default: 20)
   */
  async getRecommendations(page: number = 1, pageSize: number = 20, logId?: number): Promise<GetRecommendationsResponse> {
    try {
      const params: any = { page, pageSize }
      if (logId) {
        params.logId = logId
      }

      const response = await axios_auth.get<BackendRecommendResponse>(
        '/api/recommend',
        { params }
      );

      // Backend returns: { success: true, recommendationLogId, data, pagination }
      if (response.data.success && response.data.data) {
        return {
          posts: response.data.data,
          pagination: response.data.pagination,
          processingTimeMs: response.data.processingTimeMs || 0,
          recommendationLogId: response.data.recommendationLogId
        };
      }

      // Handle non-success response
      console.warn('[RecommendService] Non-success response:', response.data);
      return {
        posts: [],
        pagination: { page: 1, pageSize: 20, total: 0, hasMore: false },
        processingTimeMs: 0
      };
    } catch (error) {
      // Silent fail - don't break UX if recommendation service is down
      console.error('[RecommendService] Failed to fetch recommendations:', error);
      return {
        posts: [],
        pagination: { page: 1, pageSize: 20, total: 0, hasMore: false },
        processingTimeMs: 0
      };
    }
  }

  /**
   * Log click on recommendation
   */
  async logClick(recommendationLogId: number, recommendationLogItemId: number): Promise<void> {
    try {
      await axios_auth.post('/api/recommend/click', {
        recommendationLogId,
        recommendationLogItemId
      });
      console.log('[RecommendService] Click logged');
    } catch (error) {
      console.error('[RecommendService] Failed to log click:', error);
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

