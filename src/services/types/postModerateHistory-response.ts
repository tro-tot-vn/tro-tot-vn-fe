
export interface PostMoratorHistoryResponse {
    id: number;
    postId: number;
    accountId: number;
    actionType: string;
    reson: string;
    admin:{
        firstName: string;
        lastName: string;
    }
    historyId: number;
    reason: string;
    execAt: string;
    updatedAt: string;
}