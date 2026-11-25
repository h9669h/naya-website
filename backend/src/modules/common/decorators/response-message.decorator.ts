import { SetMetadata } from '@nestjs/common';

export const RESPONSE_MESSAGE_KEY = 'response_message';

export const ResponseMessage = (message = '请求成功'): MethodDecorator =>
  SetMetadata(RESPONSE_MESSAGE_KEY, message);
