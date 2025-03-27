export interface CreatePostReq {
  imgs: ArrayBuffer[];
  videos: ArrayBuffer;
  title: string;
  price: number;
  acreage: number;
  interiorStatus: "NEW" | "USED";
  description: string;
  location: string;
}
