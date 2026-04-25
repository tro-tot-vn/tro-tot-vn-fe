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
      `api/customer/posts/${postId}/rates`,
      {
        params: {
          limit,
          cursor: cursor ? cursor.toISOString() : undefined,
        },
      }
    );
  }

  async getCustomerProfile(customerId: number) {
    return axios_auth.get<ResponseData<GetCustomerInformationRes>>(
      `api/customer/${customerId}/profile`
    );
  }
  async getMyProfile() {
    return axios_auth.get<ResponseData<GetMyProfileResponse>>(
      `api/customer/me`
    );
  }
  updateMyProfile(newProfile: any) {
    return axios_auth.post<ResponseData<GetMyProfileResponse>>(
      `api/customer/me`,
      newProfile
    );
  }
  async getListSavedPost() {
    return await axios_auth.get<ResponseData<ListPostRes[]>>(
      "api/customer/saved-posts"
    );
  }
  async addToSavedPosts(postId: number) {
    return axios_auth.post<ResponseData<unknown>>(`api/customer/saved-posts/${postId}`, {});
  }
  async deleteSavedPost(postId: number) {
    return axios_auth.delete<ResponseData<unknown>>(`api/customer/saved-posts/${postId}`);
  }
  async addRate(numStar: number, comment: string, postId: number) {
    return axios_auth.post<ResponseData<unknown>>(
      `api/customer/posts/${postId}/rate`,
      {
        numStar,
        comment,
      }
    );
  }
  getMyRateFromPost(postId: number) {
    return axios_auth.get<ResponseData<GetMyRateFromPostRes>>(
      `api/customer/posts/${postId}/rate` 
    );
  }
  delMyRateOnPost(postId: number) {
    return axios_auth.delete<ResponseData<unknown>>(
      `api/customer/posts/${postId}/rate`
    );
  }
  getRatingStats(postId: number) {
    return axios_base.get<ResponseData<StatsPostResponse>>(
      `api/customer/posts/${postId}/rate-avg`
    );
  }
  getSubscriptions() {
    return axios_auth.get<ResponseData<GetSubscriptionResponse[]>>(
      `api/customer/subscriptions`
    );
  }
  addSubscription(city: string, district: string) {
    return axios_auth.post<ResponseData<GetSubscriptionResponse>>(
      `api/customer/subscriptions`,
      {
        city: city,
        district: district,
      }
    );
  }
  deleteSubscription(subscriptionId: number) {
    return axios_auth.delete<ResponseData<unknown>>(
      `api/customer/subscriptions/${subscriptionId}`
    );
  }
  editSubscription(subscriptionId: number, city: string, district: string) {
    return axios_auth.put<ResponseData<GetSubscriptionResponse>>(
      `api/customer/subscriptions/${subscriptionId}`,
      {
        city: city,
        district: district,
      }
    );
  }
  async getHistoryViewPost() {
    return axios_auth.get<ResponseData<PostViewHistoryResponse>>(
      `api/customer/view-history`
    );
  }

}
