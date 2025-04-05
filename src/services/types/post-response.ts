
export interface PostResponse {
    postId:            number;
    status:            string;
    createdAt:         Date;
    title:             string;
    description:       string;
    price:             number;
    streetNumber:      string;
    street:            string;
    ward:              string;
    district:          string;
    city:              string;
    interiorCondition: string;
    acreage:           number;
    extendedAt:        Date;
    owner:             Owner;
    multimediaFiles:   MultimediaFile[];
}

export interface MultimediaFile {
    fileId: number;
    file:   File;
}

export interface File {
    fileId:    number;
    fileType:  string;
    createdAt: Date;
}

export interface Owner {
    customerId: number;
    firstName:  string;
    lastName:   string;
    avatar:     null;
    address:    null;
    joinedAt:   Date;
    account:    Account;
}

export interface Account {
    accountId: number;
    phone:     string;
    email:     string;
}
