export interface ForgotPasswordResponse {
    email: string
}
  
export interface VerifyOtpResponse {
    email: string,
    otp: string
}
  
export interface ResetPasswordResponse {
    resetToken: string,
    password: string
}