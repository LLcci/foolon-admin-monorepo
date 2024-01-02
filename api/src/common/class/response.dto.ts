import dayjs from 'dayjs';

export class ResponseDto<T> {
  constructor(
    data: T,
    code: number,
    message = 'success',
    success = true,
    timestamp = dayjs().unix(),
  ) {
    this.data = data;
    this.code = code;
    this.message = message;
    this.success = success;
    this.timestamp = timestamp;
  }
  data: T;
  code: number;
  message: string;
  success: boolean;
  readonly timestamp: number;

  static success<T>(data: T, message = 'success'): ResponseDto<T> {
    return new ResponseDto<T>(data, 200, message, true);
  }
  static fail<T>(data: T, code: number, message = 'fail'): ResponseDto<T> {
    return new ResponseDto<T>(data, code, message, false);
  }
}
