import { ListPostRes } from './get-list-post-by-status-reponse';

export interface GetRecommendationsResponse {
  posts: ListPostRes[];
  total: number;
  processingTimeMs: number;
}

