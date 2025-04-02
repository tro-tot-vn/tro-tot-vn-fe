export interface GetPostByStatusResponse {
  dataPag: ListPostRes[];
  nextCursor: number;
  hasMore: boolean;
}

export interface ListPostRes {
  postId: number;
  status: string;
  createdAt: Date;
  extendedAt: Date;
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
  multimediaFiles: MultimediaFile[];
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
  IMAGE = "Image",
  VIDEO = "Video",
}
