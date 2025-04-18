export interface EditPostReq {
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
  remainingFileId: number[];
  newImgs: File[];
  newVideo: File[];
}
