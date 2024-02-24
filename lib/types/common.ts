export interface APIResponseType {
  status: number;
  data?: [] | {};
  message?: string;
}
export interface APIResponseDataType {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
