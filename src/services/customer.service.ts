import { axios_auth } from "@/config/axios-auth";
import { GetCustomerInformationRes } from "./types/get-customer-information";
import ResponseData from "@/types/response.type";

export class CustomerService {
  async getCustomerProfile(customerId: number) {
    return axios_auth.get<ResponseData<GetCustomerInformationRes>>(
      `api/customer/${customerId}/profile`
    );
  }
  getMyProfile() {}
  getLoginHistory() {}
}
