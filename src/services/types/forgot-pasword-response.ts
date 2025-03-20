export interface ForgotPasswordResponse {
    email: string,
}
  
export interface VerifyOtpResponse {
    resetToken: string,
}
  
export interface ResetPasswordResponse {
    resetToken: string,
    password: string
}