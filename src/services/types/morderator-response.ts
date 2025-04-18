export interface getMorderatorListResponse {
    adminId: number;
    firstName: string;
    lastName: string;
    account: {
        email: string;
        phone: number;
        status: string;
    };
    gender: string;
}
export interface Profile {
    accountId: number;
    firstName: string;
    lastName: string;
    gender: "Male" | "Female";
    birthday: string; // Hoặc Date nếu API trả về kiểu ngày
    account: {
      phone: string;
      email: string;
    };
  }
