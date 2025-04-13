import { axios_auth } from "@/config/axios-auth";
import ResponseData from "@/types/response.type";
import { AxiosError } from "axios";
import { PostResponse } from "./types/post-response";
import { PostMoratorHistoryResponse } from "./types/postModerateHistory-response";

import {
  getMorderatorListResponse,
  Profile,
} from "./types/morderator-response";

class AuthService {
  async getMorderator(keySearch: string) {
    try {
      const res = await axios_auth.get<ResponseData<getMorderatorListResponse>>(
        `api/admin/manager/moderators?key=${keySearch}`
      );
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<
        ResponseData<getMorderatorListResponse>
      >;
      return axiosError.response ?? null; // Trả về response hoặc null nếu không có
    }
  }

  async createModerator(data: any) {
    try {
      const res = await axios_auth.post<ResponseData<any>>(
        "api/admin/manager/add-moderators",
        data
      );
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<ResponseData<any>>;
      return axiosError.response ?? null; // Trả về response hoặc null nếu không có
    }
  }
  async getPost() {
    try {
      const res = await axios_auth.get<ResponseData<PostResponse>>(
        "api/admin/posts/review-post"
      );
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<ResponseData<PostResponse>>;
      return axiosError.response ?? null; // Trả về response hoặc null nếu không có
    }
  }
  async changStatus(actionType: string, reason: string, postId: number) {
    try {
      const res = await axios_auth.post<ResponseData<PostResponse>>(
        `api/admin/posts/review-post/${postId}/moderate`,
        {
          actionType,
          reason,
        }
      );
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<ResponseData<PostResponse>>;
      return axiosError.response ?? null; // Trả về response hoặc null nếu không có
    }
  }
  async savePostModeratorHistory(
    postId: number,
    actionType: string,
    reason: string
  ) {
    try {
      const res = await axios_auth.post<
        ResponseData<PostMoratorHistoryResponse>
      >(`api/admin/posts/review-post/${postId}/moderator-history`, {
        actionType,
        reason,
      });
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<
        ResponseData<PostMoratorHistoryResponse>
      >;
      return axiosError.response ?? null; // Trả về response hoặc null nếu không có
    }
  }
  async getPostModeratorHistory(postId: number) {
    try {
      const res = await axios_auth.get<
        ResponseData<PostMoratorHistoryResponse>
      >(`api/admin/posts/review-post/${postId}/moderate-history`);
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<
        ResponseData<PostMoratorHistoryResponse>
      >;
      return axiosError.response ?? null; // Trả về response hoặc null nếu không có
    }
  }
  async getPostModeratorHistorybyId(adminId: number) {
    try {
      const res = await axios_auth.get<
        ResponseData<PostMoratorHistoryResponse>
      >(`/api/admin/manager/moderators/${adminId}/moderator-history/`);
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<
        ResponseData<PostMoratorHistoryResponse>
      >;
      return axiosError.response ?? null; // Trả về response hoặc null nếu không có
    }
  }
  async changStatusModerator(status: string, adminId: number) {
    try {
      const res = await axios_auth.put<ResponseData<getMorderatorListResponse>>(
        `api/admin/manager/${adminId}/update-status-moderators`,
        {
          status,
        }
      );
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<
        ResponseData<getMorderatorListResponse>
      >;
      return axiosError.response ?? null; // Trả về response hoặc null nếu không có
    }
  }
  async getProfileModerator(moderatorId: number) {
    try {
      const res = await axios_auth.get<ResponseData<getMorderatorListResponse>>(
        `api/admin/manager/moderators/${moderatorId}/profile`
      );
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<
        ResponseData<getMorderatorListResponse>
      >;
      return axiosError.response ?? null; // Trả về response hoặc null nếu không có
    }
  }
  async getMyProfile() {
    const res = await axios_auth.get<ResponseData<Profile>>(
      `api/admin/get-my-profile/`
    );
    return res.data;
  }
  async updateMyProfile(updateMyProfile: any) {
    const res = await axios_auth.patch<ResponseData<Profile>>(
      `api/admin/update-my-profile/`,
      updateMyProfile
    );
    return res.data;
  }
  async resetPasswordAdmin(newPassword: string, moderatorId: number) {
    try {
      const res = await axios_auth.put<ResponseData<Profile>>(
        `api/admin/manager/${moderatorId}/reset-password`,
        {
          newPassword,
        }
      );
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<ResponseData<Profile>>;
      return axiosError.response ?? null; // Trả về response hoặc null nếu không có
    }
  }
}
export default new AuthService();
