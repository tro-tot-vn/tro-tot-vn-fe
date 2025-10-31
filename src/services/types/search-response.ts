import { ListPostRes } from "./get-list-post-by-status-reponse";

/**
 * Pagination information for offset-based pagination
 */
export interface SearchPagination {
  /** Current page number (starts from 1) */
  page: number;
  
  /** Number of items per page */
  pageSize: number;
  
  /** Total number of results */
  total: number;
  
  /** Total number of pages */
  totalPages: number;
}

/**
 * Response from hybrid vector search API
 */
export interface SearchResponse {
  /** Array of search results (posts) */
  data: ListPostRes[];
  
  /** Pagination information */
  pagination: SearchPagination;
  
  /** Search execution time in milliseconds */
  searchTimeMs: number;
}

