export interface GetMyProfileResponse {
  customerId: number;
  bio: string;
  firstName: string;
  lastName: string;
  birthday?: Date;
  gender: string;
  avatar?: number;
  account: AccountMyProfile;
  address?: string;
}

export interface AccountMyProfile {
  phone: string;
  email: string;
}
