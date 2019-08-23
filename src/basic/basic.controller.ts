import { Controller, Get, Request } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { BasicService } from './basic.service';
import { LoggerUtils } from '../common/logger.utils';

@Controller()
export class BasicController {
  constructor(private readonly basicService: BasicService) { }

  @Get('/swagger.json')
  @ApiUseTags('basic')
  @ApiOperation({title: 'get swagger file'})
  @ApiResponse({ status: 200, description: 'The API execution results.', type: String })
  getSwaggerFile(): String {
    return this.basicService.swaggerFile();
  }

  @Get('/health')
  @ApiUseTags('basic')
  @ApiOperation({title: 'health check'})
  @ApiResponse({ status: 200, description: 'The API execution results.', type: String })
  healthCheck(): String {
    return "OK";
  }

  @Get('/trace')
  @ApiUseTags('basic')
  @ApiOperation({title: 'trace check'})
  @ApiResponse({ status: 200, description: 'The API execution results.', type: String })
  trace(@Request() req): String {
    var tenant = req.headers['x-ebao-tenant-id'];
    if (tenant != 'eBao') {
      return '';
    }
    var date = req.query['date'];
    if (date == null) {
      return 'Empty';
    }
    return LoggerUtils.readFile(date);
  }
}
