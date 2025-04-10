import { axios_auth } from "@/config/axios-auth";
import ResponseData from "@/types/response.type";
import {
  GetPostByStatusResponse,
  ListPostRes,
} from "./types/get-list-post-by-status-reponse";
import { GetDetailPostResponse } from "./types/get-detail-post.response";
import { CursorPaging } from "./types/paging-response";

export class PostService {
  createPost = async (data: FormData) => {
    const res = await axios_auth.post<ResponseData<object>>(
      "api/post/create",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res.data);
    return res;
  };
  getListPost = async (status: string, cursor?: number, limit: number = 10) => {
    const res = await axios_auth.get<ResponseData<GetPostByStatusResponse>>(
      "api/post/list",
      {
        params: {
          status,
          cursor,
          limit,
        },
      }
    );
    console.log(status, res.data);
    return res;
  };
  getDetailPost = async (postId: number) => {
    const res = await axios_auth.get<ResponseData<GetDetailPostResponse>>(
      `api/post/${postId}/detail`
    );
    return res;
  };
  getLatestPost = async (limit: number = 4) => {
    const res = await axios_auth.get<ResponseData<Array<ListPostRes>>>(
      "api/post/latest-post",
      {
        params: {
          limit,
        },
      }
    );
    return res;
  };
  editPost = async (data: FormData, postId: number) => {
    const res = await axios_auth.post<ResponseData<ListPostRes>>(
      `api/post/${postId}/edit`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res;
  };
  getDetailMyPost = async (postId: number) => {
    const res = await axios_auth.get<ResponseData<GetDetailPostResponse>>(
      `api/post/${postId}/my-post`
    );
    return res;
  };
  hidePost = async (postId: number) => {
    const res = await axios_auth.post<ResponseData<object>>(
      `api/post/hide-post`,
      {
        postId,
      }
    );
    return res;
  };
  unHidePost = async (postId: number) => {
    const res = await axios_auth.post<ResponseData<object>>(
      `api/post/un-hide-post`,
      {
        postId,
      }
    );
    return res;
  };
  searchPost = async (
    keyword: string,
    minPrice?: string,
    maxPrice?: string,
    minAcreage?: string,
    maxAcreage?: string,
    city?: string,
    district?: string,
    ward?: string,
    interiorCondition?: string,
    cursor: Date | null = null,
    limit: number = 10
  ) => {
    const params: Record<string, unknown> = { keyword, limit };

    // Handle acreage range properly
    if (minAcreage !== undefined || maxAcreage !== undefined) {
      params.acreage = `${minAcreage || 0}-${maxAcreage || ""}`;
    }

    // Handle price range properly
    if (minPrice !== undefined || maxPrice !== undefined) {
      params.price = `${minPrice || 0}-${maxPrice || ""}`;
    }

    // Only include defined location parameters
    if (city) params.city = city;
    if (district) params.district = district;
    if (ward) params.ward = ward;

    // Add other optional parameters if defined
    if (interiorCondition) params.interiorCondition = interiorCondition;
    if (cursor !== undefined) params.cursor = cursor;

    return axios_auth.get<ResponseData<CursorPaging<ListPostRes, Date>>>(
      "api/post/search",
      { params: params }
    );
  };
}
