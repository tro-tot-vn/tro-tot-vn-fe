export interface getMorderatorListResponse {
    adminId: number;
    firstName: string;
    lastName: string;
    account: {
        email: string;
        phone: number;
        status: string;
    };
}
