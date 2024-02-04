import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ParseFilenamePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isUUID(value.split('.')[0])) {
      throw new BadRequestException(`${value} is not a valid name`);
    }
    return value;
  }
}
