export interface GetCustomerInformationRes {
  customerId: number;
  accountId: number;
  isVerified: number;
  gender: string;
  bio: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  avatar: null;
  joinedAt: Date;
  posts: Post[];
  address: string;
}

export interface Post {
  postId: number;
  ownerId: number;
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
  latitude: number;
  longitude: number;
  interiorCondition: InteriorCondition;
  acreage: number;
  extendedAt: Date;
  multimediaFiles: MultimediaFile[];
}

export enum InteriorCondition {
  Full = "Full",
  None = "None",
}
export interface MultimediaFile {
  fileId: number;
  file: File;
}

export interface File {
  fileType: FileType;
  createdAt: Date;
}
export enum FileType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}
