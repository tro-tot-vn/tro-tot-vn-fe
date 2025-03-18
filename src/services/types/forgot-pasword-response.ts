export interface ForgotPasswordResponse {
    email: string
}
  
export interface VerifyOtpResponse {
    [x: string]: any,
    email: string,
    otp: string
}
  
export interface ResetPasswordResponse {
    resetToken: string,
    password: string
}