import { Module } from '@nestjs/common';
import { BasicController } from './basic/basic.controller';
import { BasicService } from './basic/basic.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [BasicController, UserController],
  providers: [BasicService, UserService],
})
export class AppModule {}
