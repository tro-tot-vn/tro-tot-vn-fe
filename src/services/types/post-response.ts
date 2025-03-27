
export interface PostResponse {
    postId: number;
    ownerId: number;
    owner: {
        firstName: String,
        lastName: String
    }
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
    interiorCondition: string;
    acreage: number;
    deposit: number;
    extendedAt: Date | null;
    version: number;
    reportTarget: any | null;
}


