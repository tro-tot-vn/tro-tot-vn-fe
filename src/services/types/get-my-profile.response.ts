export interface GetMyProfileResponse {
  customerId: number;
  bio: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  gender: string;
  account: AccountMyProfile;
}

export interface AccountMyProfile {
  phone: string;
  email: string;
}
