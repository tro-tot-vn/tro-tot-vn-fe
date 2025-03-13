import { Account, Token } from "@/types/user.type";

export interface LoginResponse {
    account:  Account;
    token: Token;
}

