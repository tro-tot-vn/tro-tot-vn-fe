import { axios_base } from "@/config/axios-auth";
import ResponseData from "@/types/response.type";
import { AxiosError } from "axios";
import { getMorderatorListResponse } from "./types/morderator-response";

class AuthService {
    async getMorderator() {
        try {
            const res = await axios_base.get<ResponseData<getMorderatorListResponse>>(
                "api/admin/manager/moderators"
              );
              return res.data;
        } catch (error) {
          const axiosError = error as AxiosError<ResponseData<getMorderatorListResponse>>;
          return axiosError.response ?? null; // Trả về response hoặc null nếu không có
        }
    }
    async createModerator(data: any) {
        try {
            const res = await axios_base.post<ResponseData<any>>(
                "api/admin/manager/moderators",
                data
              );
              return res.data;
        } catch (error) {
          const axiosError = error as AxiosError<ResponseData<any>>;
          return axiosError.response ?? null; // Trả về response hoặc null nếu không có
        }
    }

}
export default new AuthService();
