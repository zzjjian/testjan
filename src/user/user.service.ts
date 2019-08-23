import { Injectable } from '@nestjs/common';
import { ResultInfo } from '../common/result.obj';

@Injectable()
export class UserService {
  doGet(): object {
    return ResultInfo.ok('Hello!');
  }

  doPost(demoObjInfo: ResultInfo): object {
    return demoObjInfo;
  }
}