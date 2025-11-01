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
  moderationHistories: ModerationHistory[];
}
export interface ModerationHistory {
  historyId:  number;
  postId:     number;
  adminId:    number;
  actionType: string;
  reason:     string;
  execAt:     Date;
}

export interface MultimediaFile {
  fileId: number;
  postId?: number;
  file: MultimediaFileDetail;
}

export interface MultimediaFileDetail {
  fileId: number;
  fileCloudId?: string;
  fileType: FileType;
  createdAt: Date;
}
export enum FileType {
  IMAGE = "Image",
  VIDEO = "Video",
}
