import { axios_auth } from "@/config/axios-auth";
import ResponseData from "@/types/response.type";
import { SearchResponse } from "./types/search-response";

export interface SearchParams {
  query: string;
  city?: string;
  district?: string;
  ward?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  interiorCondition?: string;
  page?: number;
  pageSize?: number;
}

export class SearchService {
  /**
   * Hybrid vector search with offset pagination
   * @param params Search parameters
   * @returns Search results with pagination
   */
  async search(params: SearchParams): Promise<SearchResponse> {
    // Map FE params to BE params (minArea → acreageMin, maxArea → acreageMax)
    const queryParams: Record<string, unknown> = {
      query: params.query,
      page: params.page || 1,
      pageSize: params.pageSize || 20,
    };

    // Add optional location filters
    if (params.city) queryParams.city = params.city;
    if (params.district) queryParams.district = params.district;
    if (params.ward) queryParams.ward = params.ward;

    // Map price range (minPrice → priceMin, maxPrice → priceMax)
    if (params.minPrice !== undefined) queryParams.priceMin = params.minPrice;
    if (params.maxPrice !== undefined) queryParams.priceMax = params.maxPrice;

    // Map area range (minArea → acreageMin, maxArea → acreageMax)
    if (params.minArea !== undefined) queryParams.acreageMin = params.minArea;
    if (params.maxArea !== undefined) queryParams.acreageMax = params.maxArea;

    // Add interior condition filter
    if (params.interiorCondition)
      queryParams.interiorCondition = params.interiorCondition;

    // Call new search API endpoint
    const response = await axios_auth.get<ResponseData<SearchResponse>>(
      "api/search",
      { params: queryParams }
    );

    if (!response.data.data) {
      throw new Error("Search service returned no data");
    }

    return response.data.data;
  }

  /**
   * Health check for search service
   * @returns true if search service is healthy
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios_auth.get<ResponseData<{ status: string }>>(
        "api/search/health"
      );
      return response.status === 200 && response.data.data?.status === "healthy";
    } catch (error) {
      console.error("[SearchService] Health check failed:", error);
      return false;
    }
  }
}

