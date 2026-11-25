import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseSlugPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (
      typeof value !== 'string' ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ||
      value.length > 160
    ) {
      throw new BadRequestException({
        code: 'INVALID_SLUG',
        message: '资源标识格式无效',
        details: { expected: 'lowercase kebab-case, at most 160 characters' },
      });
    }

    return value;
  }
}
