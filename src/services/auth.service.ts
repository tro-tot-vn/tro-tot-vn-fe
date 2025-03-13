import { axios_base } from "@/config/axios-auth";
import ResponseData from "@/types/response.type";
import { LoginResponse } from "./types/login-response";

class AuthService {
  async login(identifier: string, password: string) {
    try {
      console.log("identifier", identifier);
      const res = await axios_base.post<ResponseData<LoginResponse>>(
        "api/auth/login",
        {
          identifier,
          password,
        }
      );
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new AuthService();
