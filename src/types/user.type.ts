export interface Token {
    accessToken:  string;
    refreshToken: string;
}

export interface Account {
    accountId: number;
    phone:     string;
    roleId:    number;
    status:    string;
    email:     string;
    role:      Role;
    customer:  Customer;
    admin:     null;
}

export interface Customer {
    customerId:    number;
    accountId:     number;
    isVerified:    number;
    gender:        string;
    bio:           string;
    firstName:     string;
    lastName:      string;
    birthday:      Date;
    participantId: null;
    reportTarget:  null;
}

export interface Role {
    roleId:   number;
    roleName: string;
}
