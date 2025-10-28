export interface GetDetailPostResponse {
  postId: number;
  status: string;
  createdAt: Date;
  title: string;
  description: string;
  price: number;
  streetNumber: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  interiorCondition: string;
  acreage: number;
  extendedAt: Date;
  multimediaFiles: MultimediaFileDetailPost[];
  owner: Owner;
}

export interface MultimediaFileDetailPost {
  fileId: number;
  file: File;
}

export interface File {
  fileId: number;
  fileType: string;
  createdAt: Date;
}

export interface Owner {
  customerId: number;
  firstName: string;
  lastName: string;
  avatar: null;
  currentCity?: string;
  currentDistrict?: string;
  currentJob?: string;
  account: Account;
  joinedAt: Date;
}

export interface Account {
  accountId: number;
  email: string;
  phone : string;
}
