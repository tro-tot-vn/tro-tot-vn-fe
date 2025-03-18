import { axios_base } from "@/config/axios-auth";
import ResponseData from "@/types/response.type";
import { LoginResponse } from "./types/login-response";
import { RegisterResponse } from "./types/register-response";
import { ForgotPasswordResponse, ResetPasswordResponse, VerifyOtpResponse } from "./types/forgot-pasword-response";

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

  async sendEmail(email: string) {
    try {
      const res = await axios_base.post<ResponseData<ForgotPasswordResponse>>(
        "api/auth/forgot-password",
          {
           email
          }
        );
      return res;
    } catch (error) {
      console.error("sendEmail error:", error);
      return null;
    }
  }

  async sendOtp(email: string, otp: string) {
    try {
      const res = await axios_base.post<ResponseData<VerifyOtpResponse>>(
        "api/auth/verify-otp",
          {
            email,
            otp
          });
      return res;
    } catch (error) {
      console.error("sendOtp error:", error);
      return null;
    }
  }

  async resetPassword(resetToken: string, password: string) {
    try {
      const res = await axios_base.post<ResponseData<ResetPasswordResponse>>(
        "api/auth/reset-password",
        {
          password,
          resetToken
        });
      return res;
    } catch (error) {
      console.error("resetPassword error:", error);
      return null;
    }
  }
}

export default new AuthService();
