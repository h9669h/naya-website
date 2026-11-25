import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import type { RequestWithId } from '../types/request';

@Injectable()
export class ClientIpThrottlerGuard extends ThrottlerGuard {
  protected override getTracker(request: Record<string, unknown>): Promise<string> {
    const httpRequest = request as unknown as RequestWithId;
    return Promise.resolve(httpRequest.ip ?? httpRequest.socket.remoteAddress ?? 'unknown');
  }
}
