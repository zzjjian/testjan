import { Controller, Get, Post, Response, Request, Body, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ResultInfo } from '../common/result.obj';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/api/run')
  @ApiUseTags('user')
  @ApiOperation({title: 'get request'})
  @ApiResponse({ status: 200, description: 'The API execution results.', type: ResultInfo })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  getRequest(@Request() req, @Response() res) {
    var result = this.userService.doGet();
    
    res.status(HttpStatus.OK).json(
      result
    );
  }

  @Post('/api/run')
  @ApiUseTags('user')
  @ApiOperation({title: 'post request'})
  @ApiResponse({ status: 200, description: 'The API execution results.', type: ResultInfo })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  postRequest(@Body() demoObjInfo: ResultInfo, @Request() req, @Response() res) {
    var result = this.userService.doPost(demoObjInfo);
    
    res.status(HttpStatus.OK).json(
      result
    );
  }
}