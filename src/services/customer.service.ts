import { axios_auth, axios_base } from "@/config/axios-auth";
import { GetCustomerInformationRes } from "./types/get-customer-information";
import ResponseData from "@/types/response.type";
import { GetMyProfileResponse } from "./types/get-my-profile.response";
import { ListPostRes } from "./types/get-list-post-by-status-reponse";
import { CursorPaging } from "./types/paging-response";
import { RateResponse } from "./types/get-list-rate.response";
import { GetMyRateFromPostRes } from "./types/get-my-rate-from-post.response";
import { StatsPostResponse } from "./types/get-stats-post.response";
import { GetSubscriptionResponse } from "./types/get-subscription";
import { PostViewHistoryResponse } from "./types/history-view-post-response";

export class CustomerService {
  async createAppointment(postId: number, appointmentAt: Date) {
    return axios_auth.post<ResponseData<unknown>>(`api/customer/appointment`, {
      postId: postId,
      appointmentAt: appointmentAt,
    });
  }
  async getListRate(
    postId: number,
    limit: number = 4,
    cursor: Date | null = null
  ) {
    return axios_base.get<ResponseData<CursorPaging<RateResponse, Date>>>(
      `api/customer/post/${postId}/rate?limit=${limit}${
        cursor ? `&cursor=${cursor.toISOString()}` : ""
      }`
    );
  }

  async getCustomerProfile(customerId: number) {
    return axios_auth.get<ResponseData<GetCustomerInformationRes>>(
      `api/customer/${customerId}/profile`
    );
  }
  async getMyProfile() {
    return axios_auth.get<ResponseData<GetMyProfileResponse>>(
      `api/customer/my-profile`
    );
  }
  updateMyProfile(newProfile: {
    phone: string;
    bio: string;
    lastName: string;
    firstName: string;
    email: string;
    gender: string;
    birthDate: string;
    currentCity?: string;
    currentDistrict?: string;
    currentJob?: string;
  }) {
    return axios_auth.put<ResponseData<GetMyProfileResponse>>(
      `api/customer/my-profile`,
      newProfile
    );
  }
  async getListSavedPost() {
    return await axios_auth.get<ResponseData<ListPostRes[]>>(
      "api/customer/saved-post"
    );
  }
  async addToSavedPosts(postId: number) {
    return axios_auth.post<ResponseData<unknown>>(`api/customer/save-post`, {
      postId: postId,
    });
  }
  async deleteSavedPost(postId: number) {
    return axios_auth.delete<ResponseData<unknown>>(`api/customer/saved-post`, {
      data: {
        postId: postId,
      },
    });
  }
  async addRate(numStar: number, comment: string, postId: number) {
    return axios_auth.post<ResponseData<unknown>>(
      `api/customer/post/${postId}/rate`,
      {
        numStar: numStar,
        comment: comment,
      }
    );
  }
  getMyRateFromPost(postId: number) {
    return axios_auth.get<ResponseData<GetMyRateFromPostRes>>(
      `api/customer/post/${postId}/my-rate`
    );
  }
  delMyRateOnPost(postId: number) {
    return axios_auth.delete<ResponseData<unknown>>(
      `api/customer/post/${postId}/my-rate`
    );
  }
  getRatingStats(postId: number) {
    return axios_base.get<ResponseData<StatsPostResponse>>(
      `api/customer/post/${postId}/avg-rate`
    );
  }
  getSubscriptions() {
    return axios_auth.get<ResponseData<GetSubscriptionResponse[]>>(
      `api/customer/subscription`
    );
  }
  addSubscription(city: string, district: string) {
    return axios_auth.post<ResponseData<GetSubscriptionResponse>>(
      `api/customer/subscription`,
      {
        city: city,
        district: district,
      }
    );
  }
  deleteSubscription(subscriptionId: number) {
    return axios_auth.delete<ResponseData<unknown>>(
      `api/customer/subscription/${subscriptionId}`
    );
  }
  editSubscription(subscriptionId: number, city: string, district: string) {
    return axios_auth.put<ResponseData<GetSubscriptionResponse>>(
      `api/customer/subscription/${subscriptionId}`,
      {
        city: city,
        district: district,
      }
    );
  }
  async getHistoryViewPost() {
    return axios_auth.get<ResponseData<PostViewHistoryResponse>>(
      `api/customer/history-view-post`
    );
  }

}
