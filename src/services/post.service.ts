import { axios_auth } from "@/config/axios-auth";
import ResponseData from "@/types/response.type";
import { GetPostByStatusResponse } from "./types/get-list-post-by-status-reponse";

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
  getListPost = async (status: string, cursor?: number , limit: number = 10) => {
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
    return res;
  };
}
