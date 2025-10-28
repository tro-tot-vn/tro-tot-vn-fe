export interface GetMyProfileResponse {
  customerId: number;
  bio: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  gender: string;
  currentCity?: string;
  currentDistrict?: string;
  currentJob?: string;
  account: AccountMyProfile;
}

export interface AccountMyProfile {
  phone: string;
  email: string;
}
