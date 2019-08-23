import { ApiModelProperty } from '@nestjs/swagger';

export class ResultInfo {
  static SUCCESS = 0;//逻辑执行成功
  static FAILED = 1;//逻辑执行不成功

  //老版resultinfo，考虑兼容性不做修改
  constructor(status:number, info:any){
    this.status = status;
    this.info = info;
  }

  static error(message:string) : ResultInfo{
    return new ResultInfo(ResultInfo.FAILED, message);
  }

  static ok(data:any) : ResultInfo{
    return new ResultInfo(ResultInfo.SUCCESS, data);
  }

  @ApiModelProperty({ required: false, description: 'Status code' })
  status: number;

  @ApiModelProperty({ required: false, description: 'If the status is 0 payload fill in this field, otherwise fill error message' })
  info: any;
}