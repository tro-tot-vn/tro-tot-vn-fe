import { axios_base } from "@/config/axios-auth";
import ResponseData from "@/types/response.type";
import { LoginResponse } from "./types/login-response";
import { RegisterResponse } from "./types/register-response";

class AuthService {
  async registerAccount(
    phone: string,
    email: string,
    firstName: string,
    lastName: string,
    birthday: Date | null,
    gender: string,
    password: string
  ) {
    try {
      // Gửi yêu cầu POST tới API để đăng ký người dùng
      const res = await axios_base.post<ResponseData<RegisterResponse>>(
        "api/auth/register",
        {
          phone,
          email,
          firstName,
          lastName,
          birthday,
          gender,
          password,
        }
      );
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
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
