import { ListPostRes } from './get-list-post-by-status-reponse';

export interface GetRecommendationsResponse {
  posts: ListPostRes[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
  processingTimeMs: number;
  recommendationLogId?: number;  // For click tracking
}

