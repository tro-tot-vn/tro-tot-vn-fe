import { axios_base } from "@/config/axios-auth";
import ResponseData from "@/types/response.type";
import { AxiosError } from "axios";
import { PostResponse } from "./types/post-response";

class AdminService {

  async getPost() {
    try {
        const res = await axios_base.get<ResponseData<PostResponse>>(
            "api/admin/posts/review-post"
          );
          return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<ResponseData<PostResponse>>;
      return axiosError.response ?? null; // Trả về response hoặc null nếu không có
    }
  }
  async changStatus(status: String, message: String, postId: number){
    try {
      const res = await axios_base.post<ResponseData<PostResponse>>(
          `api/admin/posts/review-post/${postId}`,
            {
              status,
              message,
              postId
            }
        );
        return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<ResponseData<PostResponse>>;
      return axiosError.response ?? null; // Trả về response hoặc null nếu không có
    }
  }
}

export default new AdminService();
