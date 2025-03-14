import { post} from "../utils/request";


export const sendEmail = async (email: string) => {
    const result = await post(`forgot-password`, { email });
    return result;
};
export const sendOtp = async (email: string,otp: string) => {
    const result = await post(`verify-otp`, { email, otp });
    return result;
};
export const resetPassword = async (email: string,password: string) => {
    const result = await post(`reset-password`, { email, password });
    return result;
}