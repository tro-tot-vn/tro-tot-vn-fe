export interface GetMyRateFromPostRes {
  rateId:    number;
  raterId:   number;
  numRate:   number;
  comment:   string;
  createdAt: Date;
  postId:    number;
  rater:     Rater;
}

export interface Rater {
  customerId: number;
  accountId:  number;
  isVerified: number;
  gender:     string;
  bio:        string;
  firstName:  string;
  lastName:   string;
  birthday:   Date;
  avatar:     null;
  address:    null;
  joinedAt:   Date;
}
