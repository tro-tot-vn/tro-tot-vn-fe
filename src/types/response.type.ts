export default class ResponseData<T> {
  status: number;
  message: string;
  error: unknown[];
  data: T | null;

  constructor(
    status: number,
    message: string = "",
    error = [],
    data: T | null = null
  ) {
    this.status = status;
    this.message = message;
    this.error = error;
    this.data = data;
  }
}
