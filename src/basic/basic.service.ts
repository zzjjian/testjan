import { Injectable } from '@nestjs/common';
import { SwaggerUtils } from '../common/swagger.utils';

@Injectable()
export class BasicService {
  swaggerFile(): String {
    return SwaggerUtils.swaggerDocument;
  }
}